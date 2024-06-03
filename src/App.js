import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './component/Header';
import Side from './component/Side'
import Home from './component/Home'
import MyComp1 from './component/MyComp1'; 
import MyComp2 from './component/MyComp2';
import Gallery from './component/ex08_ImageGallery'
import MyEventComp from './component/ex09_event'
import MyEventComp2 from './component/ex10_event';
import UserDetail from './component/UserDetail'
import Boards from './component/Boards'

import Example1 from './component/UseEffectHook'
import TimerComp from './component/Timer' 
import UseRefHook from './component/UseRefHook'
import UseNavigateHook from './component/UseNavigateHook'
import UserOne from './component/UserOne'
import PageNotFound from './component/PageNotFound'
import UserAll from './component/UserAllPaging'
import OpenWeather from './component/OpenWeather'
import TodoApp from './component/todo/TodoApp';

import BoardApp from './component/board/BoardApp'
import BoardView from './component/board/BoardView'
import BoardModify from './component/board/BoardModify'

import {Container,Row,Col} from 'react-bootstrap'
//npm i --s react-router-dom 
function App() {
  return (
    // 자바스크립트 영역. 루트 엘리먼트는 반드시 1개
    <div className="container py-5">
        <BrowserRouter>
        <Container>
          <Row>
            <Col>
          <Header/>
          </Col>
          </Row>
          <Row>
          <Col xs={12} sm={3} md={4} lg={4} className="d-none d-sm-block mt-3">
            {/* d-none : 모두 안보이게 한뒤, d-sm-block 하면 small사이즈 부터는 보여짐 */}
          <Side/>
          </Col>
          <Col xs={12} sm={9} md={8} lg={8}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/comp1" element={<MyComp1/>}/>            
            <Route path="/comp2" element={<MyComp2/>}/>
            <Route path="/event1" element={<MyEventComp/>}/>
            <Route path="/event2" element={<MyEventComp2/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/users/:id" element={<UserDetail/>}/>
            <Route path="/boards" element={<Boards/>}/>
            <Route path="/hook1" element={<Example1/>}/>
            <Route path="/hook2" element={<TimerComp/>}/>
            <Route path="/hook3" element={<UseRefHook/>}/>
            <Route path="/hook4" element={<UseNavigateHook/>}/>
            <Route path="/ajax1/:id" element={<UserOne/>}/>
            <Route path="/ajax2" element={<UserAll/>}/>
            <Route path="/ajax3" element={<OpenWeather/>}/>
            <Route path="/todo" element={<TodoApp/>}/>
            <Route path="/board2" element={<BoardApp/>}/>
            <Route path="/board2/:id" element={<BoardView/>}/>
            <Route path="/boardEdit/:id" element={<BoardModify/>}/>
            <Route path="*" element={<PageNotFound/>}/>

            <Route/>
          </Routes>
          </Col>
          </Row>
          </Container>
        </BrowserRouter>
    </div>
  );
}

export default App;
