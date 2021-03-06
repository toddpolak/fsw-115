const content = document.getElementById('content')
const ol = document.createElement('ol')

axios.get("https://api.vschool.io/toddpolak/todo/")
    .then(response => {

        console.log(response)

        for (let i = 0; i < response.data.length; i++) {

            let li = document.createElement('li')
            let title = document.createElement('h3')
            let description = document.createElement('h4')
            let img = document.createElement('img')

            title.textContent = response.data[i].title
            description.textContent = response.data[i].description
            img.src = response.data[i].imgUrl
            img.style.width = "100px"
            img.style.height = "100px"

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