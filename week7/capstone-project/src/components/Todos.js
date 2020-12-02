import React from "react"
import Todo from "../components/Todo"

function Todos(props) {
    const todos = props.todos.map((todo, index) => {
        return (
            <Todo 
                key={index}
                index={index}
                title={todo.title}
                description={todo.description} />
        )
    })
    return (
        <div>{todos}</div>
    )
}

export default Todos