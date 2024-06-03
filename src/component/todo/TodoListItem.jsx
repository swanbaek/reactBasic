import React from 'react'
import './TodoListItem.css'

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
      <div className="content">
        {content}
      </div>
      <div className="wdate">
        {new Date(wdate).toLocaleDateString()}
      </div>
      <div className="btDel">
        <button className="btn btn-sm btn-outline-danger" onClick={onDeleteHandler}> x </button>
      </div>
    </div>
  ) 
} 

