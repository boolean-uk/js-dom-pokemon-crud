const url = 'https://boolean-api-server.fly.dev/LeonardoSaraceli/pokemon'

const form = document.querySelector('#poke-form')
const ul = document.querySelector('.cards')
const pokeName = document.querySelector('#name-input')
const pokeImg = document.querySelector('#image-input')

const updateForm = document.createElement('form')
updateForm.classList.add('update-form')
document.body.append(updateForm)

const pokemonId = document.createElement('label')
pokemonId.innerText = 'Pokemon ID: '
updateForm.append(pokemonId)

const pokemonIdInput = document.createElement('input')
pokemonIdInput.setAttribute('type', 'number')
pokemonIdInput.setAttribute('min', '1')
pokemonIdInput.setAttribute('max', '99')
pokemonId.append(pokemonIdInput)

const updateName = document.createElement('label')
updateName.innerText = 'New name: '
updateForm.append(updateName)

const updateNameInput = document.createElement('input')
updateNameInput.setAttribute('type', 'text')
updateName.append(updateNameInput)

const updateImg = document.createElement('label')
updateImg.innerText = 'New image URL: '
updateForm.append(updateImg)

const updateImgInput = document.createElement('input')
updateImgInput.setAttribute('type', 'text')
updateImg.append(updateImgInput)

const updateBtn = document.createElement('input')
updateBtn.setAttribute('type', 'submit')
updateBtn.setAttribute('value', 'Update Pokémon')
updateForm.append(updateBtn)

const deleteForm = document.createElement('form')
deleteForm.classList.add('delete-form')
document.body.append(deleteForm)

const deletePokemonId = document.createElement('label')
deletePokemonId.innerText = 'Pokemon ID: '
deleteForm.append(deletePokemonId)

const deletePokemonIdInput = document.createElement('input')
deletePokemonIdInput.setAttribute('type', 'number')
deletePokemonIdInput.setAttribute('min', '1')
deletePokemonIdInput.setAttribute('max', '99')
deletePokemonId.append(deletePokemonIdInput)

const deleteBtn = document.createElement('input')
deleteBtn.setAttribute('type', 'submit')
deleteBtn.setAttribute('value', 'Delete Pokémon')
deleteForm.append(deleteBtn)

function renderPokemonCard(name, num, image, liked) {
    const li = document.createElement('li')
    li.classList.add('pokemon-item')
    ul.append(li)

    const h2 = document.createElement('h2')
    h2.classList.add('card--title')
    h2.innerText = name
    li.append(h2)

    const id = document.createElement('p')
    id.innerText = num
    li.append(id)

    const img = document.createElement('img')
    img.setAttribute('width', '256')
    img.setAttribute('class', 'card--img')
    img.setAttribute('src', image)
    li.append(img)

    const like = document.createElement('button')
    like.classList.add('like')
    like.innerText = liked
    li.append(like)

    like.addEventListener('click', () => {
        like.classList.toggle('liked')
    })
}

async function getAllPokemons() {
    const res = await fetch(url)
    const json = await res.json()

    ul.innerHTML = ''
    json.forEach(pokemon => renderPokemonCard(pokemon.name, `Pokémon ID: ${pokemon.id}`, pokemon.image, pokemon.liked))
}

async function onSubmit(event) {
    event.preventDefault()

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: pokeName.value,
            image: pokeImg.value,
            liked: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    getAllPokemons()
    pokeName.value = ''
    pokeImg.value = ''
}

async function updatePokemon(event) {
    event.preventDefault()

    const putUrl = `https://boolean-api-server.fly.dev/LeonardoSaraceli/pokemon/${pokemonIdInput.value}`

    await fetch(putUrl, {
        method: 'PUT',
        body: JSON.stringify({
            name: updateNameInput.value,
            image: updateImgInput.value,
            liked: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    getAllPokemons()
    pokemonIdInput.value = ''
    updateNameInput.value = ''
    updateImgInput.value = ''
}

async function deletePokemon(event) {
    event.preventDefault()

    const deleteUrl = `https://boolean-api-server.fly.dev/LeonardoSaraceli/pokemon/${deletePokemonIdInput.value}`

    await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })

    getAllPokemons()
    deletePokemonIdInput.value = ''
}

deleteForm.addEventListener('submit', deletePokemon)

updateForm.addEventListener('submit', updatePokemon)

form.addEventListener('submit', onSubmit)

getAllPokemons()