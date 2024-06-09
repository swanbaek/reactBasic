import './App.css';
import Comp1 from './example/JsxEx1';
// import Comp2 from './example/jsxEx2'
//export 'default' (imported as 'Comp2') was not found in './example/jsxEx2' (possible exports: jsxEx2)
import * as Comp2 from './example/JsxEx2';
import { GetBrand, GetOS } from './example/JsxEx3';
//  import될 때 사용되는 이름은 원래 파일에서 선언된 이름을 그대로 사용해야 합니다
import { GetLang as Lang, GetJob as Job } from './example/JsxEx4';
import GetPet from './example/JsxEx4';
import AnonymousFunc from './example/JsxEx5';
import MyName from './example/JsxEx6';

function App() {
    return (
        // 자바스크립트 영역. 루트 엘리먼트는 반드시 1개
        //각 React 컴포넌트가 하나의 루트 엘리먼트를 반환해야 함을 의미
        <div className="container py-5">
            {/* JSX영역. jsx주석 */}
            <h1>Hello React</h1>
            <Comp1 />
            <hr />
            <Comp2.JsxEx2 />
            <Comp2.MyComponent />
            <hr />
            <div className="alert alert-danger">
                <GetBrand />
                <GetOS />
                <Lang />
                <Job />
                <GetPet />
            </div>
            <AnonymousFunc />
            <MyName />
        </div>
    );
}

export default App;
