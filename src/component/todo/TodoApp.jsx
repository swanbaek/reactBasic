import React from 'react'
import { dummyData } from './todoData'
import TodoHeader from './TodoHeader'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
export default function TodoApp() {
  return (
    <div>
        <TodoHeader/>
        <TodoForm/>
        <TodoList/>
    </div>
  )
}
