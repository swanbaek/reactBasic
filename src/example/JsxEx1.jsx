import React from 'react';
// root 엘리먼트는 반드시 한 개여야 한다.
//컴포넌트 이름은 Pascal Case로
export default function JsxEx1() {
    const name = 'IVE';
    return (
        // 자바스크립트 주석

        <div>
            {/* 루트 element */}
            {/* jsx주석 
        멀티라인 주석
      */}
            {
                // 단문 주석
            }
            <h1>JSX 규칙 - root 는 1개여야 함</h1>
            <h2>시작태그와 종료태그가 쌍으로 있어야 한다.</h2>
            <br></br>
            <img src="images/ive.png" alt="ive" style={{ width: '30%' }}></img>
            <br />
            <hr />

            <h3>멋져요~ {name}</h3>
        </div>
        // <div>여기에 있으면 에러남. </div>
    );
}
