import { useEffect, useState } from 'react';
import axios from 'axios';

import "/src/scss/components/VideoStream.scss"

const VideoStream = () => {
    const [imgSrc, setImgSrc] = useState('');
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (error) { return }

        const fetchImage = async () => {
            try {
                // fetch data and tell axios to handle as binary
                const response = await axios.get('http://localhost:8080/video', {
                    responseType: 'arraybuffer',
                });

                // convert arraybuffer to base64 string
                const base64 = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                setImgSrc(`data:image/jpeg;base64,${base64}`);

            } catch (error) {
                console.error('Error fetching the image', error);
                setError(true)

            } finally {
                setIsLoading(false)
            }
        };

        // new frame per 100ms
        const intervalId = setInterval(fetchImage, 100);

        // cleanup
        return () => clearInterval(intervalId);
    }, [error]);

    return (
        <>
            {error &&
                <div>There was an error.<br />Is backend running?</div>
            }
            {!isLoading && !error &&
                <div><img className="img-container" src={imgSrc} alt="Webcam Stream" /></div>
            }
        </>
    )
};

export default VideoStream;