const API_URL = 'https://boolean-api-server.fly.dev/th0jensen/pokemon'

function getPokemon() {
    fetch(API_URL)
        .then(async (response) => {
            const pokemonim = await response.json()
            console.log(pokemonim)
            generateList(pokemonim)
        })
        .catch((err) => {
            throw new Error('ERROR: Could not fetch Pokemon', err)
        })
}

async function addPokemon(pokemon) {
    const postResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: pokemon.name,
            image: pokemon.image,
            liked: false,
        }),
    })

    const pokemonContent = await postResponse.json()
    console.log(pokemonContent)
}

// Render all the pokemon
function generateList(pokemonim) {
    const cardsUL = document.querySelector('.cards')
    cardsUL.innerHTML = ''

    pokemonim.forEach((item) => {
        cardsUL.appendChild(generateCard(item))
    })
}

// Render just one pokemon
function generateCard(pokemon) {
    const listItem = document.createElement('li')
    listItem.classList.add('card')

    const pokemonName = document.createElement('h2')
    pokemonName.classList.add('card--title')
    pokemonName.innerText = pokemon.name
    listItem.appendChild(pokemonName)

    const pokemonImage = document.createElement('img')
    pokemonImage.width = 256
    pokemonImage.classList.add('card--img')
    pokemonImage.src = pokemon.image
    listItem.appendChild(pokemonImage)

    return listItem
}

// Add action to form
function createForm() {
    const form = document.getElementById('poke-form')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const pokemonData = new FormData(form)
        const newPokemon = {
            name: pokemonData.get('name'),
            image: pokemonData.get('image'),
        }
        addPokemon(newPokemon).then(() => getPokemon())
    })
}

window.onload = () => {
    createForm()
    getPokemon()
}
