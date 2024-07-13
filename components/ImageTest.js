// src/components/ImageTest.js
import React from 'react';

const ImageTest = () => {
    const imageUrl = 'https://cdn.nba.com/teams/legacy/www.nba.com/suns/sites/suns/files/legacy/photos/sunslogo_12.jpg';

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Image Test</h1>
            <img src={imageUrl} alt="Miami Heat Logo" style={{ width: '200px', height: '200px' }} />
        </div>
    );
};

export default ImageTest;
