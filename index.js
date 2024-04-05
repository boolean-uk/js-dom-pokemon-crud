const url = 'https://boolean-api-server.fly.dev/MyrtheDullaart/pokemon'
const cards = document.querySelector('.cards')

async function getAllPokemon() {
    const response = await fetch(url)
    const data = await response.json()

    renderAllPokemonCards(data)
}

function renderAllPokemonCards(data) {
    cards.innerHTML = ''
    data.forEach((pokemon) => {
        const li = document.createElement('li')
        const cardTitle = document.createElement('h2')
        const pokemonImage = document.createElement('img')

        li.classList.add('card')
        cardTitle.innerText = pokemon.name
        pokemonImage.classList.add('card--img')
        pokemonImage.setAttribute('width', '256')
        pokemonImage.setAttribute('src', pokemon.image)
        
        li.append(cardTitle)
        li.append(pokemonImage)
        cards.append(li)
    });
}

getAllPokemon()