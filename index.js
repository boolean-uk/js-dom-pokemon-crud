const API_URL = 'https://boolean-api-server.fly.dev/chuks200/pokemon';

document.addEventListener('DOMContentLoaded', () => {
  const pokemonListElement = document.querySelector('.cards');
  const form = document.getElementById('poke-form');

  async function fetchPokemon() {
    try {
      const response = await fetch(API_URL);
      const pokemons = await response.json();
      renderPokemon(pokemons);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }

  async function createPokemon(pokemonData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemonData)
      });
      const newPokemon = await response.json();
      pokemonList.push(newPokemon);
      renderPokemon(pokemonList);
    } catch (error) {
      console.error('Error creating Pokémon:', error);
    }
  }

  async function deletePokemon(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      pokemonList = pokemonList.filter(pokemon => pokemon.id !== id);
      renderPokemon(pokemonList);
    } catch (error) {
      console.error('Error deleting Pokémon:', error);
    }
  }

  async function updatePokemon(id, updatedData) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      const updatedPokemon = await response.json();
      pokemonList = pokemonList.map(pokemon => pokemon.id === id ? updatedPokemon : pokemon);
      renderPokemon(pokemonList);
    } catch (error) {
      console.error('Error updating Pokémon:', error);
    }
  }

  function renderPokemon(pokemons) {
    pokemonListElement.innerHTML = '';
    pokemons.forEach(pokemon => {
      const card = document.createElement('li');
      card.className = 'card';
      card.innerHTML = `
        <img class="card--img" src="${pokemon.image}" alt="${pokemon.name}">
        <div class="card--text">
          <h2>${pokemon.name}</h2>
          <button class="delete-btn" data-id="${pokemon.id}">Delete</button>
          <button class="edit-btn" data-id="${pokemon.id}">Edit</button>
          <button class="like-btn" data-id="${pokemon.id}">${pokemon.liked ? 'Unlike' : 'Like'}</button>
        </div>
      `;
      pokemonListElement.appendChild(card);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        deletePokemon(id);
      });
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const newName = prompt('Enter new name:');
        const newImage = prompt('Enter new image URL:');
        if (newName && newImage) {
          updatePokemon(id, { name: newName, image: newImage });
        }
      });
    });

    document.querySelectorAll('.like-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const pokemon = pokemonList.find(p => p.id === id);
        if (pokemon) {
          updatePokemon(id, { liked: !pokemon.liked });
        }
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name-input');
    const imageInput = document.getElementById('image-input');
    const newPokemon = {
      name: nameInput.value,
      image: imageInput.value,
      liked: false
    };
    createPokemon(newPokemon);
    form.reset();
  });

  let pokemonList = [];
  fetchPokemon();
});
