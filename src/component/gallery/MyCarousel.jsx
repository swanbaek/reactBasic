import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import img1 from './bts.png';
import img2 from './blackpink.png';
import img3 from './enhypen.PNG';
import img4 from './ive.PNG';
/*[1] public 아래 image를 두는 경우: public 폴더 아래 있는 모든 파일을 빌드하지 않아도 서버의 루트 디렉토리에 
        복사된다. 따라서 URL로 접근 가능하다. 주로 웹사이트 로고나 배경이미지 등과 같은 정적인 파일들을 여기에 둔다 
        (import문은 필요 없음)
  [2] src 아래 image를 두는 경우
  - src 폴더에 있는 파일들은 JavaScript 모듈로 다루어집니다(빌드할때 웹팩이 관리함). 따라서 require나 import 구문을 사용하여 이미지를 포함해야 함
        이곳에 두면 상대경로를 사용하여 이미지를 관리할 수 있다. 컴포넌트와 함께 자원관리할 때 좋다. 
        동적으로 이미지를 사용할 수 있다.
 */
const images = [
    {
        id: 1,
        src: img1,
        title: 'BTS',
        desc: '멋진 BTS',
    },
    {
        id: 2,
        src: img2,
        title: 'BlackPink',
        desc: '최고의 아이돌',
    },
    {
        id: 3,
        src: img3,
        title: 'Enhypen',
        desc: '짱짱!!',
    },
    {
        id: 4,
        src: img4,
        title: 'IVE',
        desc: '베스트 오브 베스트',
    },
];

export default function MyCarousel() {
    return (
        <Row>
            <Col xs={12} sm={10} md={8} lg={5} className="mx-auto">
                <Carousel>
                    {images.map((item, i) => (
                        <Carousel.Item>
                            <img src={item.src} alt={`slide ${i}`} className="d-block w-100" />
                            {/*className="d-block w-100" ===>display: block, width:100% 의 의미와 같은  */}
                            <Carousel.Caption>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
        </Row>
    );
}
