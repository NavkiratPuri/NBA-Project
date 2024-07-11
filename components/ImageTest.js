// src/components/ImageTest.js
import React from 'react';

const ImageTest = () => {
    const imageUrl = 'https://th.bing.com/th/id/OIP.TRdzZX0udR0NWoe15f8xBAAAAA?rs=1&pid=ImgDetMain';

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Image Test</h1>
            <img src={imageUrl} alt="Miami Heat Logo" style={{ width: '200px', height: '200px' }} />
        </div>
    );
};

export default ImageTest;
