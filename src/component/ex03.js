import React, { useState } from 'react'
//rfc  => snnipet
function MyComp(){
    const [name,setName]=useState('Tom');
    // 이벤트 핸들러 함수. 함수형 컴포넌트 내부에서 선언하여야 함
    const changeNameHandler=()=>{
        setName("Richard")
    }
    return (
        <div><h1>Hello {name}</h1>
        <button onClick={changeNameHandler} className="btn btn-danger">이름 변경</button>
    </div>)
}
export default MyComp;
