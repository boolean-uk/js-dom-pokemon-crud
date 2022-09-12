const POKE_FORM = document.querySelector(".poke-form")
const POKE_LIST = document.querySelector(".poke-list")
let likedPokemons = []

function createPokemonCard(pokemon) {
  const LI_EL = document.createElement("li")
  const IMG_EL = document.createElement("img")
  const H2_EL = document.createElement("h2")
  const DELETE_BUTTON = document.createElement("button")
  const LIKE_BUTTON = document.createElement("button")
  const LIKE_IMAGE = document.createElement("img")

  LI_EL.classList.add("pokemon")
  IMG_EL.src = pokemon.image

  H2_EL.innerText = pokemon.name

  DELETE_BUTTON.innerText = 'Delete'
  DELETE_BUTTON.setAttribute('id', 'delete' + pokemon.id)
  DELETE_BUTTON.setAttribute('class', 'deleteButton')

  LIKE_BUTTON.innerText = 'Like'
  LIKE_BUTTON.setAttribute('id', 'like' + pokemon.id)
  LIKE_BUTTON.setAttribute('class', 'likeButton')

  LIKE_IMAGE.setAttribute('src', 'assets/heart.svg')
  LIKE_IMAGE.setAttribute('alt', pokemon.name)
  LIKE_IMAGE.setAttribute('width', '10px')
  LIKE_IMAGE.classList.add('notLiked')

  if (findLikedPokemon(pokemon.id)) {
    LIKE_IMAGE.classList.remove('notLiked')
    LIKE_IMAGE.classList.add('liked')
  }

  LI_EL.append(LIKE_IMAGE, IMG_EL, H2_EL, LIKE_BUTTON, DELETE_BUTTON)
  POKE_LIST.append(LI_EL)

  DELETE_BUTTON.addEventListener('click', function (e) {
    deletePokemon(pokemon.id)
  });

  LIKE_BUTTON.addEventListener('click', function (e) {
    if (!findLikedPokemon(pokemon.id)) {
      likePokemon(pokemon.id)
      LIKE_IMAGE.classList.remove('notLiked')
      LIKE_IMAGE.classList.add('liked')
    } else {
      likedPokemons = removeLikedPokemon(pokemon.id)
      LIKE_IMAGE.classList.remove('liked')
      LIKE_IMAGE.classList.add('notLiked')
    }
  });
}

function addPokemons(pokemons) {
  pokemons.forEach(pokemon => createPokemonCard(pokemon))
}

function listenToAddPokemonForm() {
  POKE_FORM.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: POKE_FORM.name.value,
      image: POKE_FORM.image.value
    }
    postNewPokemon(pokemon)
    POKE_FORM.reset()
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
  if (!findLikedPokemon(pokemonId)) {
    likedPokemons.push(pokemonId)
  }
}

function removeLikedPokemon(pokemonId) { 
  return likedPokemons.filter(function(pokemonItem){ 
      return pokemonItem != pokemonId; 
  });
}

function findLikedPokemon(pokemonId) {
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