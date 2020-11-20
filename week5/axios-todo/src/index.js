const todoForm = document.todoForm
const content = document.getElementById('content')

axios.get('https://api.vschool.io/toddpolak/todo/')
    .then(response => {
        showTodos(response)
    })
    .catch(error => console.log(error))

function clearTodos() {
    while(content.firstChild){
        content.removeChild(content.firstChild)
    }
}

function showTodos(response) {

    for (let i = 0; i < response.data.length; i++) {

        let ol = document.createElement('ol')
        let li = document.createElement('li')
        let title = document.createElement('h3')
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
            alert('click')
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

        title.textContent = response.data[i].title

        description.textContent = response.data[i].description

        console.log(response.data[i].title, 'image: ' + response.data[i].imgUrl)

        if (response.data[i].imgUrl !== undefined) {
            img.src = response.data[i].imgUrl
            img.style.width = "70px"
            img.style.height = "70px"
        }

        if (response.data[i].completed) {
            title.style.textDecorationLine = 'line-through'
        }
        li.appendChild(title)

        if (response.data[i].description !== undefined) {
            li.appendChild(description)
        }

        li.appendChild(checkbox)

        ol.appendChild(li)

        leftDiv.appendChild(ol)
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
        imageUrl: todoForm.imageUrl.value
    }

    axios.post('https://api.vschool.io/toddpolak/todo/', newTodo)
        .then(response => {
        showTodos(response)
    })
        .catch(error => console.log(error))
})