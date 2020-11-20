const todoForm = document.todoForm
const content = document.getElementById('content')
const ol = document.createElement('ol')

axios.get('https://api.vschool.io/toddpolak/todo/')
    .then(response => {

        for (let i = 0; i < response.data.length; i++) {

            let li = document.createElement('li')
            let title = document.createElement('h3')
            let description = document.createElement('h4')
            let img = document.createElement('img')

            title.textContent = response.data[i].title
            description.textContent = response.data[i].description

            if (response.data[i].imgUrl !== '') {
                img.src = response.data[i].imgUrl
                img.style.width = "100px"
                img.style.height = "100px"
            }

            if (response.data[i].completed) {
                title.style.textDecorationLine = 'line-through'
            }

            li.appendChild(title)
            li.appendChild(description)
            li.appendChild(img)
            ol.appendChild(li)
        }
        content.appendChild(ol)
    })
    .catch(error => console.log(error))

todoForm.addEventListener("submit", function(event) {
    event.preventDefault()
    
    let newTodo = {
        title: todoForm.title.value,
        price: todoForm.price.value,
        description: todoForm.description.value,
        imageUrl: todoForm.imageUrl.value
    }

    axios.post('https://api.vschool.io/toddpolak/todo/', newTodo)
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
})