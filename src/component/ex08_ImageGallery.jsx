import React,{useState} from 'react'
import {images} from '../data/imageData'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// React-Bootstrap는 Bootstrap의 컴포넌트들을 React 스타일로 제공하는 라이브러리
//설치: npm i --s react-bootstrap 
//src/index.js에서 import 'bootstrap/dist/css/bootstrap.css' 해야 함
//참고 튜토리얼: https://react-bootstrap.netlify.app/docs/layout/grid
export default function ImageGallery() {
    const [imgs, setImages] =useState(images)
    const [visible, setVisible]=useState(false);
    const [text, setText]=useState('View')
    //조건부 렌더링 - Read
    const viewImage=()=>{
        let txt=(text==='View')?'Hide':'View';
        setText(txt)
        setVisible(!visible)
        
    }
    //C: Create 
    const addImage=()=>{
        let newSrc=window.prompt("새로 추가할 이미지명을 입력하세요",'images/monstax.png')
        let newTitle=window.prompt("새로 추가하는 아이돌 이름을 입력하세요","MonstaX")
        setImages([...imgs,{src:newSrc, alt:'new Image', title:newTitle}])
    }
    //map()함수 활용
    const updateImage=(i)=>{
        let changeImg=window.prompt('수정할 이미지명 입력','images/wanaone.png');
        let changeTitle=window.prompt('수정할 아이돌명 입력','Wanaone');
        const data={src:changeImg, title:changeTitle}
        const tmpImages=[...imgs]; //원본 배열을 수정하려고 하면 안되므로 배열 사본을 스프레드 연산자로 만든다.        
        tmpImages[i]=data;
        setImages(tmpImages)        
        //리액트에서는 불변성의 중요성 때문에 원본 객체나 배열을 직접 수정하면 안된다. 가상 dom을 효율적으로 사용하기 위해서는
        //상태가 변경될때 마다 새로운 객체 또는 배열을 반환해야 한다. 그렇지 않으면 가상dom의 비교 및 업데이트가 어려워질 수 있다.
        /**함수형 프로그래밍에서는 상태를 변경하는 대신 새로운 상태를 생성하는 것이 일반적인 패턴입니다.
        따라서 리액트 애플리케이션에서는 상태나 속성을 변경할 때에는 기존 객체나 배열을 수정하는 대신에 
        새로운 객체나 배열을 생성하여 반환하는 것이 권장됩니다. 이를 통해 예측 가능성과 성능 최적화를 유지하고 버그를 예방할 수 있습니다. */
    }
  return (
    <div>
      <Container className="py-5">
        <Row>
            <Col md={4} className='mb-5'>
            <Button variant="warning" className="mx-1" onClick={viewImage}>All Images {text}</Button>
                <Button variant="success" onClick={addImage}>Add Image</Button>
            </Col>
        </Row>
        
        {visible&&<Row>
            {imgs.map((image,i)=>{
              //  console.log(image);
            //   xs: 모바일기기 576px미만, sm :태블릿 576px이상, md : 중간 태블릿/데스크탑(768px이상), lg: 큰 데스크탑 (992px이상), xl: 매우큰 데스크탑 화면(1200px이상)
            //한행에 12컬럼 그리드 시스템
                return(
                    <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card>
                            <Card.Img src={image.src} alt={image.alt} variant="top" />
                            <Card.Body>
                                <Card.Title className="text-center">{image.title}</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                                </Card.Text>
                                <div className='text-center'>
                                <Button variant="primary"  className="d-inline mx-1" size="sm" onClick={()=>{updateImage(i)}}>Update</Button>
                                <Button variant="danger"  className="d-inline" size="sm">Remove</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })
        }
        </Row>
        }
      </Container>
    </div>
  )
}
