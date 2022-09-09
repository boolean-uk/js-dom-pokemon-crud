const pokeForm = document.querySelector(".poke-form")
const pokeList = document.querySelector(".poke-list")

function addPokemon(pokemon) {
  const liEl = document.createElement("li")
  const imgEl = document.createElement("img")
  const h2El = document.createElement("h2")
  const deleteButton = document.createElement("button")
  const editButton = document.createElement("button")

  liEl.classList.add("pokemon")
  imgEl.src = pokemon.image

  h2El.innerText = pokemon.name

  deleteButton.innerText = 'Delete'
  deleteButton.setAttribute('id', 'delete' + pokemon.id)
  deleteButton.setAttribute('class', 'deleteButton')

  editButton.innerText = 'Edit'
  editButton.setAttribute('id', 'edit' + pokemon.id)
  editButton.setAttribute('class', 'editButton')

  liEl.append(imgEl, h2El, editButton, deleteButton)
  pokeList.append(liEl)

  deleteButton.addEventListener('click', function(e) {  console.log('delete button clicked', pokemon.id) });
  editButton.addEventListener('click', function(e) {  console.log('edit button clicked', pokemon.id) });
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
    postNewPokemon(pokemon)
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
    body: JSON.stringify(newPokemon)
  })
    .then(res => res.json())
    .then(pokemon => addPokemon(pokemon))
}

function init() {
  getAllPokemons()
  listenToAddPokemonForm();
}

init()