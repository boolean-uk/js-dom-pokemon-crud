const url = 'https://boolean-api-server.fly.dev/tzoltie/pokemon'
const pokemonForm = document.querySelector('#poke-form')
const nameInput = document.querySelector('#name-input')
const urlSearch = document.querySelector('#image-input')
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

getCards()