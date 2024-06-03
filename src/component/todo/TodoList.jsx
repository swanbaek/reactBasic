import React,{useState} from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import TodoListItem from './TodoListItem'
import "./TodoList.css"

export default function TodoList({todo, onDelete, onChangeDone}) {

  const [search, setSearch]=useState('')

  const searchHandler=(e)=>{
    setSearch(e.target.value)
  }
  const getSearchResult =()=>{
    return search===""? todo:
    todo.filter((item,i)=>{
      return item.content.indexOf(search)!=-1;
    })
  } 
  return (
    <div className="TodoList">
      <h4>TodoList</h4>
      <Row>
        <Col xs={12} sm={8} md={8}>
        <input name="search" value={search} className="inputSearch" placeholder='검색어를 입력하세요' className="form-control" onChange={searchHandler}/>
        </Col>
        <Col xs={12} sm={3} md={3}>
          <Button onClick={searchHandler}>검색</Button>
        </Col>
      </Row>
      <Row className="mt-4 p-3">
      <Col xs={12} sm={11} md={11}>
      {
        getSearchResult().map((it)=>(
          <TodoListItem key={it.id}  {... it} onDelete={onDelete} onChangeDone={onChangeDone}></TodoListItem>
        ))
        /**<TodoListItem key={doit.id}  {... doit} ></TodoListItem> 이렇게 하면 아래와 동일하게 된다.
           객체의 모든 속성을 풀어해쳐서 props로 전달하는 방법이다.
        <TodoItem key={it.id} id={it.id} content={it.content}  isDone={it.isDone}  onUpdate={onUpdate} onDelete={onDelete}/>  */    
      }
      </Col>
      </Row>
    </div>
  )
}

