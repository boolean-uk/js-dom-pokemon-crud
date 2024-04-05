const url = 'https://boolean-api-server.fly.dev/MyrtheDullaart/pokemon'
const cards = document.querySelector('.cards')
const form = document.querySelector('#poke-form')
const nameInput = document.querySelector('#name-input')
const imageInput = document.querySelector('#image-input')

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
        const deleteButton = document.createElement('button')
        const div = updatePokemonDiv(pokemon)
        const likeButton = document.createElement('button')

        li.classList.add('card')
        cardTitle.classList.add('card--title')
        cardTitle.innerText = pokemon.name
        pokemonImage.classList.add('card--img')
        pokemonImage.setAttribute('width', '256')
        pokemonImage.setAttribute('src', pokemon.image)
        likeButton.innerText = 'Like'
        likeButton.classList.add('like-button')
        deleteButton.classList.add('delete-button')
        deleteButton.innerText = 'Delete'
        
        if (!pokemon.liked) {
            const notLiked = document.createElement('img')

            notLiked.setAttribute('src', './assets/icons/emptyheart.svg')
            notLiked.classList.add('liked-image')

            li.append(notLiked)
        } else if (pokemon.liked) {
            const liked = document.createElement('img')

            liked.setAttribute('src', './assets/icons/filledheart.svg')
            liked.classList.add('liked-image')

            li.append(liked)
        }

        
        li.append(cardTitle)
        li.append(pokemonImage)
        li.append(div)
        li.append(likeButton)
        li.append(deleteButton)
        cards.append(li)

        deleteButton.addEventListener('click', () => {
            deletePokemon(pokemon)
        })

        likeButton.addEventListener('click', () => {
            likePokemon(pokemon)
        })
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    createPokemonCard()
})

async function createPokemonCard() {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            image: imageInput.value,
            liked: false
        }),
        headers: {
            'Content-type': 'application/json',
        },
    }

    await fetch(url, options)

    nameInput.value = ''
    imageInput.value = ''

    getAllPokemon()
}

async function deletePokemon(pokemon) {
    const deleteUrl = `https://boolean-api-server.fly.dev/MyrtheDullaart/pokemon/${pokemon.id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    }

    await fetch(deleteUrl,options)

    getAllPokemon()
}

function updatePokemonDiv(pokemon) {
    const updateForm = document.createElement('form')
    const nameLabel = document.createElement('label')
    const newNameInput =  document.createElement('input')
    const imageLabel = document.createElement('label')
    const newImageInput =  document.createElement('input')
    const updateButton = document.createElement('input')  

    updateForm.classList.add('update-form')
    nameLabel.innerText = 'Name: '
    imageLabel.innerText = 'Image URL: '
    newNameInput.classList.add('new-input')
    newNameInput.setAttribute('required', true)
    newImageInput.classList.add('new-input')
    newImageInput.setAttribute('required', true)
    updateButton.classList.add('update-button')
    updateButton.setAttribute('type', 'submit')
    updateButton.setAttribute('value', 'Update')

    updateForm.append(nameLabel)
    nameLabel.append(newNameInput)
    updateForm.append(imageLabel)
    imageLabel.append(newImageInput)
    updateForm.append(updateButton)

    updateForm.addEventListener('submit', (event) => {
        event.preventDefault()

        updatePokemon(pokemon, newNameInput.value, newImageInput.value)
    })

    return updateForm
}

async function updatePokemon(pokemon, newNameInput, newImageInput) {
    const updateUrl = `https://boolean-api-server.fly.dev/MyrtheDullaart/pokemon/${pokemon.id}`
    const options = {
        method: 'PUT',
        body: JSON.stringify({
            name: newNameInput,
            image: newImageInput,
            liked: pokemon.liked
        }),
        headers: {
            'Content-type': 'application/json',
        }
    }

    await fetch(updateUrl,options)

    getAllPokemon()
}

async function likePokemon(pokemon) {
    const likeUrl = `https://boolean-api-server.fly.dev/MyrtheDullaart/pokemon/${pokemon.id}`
    const options = {
        method: 'PUT',
        body: JSON.stringify({
            name: pokemon.name,
            image: pokemon.image,
            liked: !pokemon.liked
        }),
        headers: {
            'Content-type': 'application/json',
        }
    }
    await fetch(likeUrl,options)

    getAllPokemon()
}


getAllPokemon()