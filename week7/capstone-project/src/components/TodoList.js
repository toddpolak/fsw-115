import React from 'react'
import axios from 'axios'

class TodoEntry extends React.Component {
    constructor() {
        super()
        
        this.state = {
            todos: [],
            id: '',
            title: '',
            editTitle: ''
        }
        this.entryTitleChangeHandler = this.entryTitleChangeHandler.bind(this)
        this.entrySaveClickHandler = this.entrySaveClickHandler.bind(this)
        this.editClickHandler = this.editClickHandler.bind(this)
        this.editTitleChangeHandler = this.editTitleChangeHandler.bind(this)
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

    entryTitleChangeHandler(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    entrySaveClickHandler(event) {
        event.preventDefault()

        axios.post('https://api.vschool.io/toddpolak/todo/', {
            title: this.state.title
        })
        .then(async () => {
            await axios.get('https://api.vschool.io/toddpolak/todo/')
                .then(response => {
                    let todos = response.data
                    this.setState({todos})
                    this.setState({
                        title: ''
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
          editTitle: todo.title
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

    editTitleChangeHandler(event) {
        this.setState({editTitle: event.target.value})
    }

    editSaveClickHandler(event) {
        axios.put('https://api.vschool.io/toddpolak/todo/' + event.target.id, {
            title: this.state.editTitle
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

    titleRenderer(todo) {

        if (this.state.id && this.state.id === todo._id) {
            return (
                <div>
                    <input type="text"
                        id={todo._id}
                        value={this.state.editTitle}
                        onChange={this.editTitleChangeHandler} />
                </div>
            )
        }
        return (
            <div>{todo.title}</div>
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
                        onChange={this.entryTitleChangeHandler} />
                    </form>
                </div>

                <div>
                    <button onClick={this.entrySaveClickHandler}>Save</button>
                </div>

                <ul>
                    {this.state.todos.map((todo, index) => 

                    <li key={index}>

                        {this.titleRenderer(todo, 'title')}
                        {this.editRenderer(todo, 'title')}

                    </li>
                    
                    )}
                </ul>

            </div>
        )
    }
}

export default TodoEntry