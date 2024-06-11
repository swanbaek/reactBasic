import ImageGallery from "./component/ex08_ImageGallery";
import {Button} from 'react-bootstrap';
function App(){

    return (
        <div className="container py-5">
            <h1>ImageGallery - CRUD</h1>
            <br/>            
            <hr/>
            <ImageGallery/>
        </div>
    )
}
export default App;

