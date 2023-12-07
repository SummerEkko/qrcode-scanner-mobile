import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

function QRCodeScanner({ onScan, isScanning }) {
    const videoRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(false);
    const codeReader = new BrowserMultiFormatReader();

    useEffect(() => {
        const requestCameraPermission = async () => {
            try {
                // 设置约束使用后置摄像头
                const constraints = {
                    video: { facingMode: "environment" }
                };

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setHasPermission(true);
            } catch (error) {
                console.error('Camera access denied:', error);
                setHasPermission(false);
            }
        };

        const startScanner = async () => {
            if (hasPermission && isScanning) {
                try {
                    const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
                    const selectedDeviceId = videoInputDevices.find(device => device.label.includes('back'))?.deviceId;
                    
                    if (selectedDeviceId) {
                        await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
                            if (result) {
                                onScan(result.getText());
                                // 停止扫描和摄像头流
                                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                            } else if (err && !(err.name === 'NotFoundException')) {
                                console.error(err);
                            }
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        requestCameraPermission();
        if (hasPermission && isScanning) {
            startScanner();
        }

        return () => {
            codeReader.reset();
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, [onScan, isScanning, hasPermission]);

    return hasPermission ? (
        <video ref={videoRef} style={{ width: '100%' }} autoPlay />
    ) : (
        <p>Camera access is required for scanning.</p>
    );
}

export default QRCodeScanner;
