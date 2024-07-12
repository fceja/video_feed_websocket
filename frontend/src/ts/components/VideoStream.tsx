import { useEffect, useRef, useState } from 'react';
import "/src/scss/components/VideoStream.scss";

const VideoStream = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false)
    const webSocketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        /* if web socket already exists, exit */
        if (webSocketRef.current) { return }

        /* create websocket connection */
        const connectWebSocket = () => {
            /* attempt connection */
            setLoading(true)
            webSocketRef.current = new WebSocket('ws://localhost:8080/ws');

            /* define websocket close handler */
            webSocketRef.current.onclose = () => {
                console.log('WebSocket disconnected.');
                setIsWebSocketOpen(false)
            };

            /* define websocket error handler */
            webSocketRef.current.onerror = (err) => {
                console.error(`WebSocket error: ${err}`);
                setError(true);
                setLoading(false)
            };

            /* define websocket message handler (data received from socket) */
            webSocketRef.current.onmessage = (message: MessageEvent) => {
                /* draws image on canvas*/
                if (canvasRef.current) {
                    const context = canvasRef.current.getContext('2d');
                    const img = new Image();
                    img.src = URL.createObjectURL(new Blob([message.data]));
                    img.onload = () => {
                        if (context && canvasRef && canvasRef.current) {
                            context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                        }
                    };
                }
                setLoading(false)
            };

            /* define websocket open handler */
            webSocketRef.current.onopen = () => {
                console.log('WebSocket client connected.');
                setError(false);
                setIsWebSocketOpen(true)
            };
        };

        connectWebSocket();

        /* cleanup */
        return () => {
            if (isWebSocketOpen && webSocketRef.current) {
                webSocketRef.current.close();
                webSocketRef.current = null;
            }
        };

    }, [isWebSocketOpen]);

    return (
        <>
            {error &&
                <div>Error connecting.<br />Is backend running?</div>
            }
            {loading &&
                <div>...loading</div>
            }
            {!loading && isWebSocketOpen && webSocketRef &&
                <canvas ref={canvasRef} width="640" height="480"></canvas>
            }
        </>
    );
};

export default VideoStream;