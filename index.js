// index.js

const API_URL = 'https://boolean-api-server.fly.dev/api/pokemon';
const pokeForm = document.getElementById('poke-form');
const cardsContainer = document.querySelector('.cards');

// Function to render a single Pokémon card
function renderPokemonCard(pokemon) {
  const card = document.createElement('li');
  card.classList.add('card');
  card.dataset.id = pokemon.id;

  card.innerHTML = `
    <img src="${pokemon.image}" alt="${pokemon.name}">
    <h3>${pokemon.name}</h3>
    <div class="actions">
      <button class="like-btn">❤️</button>
      <button class="update-btn">Update</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  const likeBtn = card.querySelector('.like-btn');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
  });

  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deletePokemon(pokemon.id);
  });

  const updateBtn = card.querySelector('.update-btn');
  updateBtn.addEventListener('click', () => {
    updatePokemon(pokemon);
  });

  return card;
}

// Function to fetch all Pokémon from the API
async function fetchPokemon() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    return [];
  }
}

// Function to create a new Pokémon
async function createPokemon(pokemon) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });

    if (response.ok) {
      const newPokemon = await response.json();
      const pokemonCard = renderPokemonCard(newPokemon);
      cardsContainer.appendChild(pokemonCard);
    }
  } catch (error) {
    console.error('Error creating Pokémon:', error);
  }
}

// Function to update a Pokémon
async function updatePokemon(pokemon) {
  const updatedName = prompt('Enter the updated name:', pokemon.name);
  const updatedImage = prompt('Enter the updated image URL:', pokemon.image);

  if (updatedName && updatedImage) {
    try {
      const response = await fetch(`${API_URL}/${pokemon.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName, image: updatedImage }),
      });

      if (response.ok) {
        const updatedPokemon = await response.json();
        const pokemonCard = document.querySelector(`[data-id="${pokemon.id}"]`);
        pokemonCard.replaceWith(renderPokemonCard(updatedPokemon));
      }
    } catch (error) {
      console.error('Error updating Pokémon:', error);
    }
  }
}

// Function to delete a Pokémon
async function deletePokemon(pokemonId) {
  try {
    const response = await fetch(`${API_URL}/${pokemonId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const pokemonCard = document.querySelector(`[data-id="${pokemonId}"]`);
      pokemonCard.remove();
    }
  } catch (error) {
    console.error('Error deleting Pokémon:', error);
  }
}

// Function to render all Pokémon cards
function renderPokemonCards(pokemonList) {
  cardsContainer.innerHTML = '';

  pokemonList.forEach((pokemon) => {
    const pokemonCard = renderPokemonCard(pokemon);
    cardsContainer.appendChild(pokemonCard);
  });
}

// Event listener for form submission
pokeForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name-input');
  const imageInput = document.getElementById('image-input');

  const pokemon = {
    name: nameInput.value.trim(),
    image: imageInput.value.trim(),
  };

  await createPokemon(pokemon);

  nameInput.value = '';
  imageInput.value = '';
});

// Fetch and render Pokémon when the page loads
fetchPokemon().then((pokemonList) => {
  renderPokemonCards(pokemonList);
});

// Function to update a Pokémon's image
async function updatePokemonImage(pokemonId, newImageUrl) {
    try {
      const response = await fetch(`${API_URL}/${pokemonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: newImageUrl }),
      });
  
      if (response.ok) {
        const updatedPokemon = await response.json();
        const pokemonCard = document.querySelector(`[data-id="${pokemonId}"]`);
        pokemonCard.querySelector('img').src = updatedPokemon.image;
      }
    } catch (error) {
      console.error('Error updating Pokémon image:', error);
    }
  }

  // Fetch and render Pokémon when the page loads
fetchPokemon().then((pokemonList) => {
    renderPokemonCards(pokemonList);
  
    // Replace the image of a specific Pokémon with the new URL
    const pokemonIdToUpdate = 'pokemon_id_here'; // Replace with the actual Pokémon ID
    const newImageUrl = 'https://img.pokemondb.net/artwork/large/charmander.jpg';
    updatePokemonImage(pokemonIdToUpdate, newImageUrl);
  });