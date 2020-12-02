import React from 'react'
import axios from 'axios'
//import Todos from '../components/Todos'

class TodoEntry extends React.Component {
    constructor() {
        super()
        
        this.state = {
            todos: [],
            id: ''
        }

        /*
        this.state = {
            todos: [],
            title: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        */
    }

    componentDidMount() {
        axios.get('https://api.vschool.io/toddpolak/todo/')
            .then(response => {
                const todos = response.data
                this.setState({todos})
            })
    }

    editRenderer(todo, fieldName) {
        if (this.state.id && this.state.id === todo._id) {
            const saveButtonId = `save-${todo._id}`
            const cancelButtonId = `cancel-${todo._id}`
            return (
                <div>
                    <button id={saveButtonId}
                        onClick={() => console.log('SAVE CLICKED')}>
                        Save
                    </button>
                    <button id={cancelButtonId}
                        onClick={() => console.log('CANCEL CLICKED')}>
                        Cancel
                    </button>
                </div>
            )
        }
        return (
            <button onClick={() => this.editButtonClickHandler(todo)}>
                Edit
            </button>
        )
    }

    editButtonClickHandler(todo) {

        console.log(todo._id)

        this.setState({
          id: todo._id
        });
    }

    titleRenderer(todo, fieldName) {
        if (this.state.id && this.state.id === todo._id) {
            return (
                <div>
                    <input type="text"
                        id={todo._id}
                        value={todo.title}
                        onChange={() => console.log('VALUE CHANGED')} />
                </div>
            )
        }
        return (
            <div>{todo.title}</div>
        )
    }

    render() {

        return (
            <ul>
                {this.state.todos.map((todo, index) => 
                
                <li key={index}>

                    {this.titleRenderer(todo, 'title')}
                    {this.editRenderer(todo, 'title')}

                </li>
                
                )}
            </ul>
        )
    }

    /*
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleClick(event) {
        event.preventDefault()

        let todoEntry = {
            title: this.state.title,
            description: this.state.description
        }

        this.setState({
            todos: [...this.state.todos, todoEntry]
        })

        this.setState({
            title: '',
            description: ''
        })

    }

    completed() {
        if (this.state.title.length >=3 
            && this.state.description.length >=3) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <div>
                    <div style={{width: "600px", 
                        border: "1px solid black",
                        borderRadius: "5px",
                        padding: "10px"}}>
                        <h3>Todo Entry</h3>
                        <form>
                        <div style={{textAlign: "center", padding: "10px"}}>
                            <input 
                                type="text" 
                                className="right_column" 
                                value={this.state.title} 
                                name="title" 
                                placeholder="Title" 
                                onChange={this.handleChange} />
                        </div>
                        <div style={{textAlign: "center"}}>
                            <textarea 
                                style={{resize: "none"}}
                                rows={6} 
                                cols={56} 
                                value={this.state.description} 
                                name="description" 
                                placeholder="Description" 
                                onChange={this.handleChange} />
                        </div>
                        <div style={{textAlign: "center", padding: "10px"}}>
                            <button 
                                disabled={!this.completed()} 
                                onClick={this.handleClick}>Add Todo</button>
                        </div>
                    </form>
                    </div>
                    <div><Todos todos={this.state.todos} /></div>
                </div>
            </div>
        )
    }
    */
}

export default TodoEntry