const pokeForm = document.querySelector(".poke-form")
const pokeList = document.querySelector(".poke-list")
let likedPokemons = []

function createPokemonCard(pokemon) {
  const liEl = document.createElement("li")
  const imgEl = document.createElement("img")
  const h2El = document.createElement("h2")
  const deleteButton = document.createElement("button")
  const likeButton = document.createElement("button")
  const likeImage = document.createElement("img")

  liEl.classList.add("pokemon")
  imgEl.src = pokemon.image

  h2El.innerText = pokemon.name

  deleteButton.innerText = 'Delete'
  deleteButton.setAttribute('id', 'delete' + pokemon.id)
  deleteButton.setAttribute('class', 'deleteButton')

  likeButton.innerText = 'Like'
  likeButton.setAttribute('id', 'like' + pokemon.id)
  likeButton.setAttribute('class', 'likeButton')

  likeImage.setAttribute('src', 'assets/heart.svg')
  likeImage.setAttribute('alt', pokemon.name)
  likeImage.setAttribute('width', '10px')
  likeImage.classList.add('notLiked')

  if (findLikedPokemons(pokemon.id)) {
    likeImage.classList.remove('notLiked')
    likeImage.classList.add('liked')
  }

  liEl.append(likeImage, imgEl, h2El, likeButton, deleteButton)
  pokeList.append(liEl)

  deleteButton.addEventListener('click', function (e) {
    deletePokemon(pokemon.id)
  });
  likeButton.addEventListener('click', function (e) {
    if (!findLikedPokemons(pokemon.id)) {
      likePokemon(pokemon.id)
      likeImage.classList.remove('notLiked')
      likeImage.classList.add('liked')
    } else {
      likedPokemons = removeLikedPokemon(pokemon.id)
      likeImage.classList.remove('liked')
      likeImage.classList.add('notLiked')
    }
  });
}

function addPokemons(pokemons) {
  pokemons.forEach(pokemon => createPokemonCard(pokemon))
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
    .then(pokemon => createPokemonCard(pokemon))
}

function deletePokemon(pokemonId) {
  likedPokemons = removeLikedPokemon(pokemonId)
  fetch("http://localhost:3000/pokemons/" + pokemonId, {
    method: "DELETE"
  })
}

function likePokemon(pokemonId) {
  if (!findLikedPokemons(pokemonId)) {
    likedPokemons.push(pokemonId)
  }
}

function removeLikedPokemon(pokemonId) { 
  return likedPokemons.filter(function(pokemonItem){ 
      return pokemonItem != pokemonId; 
  });
}

function findLikedPokemons(pokemonId) {
  if (likedPokemons.find(element => element === pokemonId)) {
    return true
  }
  return false
}

function init() {
  getAllPokemons()
  listenToAddPokemonForm();
}

init()