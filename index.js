const url = "https://boolean-api-server.fly.dev/MrStashy/pokemon/";

//Build card
const buildCard = (pokemon) => {
  const li = document.createElement("li");
  li.classList.add("card");

  const likeHeart = document.createElement('img')
  likeHeart.setAttribute('id', 'like-heart')
  if (pokemon.liked) {
    likeHeart.setAttribute('src', './assets/heart-full.svg')
  } else {
    likeHeart.setAttribute('src', './assets/heart-empty.svg')
  }
  li.append(likeHeart)


  const h2 = document.createElement("h2");
  h2.classList.add("card--title");
  h2.innerText = pokemon.name;
  li.append(h2);

  const img = document.createElement("img");
  img.setAttribute("width", 256);
  img.setAttribute("src", pokemon.image);
  img.classList.add("card--img");
  li.append(img);

  const updateDiv = document.createElement("div");
  updateDiv.classList.add("update-section");
  li.append(updateDiv);

  const h3 = document.createElement("h3");
  h3.innerText = "Update Pokemon";
  updateDiv.append(h3);

  const newNameLabel = document.createElement("label");
  newNameLabel.innerText = "Name: ";
  const newNameInput = document.createElement("input");
  newNameInput.setAttribute("id", "new-name-input");
  newNameInput.setAttribute("type", "text");
  newNameLabel.append(newNameInput);
  updateDiv.append(newNameLabel);

  const newImageLabel = document.createElement("label");
  newImageLabel.innerText = "Image: ";
  const newImageInput = document.createElement("input");
  newImageInput.setAttribute("id", "new-image-input");
  newImageInput.setAttribute("type", "text");
  newImageLabel.append(newImageInput);
  updateDiv.append(newImageLabel);

  const updateButton = document.createElement("button");
  updateButton.setAttribute("id", "update-button");
  updateButton.innerText = "Update";
  updateButton.addEventListener("click", () => {
    updatePokemon(pokemon);
  });
  updateDiv.append(updateButton);

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "delete-button");
  deleteButton.classList.add("on-card-button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    deletePokemon(pokemon);
  });
  li.append(deleteButton);

  const cardList = document.querySelector(".cards");
  cardList.append(li);
};

const renderCards = async () => {
  const cardList = document.querySelector(".cards");

  const response = await fetch(url);
  const json = await response.json();

  cardList.innerHTML = "";
  json.forEach(buildCard);
};

//Add event listener to button to main form
const addForm = document.querySelector("#poke-form");
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#name-input");
  const imgInput = document.querySelector("#image-input");
  addNewPokemon(nameInput, imgInput);
});

//Add pokemon
const addNewPokemon = async (name, image) => {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name.value,
      image: image.value,
      liked: false,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  name.value = "";
  image.value = "";
  renderCards();
};

//Delete pokemon
const deletePokemon = async (pokemon) => {
  await fetch(`${url}${pokemon.id}`, {
    method: "DELETE",
  });
  renderCards();
};

//Update pokemon
const updatePokemon = async (pokemon) => {
  const newName = document.querySelector("#new-name-input");
  const newImage = document.querySelector("#new-image-input");

  await fetch(`${url}${pokemon.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: newName.value,
      image: newImage.value,
      liked: false,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  newName.value = "";
  newImage.value = "";
  renderCards();
};

renderCards();
