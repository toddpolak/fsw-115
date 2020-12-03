import React from 'react'
import axios from 'axios'

class TodoEntry extends React.Component {
    constructor() {
        super()
        
        this.state = {
            todos: [],
            id: '',
            title: '',
            description: '',
            editTitle: '',
            editDescription: ''
        }
        this.entryInputChangeHandler = this.entryInputChangeHandler.bind(this)
        this.entrySaveClickHandler = this.entrySaveClickHandler.bind(this)
        this.editClickHandler = this.editClickHandler.bind(this)
        this.editInputChangeHandler = this.editInputChangeHandler.bind(this)
        this.editSaveClickHandler = this.editSaveClickHandler.bind(this)
        this.editCancelClickHandler = this.editCancelClickHandler.bind(this)
        this.deleteClickHandler = this.deleteClickHandler.bind(this)
    }

    componentDidMount() {
        axios.get('https://api.vschool.io/toddpolak/todo/')
            .then(response => {
                let todos = response.data
                this.setState({todos})
            })
    }

    entryInputChangeHandler(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    entrySaveClickHandler(event) {
        event.preventDefault()

        axios.post('https://api.vschool.io/toddpolak/todo/', {
            title: this.state.title,
            description: this.state.description
        })
        .then(async () => {
            await axios.get('https://api.vschool.io/toddpolak/todo/')
                .then(response => {
                    let todos = response.data
                    this.setState({todos})
                    this.setState({
                        title: '',
                        description: ''
                    })
                })
        })
    }

    editRenderer(todo) {
        if (this.state.id && this.state.id === todo._id) {
            return (
                <div>
                    <button id={todo._id}
                        onClick={this.editSaveClickHandler}>
                        Save
                    </button>
                    <button 
                        onClick={this.editCancelClickHandler}>
                        Cancel
                    </button>
                </div>
            )
        }
        return (
            <div>
                <button onClick={() => this.editClickHandler(todo)}>
                    Edit
                </button>
                <button onClick={() => this.deleteClickHandler(todo)}>
                    Delete
                </button>
            </div>
        )
    }

    editClickHandler(todo) {
        this.setState({
          id: todo._id,
          editTitle: todo.title,
          editDescription: todo.description
        });
    }

    deleteClickHandler(todo) {
        axios.delete('https://api.vschool.io/toddpolak/todo/' + todo._id)
            .then(async () => {
                await axios.get('https://api.vschool.io/toddpolak/todo/')
                    .then(response => {
                        let todos = response.data
                        this.setState({todos})
                    })
            })
    }

    editInputChangeHandler(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    editSaveClickHandler(event) {
        axios.put('https://api.vschool.io/toddpolak/todo/' + event.target.id, {
            title: this.state.editTitle,
            description: this.state.editDescription
        })
        .then(async () => {
            await axios.get('https://api.vschool.io/toddpolak/todo/')
                .then(response => {
                    let todos = response.data
                    this.setState({todos})
                    this.setState({id: ''})
                })
        })
    }

    editCancelClickHandler() {
        this.setState({id: ''})
    }

    displayRenderer(todo) {
        if (this.state.id && this.state.id === todo._id) {
            return (
                <div className='todo_edit'>
                    <div>
                        <input type='checkbox' />
                        <input 
                            type='text'
                            id={todo._id}
                            name='editTitle'
                            value={this.state.editTitle}
                            onChange={this.editInputChangeHandler} />
                    </div>
                    <div>
                        <textarea
                            id={todo._id}
                            name='editDescription'
                            value={this.state.editDescription}
                            onChange={this.editInputChangeHandler} />
                    </div>
                </div>
            )
        }
        return (
            <div className='todo_display'>
                <div>
                    
                    <h2>
                        <input type='checkbox' />
                        {todo.title}
                    </h2>
                </div>
                <div>{todo.description}</div>
            </div>
        )
    }

    render() {

        return (

            <div>
                <div>
                    <form>
                        <input 
                            type="text" 
                            value={this.state.title} 
                            name="title" 
                            placeholder="Title" 
                            onChange={this.entryInputChangeHandler} />
                        <textarea 
                            style={{resize: "none"}}
                            rows={6} 
                            cols={56} 
                            value={this.state.description} 
                            name="description" 
                            placeholder="Description" 
                            onChange={this.entryInputChangeHandler} />
                    </form>
                </div>
                <div>
                    <button onClick={this.entrySaveClickHandler}>Add Todo</button>
                </div>
                <div>
                    {this.state.todos.map((todo, index) => 
                        <div key={index}>
                            {this.displayRenderer(todo)}
                            {this.editRenderer(todo)}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default TodoEntry