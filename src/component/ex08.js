import {useState} from 'react';
import '../App.css'

function ImageGallery() {
    const [images, setImages] = useState(['images/bts.png','images/blackpink.png']);
  
    const addImage = (newImage) => {
      setImages([...images, newImage]); 
      // 기존 배열에 새로운 이미지 추가 . spread연산자 사용하여 기존배열에 새로운 요소만 추가
    };
    /**
     * filter() 함수 활용
filter() 함수는 원래 배열의 각 요소에 대해 함수를 호출하고, 그 함수가 true를 반환하는 요소만을 
포함하는 새로운 배열을 반환합니다. 이 함수는 조건에 맞는 요소들만을 필터링하여 새로운 배열을 생성합니다.

- 특징
<1> 원래 배열보다 같거나 더 짧은 길이의 새로운 배열을 반환합니다.
<2> 원래 배열은 변경되지 않습니다 (불변성 유지).
<3> 조건을 만족하는 요소들만을 포함합니다.
     * 
     */
    const removeImage =(index)=>{
        let newImg=images.filter((_,i)=>i!==index);
        setImages(newImg);
    }
    /**map() 함수 활용
map() 함수는 원래 배열의 각 요소에 대해 함수를 호출하고, 그 결과를 새로운 배열로 반환합니다. 
이 함수는 배열의 모든 요소에 대해 지정된 함수를 실행하고, 그 반환 값을 사용하여 새로운 배열을 생성합니다.
- 특징
<1> 원래 배열과 같은 길이의 새로운 배열을 반환합니다.
<2> 원래 배열은 변경되지 않습니다 (불변성 유지).
<3> 모든 요소에 대해 함수를 실행합니다. */
    const updateImage = (index, newUrl)=>{
        setImages(images.map((imgUrl,i)=>(i===index)?newUrl:imgUrl))
    }
  
    return (
      <div>
        <h1>Image Gallery</h1>
        <button onClick={() =>{ 
            let url=window.prompt('이미지url입력','images/monstax.png');
            addImage(url)
            }} className="btn btn-info my-2">Add Image</button>
        <ul className="App-ul">
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`Image ${index + 1}`}  style={{width:'30%',margin:'5px'}}/>
              <button onClick={() => removeImage(index)} className="btn btn-outline-danger">Remove</button>
              <button onClick={() => {
                let url=window.prompt('수정할 이미지url입력','images/monstax.png');
                updateImage(index, url)
                }} className="btn btn-outline-primary">Update</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  export default ImageGallery;