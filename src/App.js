import React, { useState, useCallback } from 'react';
import QRCodeGenerator from './pages/QRCodeGenerator';
import QRCodeScanner from './pages/QRCodeScanner';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function App() {
    const [scanning, setScanning] = useState(false);
    const [scannedData, setScannedData] = useState('');

    const handleScan = (data) => {
        if (data) {
            setScannedData(data);
            setScanning(false); // 停止扫描并关闭摄像头
        }
    };

    const toggleScan = useCallback(() => {
        setScanning(!scanning);
        if (scanning) {
            setScannedData(''); // 清除上次扫描结果
        }
    }, [scanning]);

    return (
        <div className="App" style={{ padding: '20px' }}>
            <h1>QR Code Scanner</h1>
            <Button variant="contained" onClick={toggleScan}>
                {scanning ? 'Stop Scanning' : 'Start Scanning'}
            </Button>
            {scanning && <QRCodeScanner onScan={handleScan} />}
            <TextField
                fullWidth
                label="Scanned Data"
                margin="normal"
                value={scannedData}
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
            />
        </div>
    );
}

export default App;