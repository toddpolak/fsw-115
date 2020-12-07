import React from "react"
import "./App.css"
import TodoList from "../components/TodoList"

function App() {
  return (
    <div className='app'>
      <div className='title'>
          <h1>Axios Todo List</h1>
      </div>
      <TodoList />
    </div>
  )
}

export default App