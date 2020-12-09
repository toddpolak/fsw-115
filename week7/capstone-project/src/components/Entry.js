import React from 'react'

function Entry(props) {
    return (
        <div className='todo-input'>
            <div>
                <form>
                    <textarea
                        value={props.title} 
                        name="title" 
                        placeholder="Title" 
                        className='no-outline'
                        onChange={props.entryInputChangeHandler} />
                    <textarea 
                        value={props.description} 
                        name="description" 
                        placeholder="Description"
                        className='no-outline'
                        onChange={props.entryInputChangeHandler} />
                </form>
            </div>
            <div className='todo-submit'>
                <button onClick={props.entrySaveClickHandler}>Add</button>
            </div>
        </div>
    )
}

export default Entry