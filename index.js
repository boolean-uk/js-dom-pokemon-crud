let pokemonData = [];

async function getPokemonData() {
  const response = await fetch(
    "https://boolean-api-server.fly.dev/samisalehsaeed/pokemon"
  );
  const responseData = await response.json();
  return responseData;
}

function renderPokemon() {
  const pokemonListDOM = document.querySelector(".cards");

  pokemonListDOM.innerHTML = "";

  pokemonData.forEach((item) => {
    pokemonListDOM.innerHTML += `
            <li class="card">
                <h2 class="card--title">${item.name}</h2>
                <img
                    width="256"
                    class="card--img"
                    src="${item.image}"
                />
            </li>
        `;
  });
}

document.addEventListener("DOMContentLoaded", async function () {
    const pokemonForm = document.querySelector("#poke-form");
    pokemonForm.onsubmit = (event) => {
      event.preventDefault();
  
      const formData = {
        name: event.target[0].value,
        image: event.target[1].value,
        liked: event.target[2].checked,
      };
  
      postPokemon(formData);
    };
    pokemonData = await getPokemonData();
  
    renderPokemon();
  });
  
async function postPokemon(formData) {
  const options = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    "https://boolean-api-server.fly.dev/samisalehsaeed/pokemon",
    options
  );
 const responseData = await response.json();

  pokemonData.push(responseData);

  renderPokemon();
}
