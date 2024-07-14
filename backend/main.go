package main

import (
	"bytes"
	"image/jpeg"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"gocv.io/x/gocv"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true }, // any origin
}

func main() {
	/* init websocket handler */
	http.HandleFunc("/websocket", handleWebSocket)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	/* upgrade http connection to websocket */
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	defer conn.Close()

	/* open video capture device */
	videoDevice, err := gocv.VideoCaptureDevice(0) // zero for first available device
	if err != nil {
		log.Println("Error opening video capture device:", err)
		return
	}
	defer videoDevice.Close()

	/* create storage for frames */
	img := gocv.NewMat()
	defer img.Close()

	/* create ticker, to trigger frame capture every 100 milliseconds */
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for range ticker.C {
		/* read frame from video capture device */
		if ok := videoDevice.Read(&img); !ok {
			log.Println("Error reading image from video device")
			continue
		}

		/* check if frame exists */
		if img.Empty() {
			continue
		}

		/* convert frame to image */
		imgToImage, err := img.ToImage()
		if err != nil {
			log.Println("Error converting Mat to image:", err)
			continue
		}

		/* encode img and write to buffer */
		buf := new(bytes.Buffer)
		if err := jpeg.Encode(buf, imgToImage, nil); err != nil {
			log.Println("Error encoding image:", err)
			continue
		}

		/* write buffer to connection as binary message*/
		if err := conn.WriteMessage(websocket.BinaryMessage, buf.Bytes()); err != nil {
			log.Println("Write error:", err)
			return
		}
	}
}
