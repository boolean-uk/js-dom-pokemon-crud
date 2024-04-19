const GITHUB_USERNAME = 'JOANNABUUMA1'
const ROOT_URL = 'https://boolean-api-server.fly.dev/'
let allPokemons = []
let editActive = false

const getAll = async () => {
    let response = await fetch(`${ROOT_URL}${GITHUB_USERNAME}/pokemon`)
    let pokemons = await response.json()

    // fix broken Chamander image link
    let charmander = pokemons.find(pokemon => pokemon.name === 'Charmander')
    if (charmander != undefined)
        charmander.image = 'https://img.pokemondb.net/artwork/large/charmander.jpg'

    return pokemons
}

const create = async (newPokemon) => {
    const options = {
        method: "POST",
        body: JSON.stringify(newPokemon),
        headers: { "Content-Type": "application/json" }
    }
    const response = await fetch(`${ROOT_URL}${GITHUB_USERNAME}/pokemon`, options)
    const responseData = await response.json()
}

const update = async (id, payload) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    }
    const response = await fetch(`${ROOT_URL}${GITHUB_USERNAME}/pokemon/${id}`, options)
    console.log(await response.json())
}

const handleOnDelete = (id) => update(id, { id: Number(id) }, "DELETE")

const handleOnLike = (id, liked) => {
    const pokemon = allPokemons.find((pokemon) => { return pokemon.id == id })
    update(id, { ...pokemon, liked: liked }, "PUT")
}

const handleOnEdit = id => {
    let pokemon = allPokemons.find(pokemon => pokemon.id === id)
    console.log(pokemon)
    editActive = true
    document.getElementById("id-input").value = pokemon.id
    document.getElementById("name-input").value = pokemon.name
    document.getElementById("image-input").value = pokemon.image
    document.getElementById("submit").value = "Update Pokemon"
}

const resetForm = () => {
    document.getElementById("id-input").value = ""
    document.getElementById("name-input").value = ""
    document.getElementById("image-input").value = ""
    document.getElementById("submit").value = "Add Pokemon"
}

const render = (pokemons) => {
    let list = document.querySelector("ul")
    list.innerHTML = ""
    pokemons.forEach(pokemon => {
        let list_item = document.createElement("li")
        list_item.className = "card"
        list_item.innerHTML = `
        <h2 class="card--title">${pokemon.name}</h2>
        <img
            width="256"
            class="card--img"
            src=${pokemon.image}
        />
        <button class="cross" onclick="handleOnDelete(${pokemon.id})">&#10006</button>
        <button class="${pokemon.liked ? 'liked' : ''}" onclick="handleOnLike(${pokemon.id},${!pokemon.liked})">&#10084</button>
        <button class="edit" onclick="handleOnEdit(${pokemon.id})">&#9998;</button> 
        `
        list.append(list_item)
    })
}

document.addEventListener("DOMContentLoaded", async function () {
    document.querySelector("form").onsubmit = async event => {
        event.preventDefault()
        const name = event.target[0].value;
        const image = event.target[1].value;
        if (!editActive) {
            await create({ name, image, liked: false })
        } else {
            const id = event.target[2].value;
            await update(id, { name, image, liked: false })
            editActive = false
        }
        resetForm()
        allPokemons = []
        allPokemons = await getAll()
        render(allPokemons)
    }
    allPokemons = await getAll()
    render(allPokemons)
});