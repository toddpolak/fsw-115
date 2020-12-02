import React from "react"

function Todo(props) {
    return (
        <div style={{padding: "10px"}}>
            <div style={{width: "600px", 
                border: "1px solid black", 
                borderRadius: "5px"}}>
                <div style={{padding: "10px"}}>
                    <span>{props.title}</span>
                </div>
                <div style={{padding: "10px"}}>
                    <span>{props.description}</span>
                </div>
            </div>
        </div>
    )
}

export default Todo