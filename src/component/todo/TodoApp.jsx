import React,{useState, useRef} from 'react'
import { dummyData } from './todoData'
import TodoHeader from './TodoHeader'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
export default function TodoApp() {

    const [todo, setTodo] =useState(dummyData)    
    // console.log('todo====', todo)
    const idRef =useRef(dummyData.length)

    const handleCreate=(content)=>{
        //alert('content: '+content)
        const item={
            ...todo,
            id:idRef.current,
            content:content,
            wdate:new Date().getTime()
        }
        // setTodo([...todo,item]) //배열사본이 들어감에 유의하자
        setTodo([item, ...todo])
        idRef.current +=1;//1씩 증가
    }
    const handleUpdate=(vid)=>{
       let arr= todo.map((it)=>(it.id===vid? {...it,isDone:!it.isDone}:it))
       console.log('arr: ', arr);
       setTodo(arr)
    }
    const handleDelete=(vid)=>{
        let arr=todo.filter((it)=>(it.id!==vid))
        setTodo(arr)
    }
  return (
    <div> 
        <TodoHeader/>
        <TodoForm onInsert={handleCreate}/>
        <br/>
        <TodoList todo={todo} onChangeDone={handleUpdate} onDelete={handleDelete}/>
    </div>
  )
}
 