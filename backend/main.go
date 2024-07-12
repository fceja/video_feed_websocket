package main

import (
	"bytes"
	"image/jpeg"
	"log"
	"net/http"

	"gocv.io/x/gocv"
)

func main() {
    webcam, err := gocv.OpenVideoCapture(0)
    if err != nil {
        log.Fatalf("Error opening webcam: %v\n", err)
    }
    defer webcam.Close()

    img := gocv.NewMat()
    defer img.Close()

    http.HandleFunc("/video", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        if ok := webcam.Read(&img); !ok {
            http.Error(w, "Cannot read from webcam", http.StatusInternalServerError)
            return
        }

        image, err := img.ToImage()
        if err != nil {
            http.Error(w, "Cannot convert image", http.StatusInternalServerError)
            return
        }

        buf := new(bytes.Buffer)
        if err := jpeg.Encode(buf, image, nil); err != nil {
            http.Error(w, "Cannot encode image", http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "image/jpeg")

        w.Write(buf.Bytes())
    })

    log.Println("Starting server on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}