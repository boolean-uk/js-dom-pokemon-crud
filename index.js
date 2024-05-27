document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://boolean-uk-api-server.fly.dev/Shaun-Harris/pokemon'
  const pokemonList = document.getElementById('pokemon-list')
  const pokeForm = document.getElementById('poke-form')

  const fetchPokemon = async () => {
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      displayPokemon(data)
    } catch (error) {
      console.error('Error fetching Pokémon:', error)
    }
  }

  const displayPokemon = (pokemon) => {
    pokemonList.innerHTML = ''
    pokemon.forEach(poke => {
      const li = document.createElement('li')
      li.classList.add('card')
      li.dataset.id = poke.id
      li.innerHTML = `
        <div class="pokemon">
          <img src="${poke.image}" alt="${poke.name}" class="card--img"/>
          <h2>${poke.name}</h2>
          <button class="like-button">${poke.liked ? 'Unlike' : 'Like'}</button>
          <button class="update-button">Update</button>
          <button class="delete-button">Delete</button>
        </div>
      `
      pokemonList.appendChild(li)

      li.querySelector('.delete-button').addEventListener('click', () => deletePokemon(poke.id))
      li.querySelector('.update-button').addEventListener('click', () => updatePokemonPrompt(poke))
      li.querySelector('.like-button').addEventListener('click', () => toggleLike(poke))
    })
  }

  const deletePokemon = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      fetchPokemon()
    } catch (error) {
      console.error('Error deleting Pokémon:', error)
    }
  }

  const updatePokemonPrompt = (poke) => {
    const newName = prompt('Enter new name', poke.name)
    const newImage = prompt('Enter new image URL', poke.image)
    if (newName && newImage) {
      updatePokemon(poke.id, newName, newImage)
    }
  }

  const updatePokemon = async (id, name, image) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image }),
      })
      fetchPokemon()
    } catch (error) {
      console.error('Error updating Pokémon:', error)
    }
  }

  const toggleLike = async (poke) => {
    try {
      await fetch(`${apiUrl}/${poke.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked: !poke.liked }),
      })
      fetchPokemon()
    } catch (error) {
      console.error('Error liking Pokémon:', error)
    }
  }

  pokeForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const nameInput = document.getElementById('name-input')
    const imageInput = document.getElementById('image-input')

    const newPokemon = {
      name: nameInput.value.trim(),
      image: imageInput.value.trim(),
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon),
      })
      const data = await response.json()
      displayPokemon([...document.querySelectorAll('.card')].map(card => ({
        id: card.dataset.id,
        name: card.querySelector('h2').textContent,
        image: card.querySelector('img').src,
        liked: card.querySelector('.like-button').textContent === 'Unlike',
      })), data)
      nameInput.value = ''
      imageInput.value = ''
    } catch (error) {
      console.error('Error adding Pokémon:', error)
    }
  })

  fetchPokemon()
})
