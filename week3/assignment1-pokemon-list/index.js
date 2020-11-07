const xhr = new XMLHttpRequest()

xhr.open('GET', 'https://api.vschool.io/pokemon')
xhr.send()

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const JSONdata = xhr.responseText
        const data = JSON.parse(JSONdata)

        showData(data.objects[0].pokemon)
    }
}

showData = (arr) => {
    let content = document.getElementById('content')

    for (let i = 0; i < arr.length; i++) {
        const h2 = document.createElement('h2')
        const h4 = document.createElement('h4')
        h2.textContent = arr[i].name
        h4.textContent = arr[i].resource_uri
        content.appendChild(h2)
        content.appendChild(h4)
    }
}