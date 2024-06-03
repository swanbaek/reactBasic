import React,{useRef, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import { BiSolidPencil } from "react-icons/bi";
import "./TodoForm.css"
import { FcPlus } from "react-icons/fc";
import { SlRefresh } from "react-icons/sl";

export default function TodoForm({onInsert}) {
    const inputRef=useRef()
    const [content, setContent] =useState('')
    const onChange =(e)=>{
        setContent(e.target.value)
    }
    const onKeyDown=(e)=>{
        if(e.keyCode ===13){//엔터 입력시
            onSubmit();
        }
    }
    const onSubmit =()=>{
        if(!content){
            alert('새로 할 일을 입력하세요')
            inputRef.current.focus(); 
            return;
        }
        onInsert(content);
        setContent("")
    }
    const onReset =()=>{
        setContent('')
        inputRef.current.focus(); 
    }
  return (
    <div> 
        <h4 className="my-3">새로운 Todo 추가 <BiSolidPencil /> </h4>
        <Row>
        <Col xs={12} sm={8} md={8} className='mx-0'>
            <input ref={inputRef} name="content" value={content} className="inputCss"
            onChange={onChange} onKeyDown={onKeyDown} />
        </Col>
        <Col xs={12} sm={4} md={4}>
            <button className="btn btn-outline-info" onClick={onSubmit}><FcPlus /></button>
            <button className="btn btn-outline-warning" onClick={onReset}><SlRefresh/></button>
        </Col>
        </Row>
    </div>
  )
}
