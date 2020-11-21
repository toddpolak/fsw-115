const todoForm = document.todoForm
const content = document.getElementById('content')

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
        title.textContent = response.data[i].title

        if (completed) {
            title.style.textDecorationLine = 'line-through'
        }

        let description = document.createElement('h4')
        let img = document.createElement('img')
        let mainDiv = document.createElement('div')
        let leftDiv = document.createElement('div')
        let rightDiv = document.createElement('div')
        let checkbox = document.createElement('input')

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

        mainDiv.style.border = "3px dashed black"
        mainDiv.style.width = "600px"

        leftDiv.style.border = "1px solid red"
        leftDiv.style.display = "inline-block"
        leftDiv.style.margin = "0px"
        leftDiv.style.width = "400px"

        rightDiv.style.border = "3px solid green"
        rightDiv.style.display = "inline-block"
        rightDiv.style.margin = "0px"
        rightDiv.style.width = "100px"

        description.textContent = response.data[i].description

        img.src = response.data[i].imgUrl
        img.style.width = "60px"
        img.style.height = "60px"

        leftDiv.appendChild(checkbox)
        leftDiv.appendChild(title)
        leftDiv.appendChild(description)

        rightDiv.appendChild(img)

        mainDiv.appendChild(leftDiv)
        mainDiv.appendChild(rightDiv)
        
        content.appendChild(mainDiv)
    }
}

getTodos()

todoForm.addEventListener("submit", function(event) {
    event.preventDefault()
    
    let newTodo = {
        title: todoForm.title.value,
        price: todoForm.price.value,
        description: todoForm.description.value,
        imageUrl: todoForm.imageUrl.value
    }

    axios.post('https://api.vschool.io/toddpolak/todo/', newTodo)
        .then(response => {
        showTodos(response)
    })
        .catch(error => console.log(error))
})