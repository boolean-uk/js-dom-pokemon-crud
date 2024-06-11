const API_URL = 'https://boolean-api-server.fly.dev/th0jensen/pokemon'

const state = {
    isEditing: false,
}

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

async function deletePokemon(pokemon) {
    const postResponse = await fetch(API_URL + '/' + pokemon.id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const pokemonContent = await postResponse.json()
    console.log(pokemonContent)
}

async function updatePokemon(pokemon) {
    const postResponse = await fetch(API_URL + '/' + pokemon.id, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            liked: pokemon.liked,
        }),
    })

    const pokemonContent = await postResponse.json()
    console.log(pokemonContent)
}

// Render all the pokemon
function generateList(pokemonim) {
    const cardsUL = document.querySelector('.cards')
    cardsUL.innerHTML = ''

    if (state.isEditing) {
        pokemonim.forEach((item) => {
            cardsUL.appendChild(generateEditCard(item))
        })
        return
    }

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
    pokemonImage.height = 256
    pokemonImage.classList.add('card--img')
    pokemonImage.src = pokemon.image
    listItem.appendChild(pokemonImage)

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', () =>
        deletePokemon(pokemon).then(() => getPokemon())
    )
    listItem.appendChild(deleteButton)

    const favouriteButton = document.createElement('button')
    favouriteButton.innerText = pokemon.liked ? 'Remove favourite' : 'Favourite'
    favouriteButton.addEventListener('click', () => {
        if (pokemon.liked) {
            pokemon.liked = false
            updatePokemon(pokemon).then(() => getPokemon())
        } else {
            pokemon.liked = true
            updatePokemon(pokemon).then(() => getPokemon())
        }
    })
    listItem.appendChild(favouriteButton)

    const editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    editButton.addEventListener('click', () => {
        state.isEditing = true
        getPokemon()
    })
    listItem.appendChild(editButton)

    return listItem
}

// Add edit functionality to the cards
function generateEditCard(pokemon) {
    const listItem = document.createElement('li')
    listItem.classList.add('card')

    const pokemonNameLabel = document.createElement('label')
    pokemonNameLabel.innerText = 'Name'
    listItem.appendChild(pokemonNameLabel)

    const pokemonName = document.createElement('input')
    pokemonName.value = pokemon.name
    listItem.appendChild(pokemonName)

    const breek = document.createElement('br')
    listItem.appendChild(breek)

    const pokemonImageLabel = document.createElement('label')
    pokemonImageLabel.innerText = 'Image'
    listItem.appendChild(pokemonImageLabel)

    const pokemonImage = document.createElement('input')
    pokemonImage.value = pokemon.image
    listItem.appendChild(pokemonImage)

    const breek2 = document.createElement('br')
    listItem.appendChild(breek2)

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Submit'
    deleteButton.addEventListener('click', () => {
        const updatedPokemon = {
            id: pokemon.id,
            name: pokemonName.value,
            image: pokemonImage.value,
            liked: pokemon.liked,
        }
        state.isEditing = false
        updatePokemon(updatedPokemon).then(() => getPokemon())
    })
    listItem.appendChild(deleteButton)

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
