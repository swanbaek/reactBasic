import React, { useState } from 'react'
const changeNameHandler=()=>{
    setName("Richard")
}
function MyComp(){
    const [name,setName]=useState('Tom');
    return (
        <div><h1>Hello {name}</h1>
        <button onClick={changeNameHandler}>이름 변경</button>
    </div>)
}
export default MyComp;
