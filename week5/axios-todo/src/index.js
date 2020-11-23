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
        let displayImg = false

        title.textContent = response.data[i].title
        if (completed) {
            title.style.textDecorationStyle = 'double'
            title.style.textDecorationLine = 'line-through'
        }
        title.style.display = 'inline'

        description.textContent = response.data[i].description

        if (response.data[i].imgUrl !== '') {
            img.src = response.data[i].imgUrl
            img.style.width = '100px'
            img.style.height = '100px'
            displayImg = true
        }

        let titleEdit = document.createElement('input')
        titleEdit.name = 'titleEdit'
        titleEdit.value = response.data[i].title
        titleEdit.style.display = 'none'

        let descriptionEdit = document.createElement('textarea')
        descriptionEdit.name = 'descriptionEdit'
        descriptionEdit.rows = '3'
        descriptionEdit.cols = '40'
        descriptionEdit.value = response.data[i].description
        descriptionEdit.style.display = 'none'
        
        let editBtn = document.createElement('button')
        editBtn.textContent = 'Edit'

        let saveBtn = document.createElement('button')
        saveBtn.textContent = 'Save'
        saveBtn.style.display = 'none'

        editBtn.onclick = function() {
            title.style.display = 'none'
            titleEdit.style.display = 'inline'
            description.style.display = 'none'
            descriptionEdit.style.display = 'none'
            descriptionEdit.style.display = 'inline'
            editBtn.style.display = 'none'
            saveBtn.style.display = 'inline'
            checkbox.style.display = 'none'
        }

        saveBtn.onclick = function() {
            axios.put('https://api.vschool.io/toddpolak/todo/' + id, {
                'title': titleEdit.value,
                'description': descriptionEdit.value
            })
                .then(response => {
                    getTodos()
                })
                .catch(error => console.log(error))
        }

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

        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.onclick = () => {
            axios.delete('https://api.vschool.io/toddpolak/todo/' + id)
                .then(response => {
                    getTodos()
                })
                .catch(error => console.log(error))
        }

        let mainDiv = document.createElement('div')
        let leftDiv = document.createElement('div')
        let rightDiv = document.createElement('div')
        let btmDiv = document.createElement('div')

        btmDiv.style.height = '25px'

        mainDiv.style.border = '1px double lightgray'
        mainDiv.style.width = '550px'
        mainDiv.style.minHeight = '200px'

        leftDiv.style.display = 'inline-block'
        leftDiv.style.margin = '0px'
        leftDiv.style.width = '400px'

        rightDiv.style.display = 'inline-block'
        rightDiv.style.margin = '0px'
        rightDiv.style.width = '100px'
        rightDiv.style.padding = '20px'

        leftDiv.appendChild(checkbox)
        leftDiv.appendChild(title)
        leftDiv.appendChild(titleEdit)

        leftDiv.appendChild(description)
        leftDiv.appendChild(descriptionEdit)

        btmDiv.appendChild(editBtn)
        btmDiv.appendChild(saveBtn)
        btmDiv.appendChild(deleteBtn)

        if (displayImg) {rightDiv.appendChild(img)}

        mainDiv.appendChild(leftDiv)
        mainDiv.appendChild(rightDiv)
        mainDiv.appendChild(btmDiv)
        
        content.appendChild(mainDiv)
    }
}

todoForm.addEventListener('submit', function(event) {
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