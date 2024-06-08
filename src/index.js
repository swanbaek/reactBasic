import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import App from './App00';
// import App from './App00_1';
// import App from './example/test'
import App from './component/context_api/App4';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
//index.html에 있는 id가 root인 요소를 찾아 root라는 상수에 할당. createRoot() =>리액트앱의 루트를 생성. 리액트 컴포넌트 트리의 루트로 설정함
root.render(
    //위에서 생성한 루트에 컴포넌트를 렌더링함
    // React.StrictMode 는 개발환경에서 잠재적 문제를 식별하도록 도와주는 도구이다.
    //하위 컴포넌트들을 엄격 모드로 감지. 오류를 검출하게 도움. 개발환경에서 사용되고 프로덕션 빌드에서는 무시된다.
    //React.StrictMode : 리액트 도구. 자손 컴포넌트들을 엄격 모드로 감지하여 오류,경고 메시지를 보여줌. 프로덕션 빌드에서는 무시된다.
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/**함수는 React 애플리케이션의 성능을 모니터링하고 측정하기 위한 도구입니다. 
 * 이 함수는 Core Web Vitals 지표와 같은 중요한 성능 메트릭을 측정하고, 
 * 이러한 메트릭에 대한 데이터를 콘솔이나 분석 도구를 통해 보고할 수 있도록 해줍니다. 
 * Core Web Vitals는 사용자 경험에 중요한 영향을 미치는 웹 성능 지표를 의미합니다. 
 * 이러한 지표에는 로딩 속도, 반응성, 레이아웃 안정성 등이 포함될 수 있습니다. 
 * reportWebVitals() 함수를 사용하면 애플리케이션의 성능을 지속적으로 모니터링하고 개선하는 데 도움이 됩니다. 
 * ------------------------
 * 전체 코드는 다음과 같은 의미를 갖습니다:
HTML 문서의 id가 'root'인 요소를 찾아 React 애플리케이션의 루트로 설정합니다.
React.StrictMode를 사용하여 개발 모드에서 애플리케이션의 잠재적인 문제를 감지하고 경고합니다.
App 컴포넌트를 루트 요소에 렌더링합니다.
 * 
 * 
 * */
