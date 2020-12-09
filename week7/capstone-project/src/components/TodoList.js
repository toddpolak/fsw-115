import React, {Component} from 'react'
import axios from 'axios'
import Entry from '../components/Entry'
import Todo from '../components/Todo'

class TodoList extends Component {
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
        this.titleClick = this.titleClick.bind(this)
    }

    componentDidMount() {
        axios.get('https://api.vschool.io/toddpolak/todo/')
            .then(response => {
                let todos = response.data
                todos.reverse()
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
                    todos.reverse()
                    this.setState({todos})
                    this.setState({
                        title: '',
                        description: ''
                    })
                })
        })
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
                        todos.reverse()
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
                    todos.reverse()
                    this.setState({todos})
                    this.setState({id: ''})
                })
        })
    }

    editCancelClickHandler() {
        this.setState({id: ''})
    }

    titleClick(todo) {
        axios.put('https://api.vschool.io/toddpolak/todo/' + todo._id, 
        {'completed': !todo.completed})
            .then(async () => {
                await axios.get('https://api.vschool.io/toddpolak/todo/')
                    .then(response => {
                        let todos = response.data
                        todos.reverse()
                        this.setState({todos})
                        this.setState({id: ''})
                    })
            })
    }

    render() {
        return (
            <div>
                <Entry 
                    title={this.state.title}
                    description={this.state.description}
                    entryInputChangeHandler={this.entryInputChangeHandler}
                    entrySaveClickHandler={this.entrySaveClickHandler}
                />
                <div>
                    {this.state.todos.map((todo, index) => 
                        <div key={index}>
                            <Todo 
                                todo={todo}
                                id={this.state.id}
                                editTitle={this.state.editTitle}
                                editDescription={this.state.editDescription}
                                titleClick={this.titleClick}
                                editClickHandler={this.editClickHandler}
                                deleteClickHandler={this.deleteClickHandler}
                                editInputChangeHandler={this.editInputChangeHandler}    
                                editSaveClickHandler={this.editSaveClickHandler}
                                editCancelClickHandler={this.editClickHandler}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default TodoList