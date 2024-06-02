import React from 'react'
//외부에 별도의 파일을 스타일로 정의해 놓고 className을 사용해 class를 참조하는 방식
import '../AppStyle.css'
export default function JsxEx8Style() {
  return (
    <div className="App">
      <header>
        <h1>React CSS</h1>        
      </header>
      <p>React Cascade StyleSheet</p>
    </div>
  )
}

