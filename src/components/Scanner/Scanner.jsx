import React, { useRef, useState, useEffect } from 'react';
import { useResults } from './Result';
import './Scanner.css'

export default function Scanner() {

    const photoRef = useRef(null);   
    const videoRef = useRef(null);
    
    const [hasPhoto, setHasPhoto] = useState(false);
    const handleCamera = () => {navigator.mediaDevices
        .getUserMedia({ 
            video: { width: 1920, height: 1080}
        })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch( err => {
            console.error(err)
        })
    };
    const handlePhoto = () => {
        const width = 414;
        const height = width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    };
    const handlePhotoClose = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    }
    useEffect(() => {
        handleCamera();
    }, [videoRef])
    
    return(
        <div className='scanner'>
            <div className='camera'>
                <video ref={videoRef}></video>
                <button onClick={handlePhoto} className='captureButton'>Scan</button>
            </div>
            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button onClick={handlePhotoClose} className='closeButton'>❌</button>
            </div>
            <div>
                <h2>Results
                    {useResults(photoRef)}
                </h2>
            </div>
    </div>
)};