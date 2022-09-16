const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const deletebutton = document.createElement("button");

  deletebutton.setAttribute("id", pokemon.id);

  const likebutton = document.createElement("button");
  likebutton.innerText =
    pokemon.like === true
      ? "Do you like it? yes!"
      : "Do you like it? No!";

  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;

  h2El.innerText = pokemon.name;
  deletebutton.innerText = "Delete";

  deletebutton.addEventListener("click", (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/pokemons/' + pokemon.id, {
  method: 'DELETE'
})

  });
  //deletepokemon(pokemon.id);

  likebutton.addEventListener("click", (event) => {
    event.preventDefault();
    if (pokemon.like === true) {
      likebutton.innerText = "Do you like it? Yes!";

      fetch("http://localhost:3000/pokemons/" + pokemon.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like: false }),
      })
        .then((response) => response.json)
        .then((pokemon) => {
          pokeList.innerHTML = "";
          readAsync(pokemon);
        });
    } else {
      likebutton.innerText = "Do you like it? No!";

      fetch("http://localhost:3000/pokemons/" + pokemon.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like: false }),
      })
        .then((response) => response.json())
        .then((pokemon) => {
          pokeList.innerHTML = "";
          readAsync(pokemon);
        });
    }
  });
  liEl.append(imgEl, h2El, deletebutton, likebutton);
  pokeList.append(liEl);
}
function addPokemons(pokemons) {
  pokemons.forEach((pokemon) => addPokemon(pokemon));
}

// function deletepokemon(pokemonid) {
//   fetch("http://localhost:3000/pokemons/" + pokemonid, {
//     method: "DELETE",
//   });
// }

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value,
      like: true
    };

    // CREATE
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    })
      .then((res) => res.json())
      .then((pokemon) => addPokemon(pokemon));

    pokeForm.reset();
  });
}

function init() {
  listenToAddPokemonForm();

  // READ
  fetch("http://localhost:3000/pokemons")
    .then((res) => res.json())
    .then((pokemons) => addPokemons(pokemons));
}

init();
