import React, { useState } from 'react';
//rfc  => snnipet
function MyComp() {
    const [name, setName] = useState('Tom');
    // 이벤트 핸들러 함수. 함수형 컴포넌트 내부에서 선언하여야 함
    const changeNameHandler = () => {
        setName('Richard');
    };
    return (
        <div>
            <h1>Hello {name}</h1>
            {/* 이벤트 속성 onClick, onMouseOver, onKeyUp ... 등은 카멜 표기법을 사용한다. 
            이벤트 속성에는 함수가 할당되어 야 한다. 
            함수를 호출하는 문장이 아니라 함수가 전달되어야 함에 유의하자
            */}
            <button onClick={changeNameHandler} className="btn btn-danger">
                이름 변경
            </button>
        </div>
    );
}
export default MyComp;
