const cards = document.querySelector(".cards");

//Create pokemon cards
function newCards(eventpokemon) {
  const listCard = document.createElement("li");
  listCard.classList.add("card");
  const image = document.createElement("img");

  image.classList.add("card--img");
  image.setAttribute("width", 256);
  image.setAttribute("src", eventpokemon.image);

  const pokemonName = document.createElement("h2");
  pokemonName.classList.add("card--title");
  pokemonName.innerText = eventpokemon.name;

  const deleteCardBtn = document.createElement("button");
  deleteCardBtn.classList.add("delete-btn");
  deleteCardBtn.innerText = "delete";
  deleteCardBtn.addEventListener("click", () => deletePokemon(eventpokemon));

  listCard.append(pokemonName);
  listCard.append(image);
  listCard.append(deleteCardBtn);
  const cards = document.querySelector(".cards");
  cards.append(listCard);
}

async function deletePokemon(eventpokemon) {
  await fetch(`${API}/${eventpokemon.id}`, {
    method: "DELETE",
  });
  overallCards();
}

async function overallCards() {
  cards.innerHTML = "";
  const getLink = await fetch(API);
  const pokemonJson = await getLink.json();
  pokemonJson.forEach((eventpokemon) => newCards(eventpokemon));
}

addEventListener("submit", (event) => {
  event.preventDefault();
  const inputImage = document.querySelector("#image-input");
  const inputName = document.querySelector("#name-input");
  newPokemon(inputName, inputImage);
});

const API = "https://boolean-api-server.fly.dev/MrAdam11/pokemon";

async function newPokemon(name, image) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify({
        liked: true,
      name: name.value,
      image: image.value,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  name.value = "";
  image.value = "";
  overallCards();
}

overallCards();
