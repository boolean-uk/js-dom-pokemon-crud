const state = {
  pokemons: []
}


// Selectors
const pokeList = document.querySelector('.poke-list')
const pokeForm = document.querySelector('.poke-form')


// Add Event 
pokeForm.addEventListener('submit', (e)  => {
  e.preventDefault()
  addNewPokemon()
})


// Logic
const listAllPokemon = () => {
  console.log(state.pokemons)
  pokeList.innerHTML = ''
  state.pokemons.forEach((pokemon) => {
    const liEl = document.createElement("li")
    const imgEl = document.createElement("img")
    const h2El = document.createElement("h2")
    const likeBtn = document.createElement("button")
    const rmvBtn = document.createElement("button")
  
    liEl.classList.add("pokemon")
    imgEl.src = pokemon.image
  
    h2El.innerText = pokemon.name

    likeBtn.innerText = isLiked(pokemon.liked)
    likeBtn.addEventListener("click", () => {
      changeLikeState(pokemon)
    })

    rmvBtn.innerText = "Remove"
    rmvBtn.addEventListener('click', () => {
      removePokemon(pokemon)
    })
  
    liEl.append(imgEl, h2El, likeBtn, rmvBtn)
    pokeList.append(liEl)
  })
}


const isLiked = (liked) => {
  return liked ? "Unlike" : "Like"
}

const changeLikeState = (pokemon) => {
  const change = {
    liked: !pokemon.liked
  }

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(change)
  }
  fetch(`http://localhost:3000/pokemons/${pokemon.id}`, requestOptions)
    .then(res => {
      console.log('Linke state changed')
      getData()
    })
}

const removePokemon = (pokemon) => {
  const requestOptions = {method: "DELETE"}
  fetch(`http://localhost:3000/pokemons/${pokemon.id}`, requestOptions)
    .then(res => {
      console.log('removed Pokemon')
      getData()
    })
}


const getData = () => {
  fetch("http://localhost:3000/pokemons")
    .then((res) => {return res.json()})
    .then((data) => {
      state.pokemons = data
      state.pokemons.forEach((pokemon) => {
        if(pokemon.liked === undefined) {
          pokemon.liked = false
        }
      })
      listAllPokemon()
    })
}


const addNewPokemon = () => {
  const newName = document.querySelector('input[name="name"]').value
  const newImg = document.querySelector('input[name="image"]').value

  const newPokemon = {
    name: newName,
    image: newImg,
    liked: false
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPokemon) 
  }

  fetch("http://localhost:3000/pokemons", requestOptions)
    .then(getData())
}


getData()