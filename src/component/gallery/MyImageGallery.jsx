import React, { useState } from 'react';
import hamImage from './ham.png';
import catImage from './cat.png';
import dogImage from './dog.png';
const images = [catImage, dogImage, hamImage];
export default function MyImageGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };
    const handlePrevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img src={images[currentIndex]} alt="pet" className="w-100" style={{ height: '50vh' }} />
                    <br />
                    <button onClick={handlePrevImage} className="btn btn-outline-danger my-3">
                        Prev Image
                    </button>
                    <button onClick={handleNextImage} className="btn btn-outline-success my-3">
                        Next Image
                    </button>
                </div>
            </div>
        </div>
    );
}
