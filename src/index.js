import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App02';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode 는 개발환경에서 잠재적 문제를 식별하도록 도와주는 도구이다. 
  //하위 컴포넌트들을 엄격 모드로 감지. 오류를 검출하게 도움. 개발환경에서 사용되고 프로덕션 빌드에서는 무시된다.
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
 * reportWebVitals() 함수를 사용하면 애플리케이션의 성능을 지속적으로 모니터링하고 개선하는 데 도움이 됩니다. */