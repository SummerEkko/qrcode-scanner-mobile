import React, { useState } from 'react';
import QRCode from 'qrcode';

function QRCodeGenerator() {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const generateQRCode = async () => {
        try {
            const url = await QRCode.toDataURL(text);
            setImageUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Enter text to encode"
            />
            <button onClick={generateQRCode}>Generate QR Code</button>
            {imageUrl && <img src={imageUrl} alt="QR Code" />}
        </div>
    );
}

export default QRCodeGenerator;
