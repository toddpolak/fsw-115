const starwars = document.starwars

starwars.addEventListener('submit', (event) => {
    event.preventDefault()

    let content = document.getElementById('content');

    axios.get("https://swapi.dev/api/films")
        .then(response => {

            for (let i = 0; i < response.data.results.length; i++) {
                let title = document.createElement('h2')
                let info = document.createElement('h3')
                let item = document.createElement('div')

                title.innerHTML = response.data.results[i].title
                info.innerHTML = response.data.results[i].opening_crawl

                content.appendChild(title)
                content.appendChild(info)
                content.appendChild(item)
            }
            
        })
        .catch(error => console.log(error))
})