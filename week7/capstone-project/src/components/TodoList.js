import React from 'react'
import axios from 'axios'

class TodoEntry extends React.Component {
    constructor() {
        super()
        
        this.state = {
            todos: [],
            id: '',
            title: ''
        }
        this.editButtonClickHandler = this.editButtonClickHandler.bind(this)
        this.titleChangeHandler = this.titleChangeHandler.bind(this)
        this.saveButtonClickHandler = this.saveButtonClickHandler.bind(this)
    }

    componentDidMount() {

        axios.get('https://api.vschool.io/toddpolak/todo/')
            .then(response => {
                let todos = response.data
                this.setState({todos})
            })
    }

    editRenderer(todo, fieldName) {
        if (this.state.id && this.state.id === todo._id) {
            return (
                <div>
                    <button id={todo._id}
                        onClick={this.saveButtonClickHandler}>
                        Save
                    </button>
                    <button 
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
        this.setState({
          id: todo._id,
          title: todo.title
        });
    }

    titleChangeHandler(event) {
        this.setState({title: event.target.value})
    }

    saveButtonClickHandler(event) {

        const updates = {
            title: this.state.title
        }

        axios.put('https://api.vschool.io/toddpolak/todo/' + event.target.id, updates)

        

            
            .then(async response => {
                const response_1 = await axios.get('https://api.vschool.io/toddpolak/todo/')
                let todos = response_1.data
                this.setState({ todos })
            })
            

        this.setState({ id: ''})


    }

    titleRenderer(todo) {

        if (this.state.id && this.state.id === todo._id) {
            return (
                <div>
                    <input type="text"
                        id={todo._id}
                        value={this.state.title}
                        onChange={this.titleChangeHandler} />
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
}

export default TodoEntry