const url = "https://boolean-api-server.fly.dev/Hamada-AB/pokemon";

const form = document.querySelector("#poke-form");
const name = document.querySelector("#name-input");
const image = document.querySelector("#image-input");
const cards = document.querySelector(".cards");

function createCardsHTML(card) {
  cards.insertAdjacentHTML(
    "beforeend",
    `<li class="card">
        <h2 class="card--title">${card.name}</h2>
        <img
        width="256"
        class="card--img"
        src= ${card.image}
    />
</li>`
  );
}

function getAllCards() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cards.textContent = "";
      data.forEach((card) => createCardsHTML(card));
    });
}

function addPokemon(event) {
  event.preventDefault();

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name.value,
      image: image.value,
      liked: false,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      getAllCards();
      name.value = "";
      image.value = "";
    });
}

form.addEventListener("submit", addPokemon);

getAllCards();
