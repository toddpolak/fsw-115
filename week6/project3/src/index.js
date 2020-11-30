const content = document.getElementById('content')

async function getData() {
    try {
        const character = await axios.get('https://rickandmortyapi.com/api/character/583')
        const location = await axios.get(character.data.location.url)
        const locationResidentUrls = location.data.residents
        const pendingPromises = []
        const characterName = character.data.name
        const characterImage = character.data.image
        const characterLocation = character.data.location.name
        const charDiv = document.createElement('div')
        const charH2 = document.createElement('h2')
        const charH3 = document.createElement('h3')
        const charImg = document.createElement('img')

        charH2.innerText = characterName
        charH3.innerText = `Location: ${characterLocation}`
        charImg.src = characterImage
        charImg.alt = ''
        charImg.style.width = '300px'
        charImg.style.height = '300px'
        charDiv.style.border = '1px solid black'
        charDiv.style.backgroundColor = 'lightgray'
        charDiv.style.width = '300px'

        charDiv.appendChild(charH2)
        charDiv.appendChild(charH3)
        charDiv.appendChild(charImg)
        content.appendChild(charDiv)

        if (locationResidentUrls !== undefined) {
            for (let i = 0; i < locationResidentUrls.length; i++) {
                pendingPromises.push(axios.get(locationResidentUrls[i]))
            }
    
            Promise.all(pendingPromises)
                .then(response => {
                    const resH2Div = document.createElement('div')
                    const resH2 = document.createElement('h2')

                    resH2.innerText = `Residents of ${characterLocation}:`
                    resH2Div.style.width = 'auto'
                    resH2Div.style.textAlign = 'center'

                    resH2Div.appendChild(resH2)
                    content.appendChild(resH2Div)

                    for (let i = 0; i < response.length; i++) {
                        if (response[i].data.name !== characterName) {
                            let resDiv = document.createElement('div')
                            let resH3 = document.createElement('h3')
                            let resImg = document.createElement('img')
                            let br = document.createElement('br')
                            
                            resH3.innerText = response[i].data.name
                            resImg.src = response[i].data.image
                            resImg.alt = ''
                            resImg.style.width = '200px'
                            resImg.style.height = '200px'
                            resDiv.style.backgroundColor = 'lightgray'
                            resDiv.style.width = '200px'
                            resDiv.style.border = '1px solid black'

                            resDiv.appendChild(resH3)
                            resDiv.appendChild(resImg)
                            content.appendChild(resDiv)
                            content.appendChild(br)
                        }
                    }
                })
                .catch(error => console.log(error))
        }
    }
    catch(error) {
        console.log(error)
    }
}

getData()