import { useEffect, useState } from 'react';
import axios from 'axios';

const VideoStream = () => {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
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
            }
        };

        // new frame per 100ms
        const intervalId = setInterval(fetchImage, 100);

        // cleanup
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <img src={imgSrc} alt="Webcam Stream" />
        </div>
    );
};

export default VideoStream;