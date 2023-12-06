import React, { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

function QRCodeScanner({ onScan }) {
    const videoRef = useRef(null);
    const codeReader = new BrowserMultiFormatReader();

    useEffect(() => {
        const startScanner = async () => {
            try {
                const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
                if (videoInputDevices.length > 0) {
                    const selectedDeviceId = videoInputDevices[0].deviceId;
                    await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
                        if (result) {
                            onScan(result.getText());
                        } else if (err && !(err.name === 'NotFoundException')) {
                            console.error(err);
                        }
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        startScanner();

        return () => {
            codeReader.reset();
        };
    }, [onScan]);

    return <video ref={videoRef} style={{ width: '100%' }} />;
}

export default QRCodeScanner;
