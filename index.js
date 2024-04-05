const url = "https://boolean-api-server.fly.dev/MrStashy/pokemon/"

//Build card
const buildCard = pokemon => {
    const li = document.createElement('li')
    li.classList.add('card')

    const h2 = document.createElement('h2')
    h2.classList.add('card--title')
    h2.innerText = pokemon.name
    li.append(h2)

    const img = document.createElement('img')
    img.setAttribute('width', 256)
    img.setAttribute('src', pokemon.image)
    img.classList.add('card--img')
    li.append(img)

    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('id', 'delete-button')
    deleteButton.classList.add('on-card-button')
    deleteButton.innerText='Delete'
    deleteButton.addEventListener('click', () => {
        deletePokemon(pokemon)
    })
    li.append(deleteButton)

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

//Add pokemon
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

//Delete pokemon
const deletePokemon = async (pokemon) => {
   await fetch(`${url}${pokemon.id}`, {
    method: 'DELETE'
   })
   renderCards()
}

renderCards()