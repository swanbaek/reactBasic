import { useState } from 'react';
import catImg from './cat.png';
import dogImg from './dog.png';
import { Row, Col } from 'react-bootstrap';
const DynamicImage = () => {
    const [animal, setAnimal] = useState('cat');
    const handleImageChange = (e) => {
        setAnimal(e.target.value);
    };
    return (
        <div className="container">
            <Row>
                <Col xs={4} md={3} className="my-3">
                    <select onChange={handleImageChange} value={animal} className="form-control">
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={6} className="my-1 p-2">
                    <img src={animal === 'cat' ? catImg : dogImg} alt={animal}></img>
                </Col>
            </Row>
        </div>
    );
};
export default DynamicImage;
