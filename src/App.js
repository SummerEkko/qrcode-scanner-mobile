import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import QRCodeScanner from './pages/QRCodeScanner';

function App() {
    const [isScanning, setIsScanning] = useState(false);
    const [scannedData, setScannedData] = useState('');

    const handleScan = (data) => {
        if (data) {
            setScannedData(data);
            setIsScanning(false); // 停止扫描
        }
    };

    const toggleScanning = () => {
        setIsScanning(!isScanning);
    };

    return (
        <div className="App" style={{ padding: '20px' }}>
            <h1>QR Code Scanner</h1>
            <Button variant="contained" onClick={toggleScanning}>
                {isScanning ? 'Stop Scanning' : 'Start Scanning'}
            </Button>
            {isScanning && <QRCodeScanner onScan={handleScan} isScanning={isScanning} />}
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
