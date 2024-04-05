const url = 'https://boolean-api-server.fly.dev/tzoltie/pokemon'
const pokemonForm = document.querySelector('#poke-form')
const nameInput = document.querySelector('#name-input')
const urlInput = document.querySelector('#image-input')
const cardList = document.querySelector('.cards')


function getCards() {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            cardList.innerHTML = ''
            json.forEach(pokemon => createCard(pokemon.name, pokemon.image));
        })
}


function createCard(name, image) {
    const listItem = document.createElement('li')
    listItem.classList.add('card')
    
    const deleteBtn = document.createElement('input')
    deleteBtn.classList.add('delete-button')
    deleteBtn.type = 'button'
    deleteBtn.value = 'X'
    listItem.append(deleteBtn)

    deleteBtn.addEventListener('click', () => {
        removerCard(listItem)})

    const pokemonName = document.createElement('h2')
    pokemonName.classList.add('card--title')
    pokemonName.innerText = name
    listItem.append(pokemonName)

    const pokemonImage = document.createElement('img')
    pokemonImage.width = '256'
    pokemonImage.classList.add('card--img')
    pokemonImage.setAttribute('src', image)
    listItem.append(pokemonImage)

    

    cardList.append(listItem)
}


pokemonForm.addEventListener('submit', (element) => {
    element.preventDefault()

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            image: urlInput.value,
            liked: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then(json => {
            getCards()
            cardList.innerHTML = ''
        })
})


getCards()

function removerCard(listItem) {
    listItem.remove()
    console.log('card removed')
}