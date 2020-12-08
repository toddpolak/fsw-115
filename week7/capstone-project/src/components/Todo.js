import React from 'react'

function displayRenderer(
    todo, 
    id, 
    editTitle, 
    editDescription,
    handleClick,
    editInputChangeHandler) {
    if (id && id === todo._id) {
        return (
            <div>
                <div>
                    <textarea 
                        id={todo._id}
                        name='editTitle'
                        value={editTitle}
                        placeholder="Title" 
                        className='no-outline'
                        onChange={editInputChangeHandler} />
                </div>
                <div>
                    <textarea 
                        value={editDescription} 
                        name="editDescription" 
                        placeholder="Description"
                        className='no-outline'
                        onChange={editInputChangeHandler} />
                </div>
            </div>
        )
    }
    return (
        <div>
            <div>
                <h2>
                    <label 
                        className={todo.completed ? 'todo-title-completed' : 'todo-title'}
                        onClick={() => handleClick(todo)}>
                        {todo.title}
                    </label>
                </h2>
            </div>
            <div>{todo.description}</div>
        </div>
    )
}

function editRenderer(
    todo,
    id,
    editClickHandler,
    deleteClickHandler,
    editSaveClickHandler,
    editCancelClickHandler
    ) {
    if (id && id === todo._id) {
        return (
            <div>
                <button id={todo._id}
                    onClick={editSaveClickHandler}>
                    Save
                </button>
                <button 
                    onClick={editCancelClickHandler}>
                    Cancel
                </button>
            </div>
        )
    }
    return (
        <div>
            <button onClick={() => editClickHandler(todo)}>
                Edit
            </button>
            <button onClick={() => deleteClickHandler(todo)}>
                Delete
            </button>
        </div>
    )
}

function Todo(props) {
    return (
        <div className='todo'>
            {displayRenderer(
                props.todo, 
                props.id,
                props.editTitle,
                props.editDescription,
                props.handleClick,
                props.editInputChangeHandler
            )}
            {editRenderer(
                props.todo, 
                props.id,
                props.editClickHandler,
                props.deleteClickHandler,
                props.editSaveClickHandler,
                props.editCancelClickHandler
            )}
        </div>
    )
}

export default Todo