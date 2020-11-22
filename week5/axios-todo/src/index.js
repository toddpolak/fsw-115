const todoForm = document.todoForm
const content = document.getElementById('content')

getTodos()

function getTodos() {
    axios.get('https://api.vschool.io/toddpolak/todo/')
        .then(response => {
            showTodos(response)
        })
        .catch(error => console.log(error))
}

function clearTodos() {
    while(content.firstChild){
        content.removeChild(content.firstChild)
    }
}

function showTodos(response) {

    clearTodos()

    for (let i = 0; i < response.data.length; i++) {

        let completed = response.data[i].completed
        let id = response.data[i]._id

        let title = document.createElement('h3')
        let description = document.createElement('h4')
        let img = document.createElement('img')
        let mainDiv = document.createElement('div')
        let leftDiv = document.createElement('div')
        let rightDiv = document.createElement('div')
        let checkbox = document.createElement('input')
        let deleteBtn = document.createElement('button')

        title.textContent = response.data[i].title

        if (completed) {
            title.style.textDecorationStyle = "double"
            title.style.textDecorationLine = 'line-through'
        }

        checkbox.type = 'checkbox'
        checkbox.name = 'completed'
        checkbox.checked = response.data[i].completed

        checkbox.onclick = function() {
            axios.put('https://api.vschool.io/toddpolak/todo/' + id, {'completed': !completed})
                .then(response => {
                    getTodos()
                })
                .catch(error => console.log(error))
        }

        deleteBtn.textContent = "Delete"
        deleteBtn.onclick = () => {
            axios.delete('https://api.vschool.io/toddpolak/todo/' + id)
                .then(response => {
                    getTodos()
                })
                .catch(error => console.log(error))
        }

        mainDiv.style.border = "1px double lightgray"
        mainDiv.style.width = "550px"

        //leftDiv.style.border = "1px solid red"
        leftDiv.style.display = "inline-block"
        leftDiv.style.margin = "0px"
        leftDiv.style.width = "400px"

        //rightDiv.style.border = "3px solid green"
        rightDiv.style.display = "inline-block"
        rightDiv.style.margin = "0px"
        rightDiv.style.width = "100px"

        description.textContent = response.data[i].description

        if (response.data[i].imgUrl !== undefined) {
            img.src = response.data[i].imgUrl
            img.style.width = "100px"
            img.style.height = "100px"
        }

        leftDiv.appendChild(checkbox)
        leftDiv.appendChild(title)
        leftDiv.appendChild(description)
        leftDiv.appendChild(deleteBtn)

        rightDiv.appendChild(img)

        mainDiv.appendChild(leftDiv)
        mainDiv.appendChild(rightDiv)
        
        content.appendChild(mainDiv)
    }
}

todoForm.addEventListener("submit", function(event) {
    event.preventDefault()
    
    let newTodo = {
        title: todoForm.title.value,
        price: todoForm.price.value,
        description: todoForm.description.value,
        imgUrl: todoForm.imageUrl.value
    }

    axios.post('https://api.vschool.io/toddpolak/todo/', newTodo)
        .then(response => {
            getTodos()
    })
        .catch(error => console.log(error))

    todoForm.title.value = ''
    todoForm.price.value = ''
    todoForm.description.value = ''
    todoForm.imageUrl.value = ''

    window.scrollTo(0,document.body.scrollHeight);
})