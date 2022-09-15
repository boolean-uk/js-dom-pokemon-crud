const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");
let likeButtonToggle = false

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const delButton = document.createElement("button");
  const likeButton = document.createElement("img");

  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;
  likeButton.src = "img/like.png";
  likeButton.classList.add("pokemon-like");

  h2El.innerText = pokemon.name;
  delButton.innerHTML = "Delete Pokemon";
  delButton.addEventListener("click", () => {
    console.log("Delete Pokemon");
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
      method: "DELETE",
    });
  });
  likeButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Like Pokemon");
    likeButton.src = getLikeButtonSrc(!likeButtonToggle);
  });

  liEl.append(imgEl, h2El, delButton, likeButton);
  pokeList.append(liEl);
}

function getLikeButtonSrc(likeButton) {
  likeButtonToggle = likeButton
  if (likeButton) {
    return "/img/like-true.png";
  }   
  return "/img/like.png"; 
}



function addPokemons(pokemons) {
  pokemons.forEach((pokemon) => addPokemon(pokemon));
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value,
    };
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });
    pokeForm.reset();
  });
}

function init() {
  pokeList.innerHTML = "";
  listenToAddPokemonForm();
  fetch("http://localhost:3000/pokemons")
    .then(function (response) {
      console.log(response);
      return response.json();
    }) 
    .then((pokemons) => {
      console.log('Pokemons: ', pokemons);
      addPokemons(pokemons);
    } )
  }
init();
