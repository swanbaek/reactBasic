import React from 'react'
const wrapStyle={
    textAlign:"center",
    padding:"2em",
    border:"1px solid red",
    height:"100vh"
}
const headerStyle={
    backgroundColor:'#000',
    color:'#fff',
    padding:'1em',
    margin:10
}
const titleStyle={
    textDecoration:'underline',
    textShadow:'4px 1px #8c8c8c'
}

export default function JsxEx7Style() {
  return (
    <div style={wrapStyle}>
        <header style={headerStyle}>
            <h1 style={titleStyle}>Hello React</h1>
        </header>
        <section style={{backgroundColor:'#efefef', padding:'2em', margin:10, textAlign:'left'}}>
            React CSSe- Inline Style을 적용하는 방법<br/>
            HTML과 마찬가지로 리액트 엘리먼트에 인라인 스타일을 적용할 수 있다<br/>
            리액트에서는 style 속성값으로 일반 문자열이 아닌 자바스크립트 객체를 할당해야 하고,<br/>
            CSS 속성명을 카멜 표기법(Camel Case)로 작성해야 한다 가령 backgournd-color는 backgroundColor식으로 기술해야 한다.

        </section>
      
    </div>
  )
}
