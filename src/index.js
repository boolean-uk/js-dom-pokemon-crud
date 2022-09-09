const pokeForm = document.querySelector(".poke-form")
const pokeList = document.querySelector(".poke-list")

function addPokemon(pokemon) {
  const liEl = document.createElement("li")
  const imgEl = document.createElement("img")
  const h2El = document.createElement("h2")

  liEl.classList.add("pokemon")
  imgEl.src = pokemon.image

  h2El.innerText = pokemon.name

  liEl.append(imgEl, h2El)
  pokeList.append(liEl)
}

function addPokemons(pokemons) {
  pokemons.forEach(pokemon => addPokemon(pokemon))
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    }
    postNewPokemon(newPokemon)
    pokeForm.reset()
  })
}

function getAllPokemons() {
  fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then(pokemons => addPokemons(pokemons))
}

function postNewPokemon(newPokemon) {
  fetch("http://localhost:3000/pokemons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pokemon)
  })
    .then(res => res.json())
    .then(pokemon => addPokemon(pokemon))
}

function init() {
  getAllPokemons()
  listenToAddPokemonForm();
}

init()