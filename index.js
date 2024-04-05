const url = "https://boolean-api-server.fly.dev/MrStashy/pokemon"

//Build card
const buildCard = pokemon => {
    const li = document.createElement('li')

    const h2 = document.createElement('h2')
    h2.classList.add('card--title')
    h2.innerText = pokemon.name
    li.append(h2)

    const img = document.createElement('img')
    img.setAttribute('width', 256)
    img.setAttribute('src', pokemon.image)
    img.classList.add('card--img')
    li.append(img)

    const cardList = document.querySelector('.cards')
    cardList.append(li)
}

const renderCards = async () => {
    const cardList = document.querySelector('.cards')

    const response = await fetch(url)
    const json = await response.json()

    cardList.innerHTML = ''
    json.forEach(buildCard)
}

//Add event listener to button
const addForm = document.querySelector('#poke-form')
addForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const nameInput = document.querySelector('#name-input')
    const imgInput = document.querySelector('#image-input')
    addNewPokemon(nameInput, imgInput)
})


const addNewPokemon = async (name, image) => {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            image: image.value,
            liked: false
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
 renderCards()
}



renderCards()