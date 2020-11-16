const spoonacular = document.spoonacular

spoonacular.addEventListener('submit', (event) => {
    event.preventDefault()

    let cuisine = spoonacular.cuisine.value
    let content = document.getElementById('content');

    content.innerHTML = ''

    axios.get("https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisine + "&apiKey=c50faf08331f483f8eeb60a44fb36cf9")
        .then(response => {

            for (let i = 0; i < response.data.results.length; i++) {
                let title = document.createElement('h2')
                let img = document.createElement('img')
                let itemInfo = document.createElement('div')
                let itemImg = document.createElement('div')
                
                img.src = response.data.results[i].image;
                title.innerHTML = response.data.results[i].title

                itemInfo.appendChild(img);
                content.appendChild(title)
                content.appendChild(itemInfo)
                content.appendChild(itemImg)
            }
        })
        .catch(error => console.log(error))
})