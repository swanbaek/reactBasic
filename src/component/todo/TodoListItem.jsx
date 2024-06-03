import React from 'react'
import './TodoListItem.css'
import { FaRemoveFormat } from "react-icons/fa";
import { RiChatDeleteLine } from "react-icons/ri";
//https://react-icons.github.io/react-icons/icons/fa/
export default function TodoListItem(props) {
    const {id,content,isDone, wdate, onChangeDone, onDelete} =props;
    const onChangeCheckbox=(e)=>{
        onChangeDone(id)
    }
    const onDeleteHandler =()=>{
        onDelete(id)
    }
  return (
    <div className="container TodoListItem">
      <div className="chkbox">
        <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      </div>
      <div className="content" style={{textDecoration:isDone?'line-through':'none', color:isDone? 'gray':'black'}}>
        {content}
      </div>
      <div className="wdate"> 
        {new Date(wdate).toLocaleDateString()}
      </div>
      <div className="btDel">
        <span className="badge-danger" onClick={onDeleteHandler}><h4 style={{color:'hotpink'}}><RiChatDeleteLine /></h4></span>
      </div>
    </div> 
  ) 
} 

