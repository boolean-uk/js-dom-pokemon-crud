async function getData() {
  const response = await fetch(
    "https://boolean-api-server.fly.dev/zainabch123/pokemon"
  );
  const pokeData = await response.json();
  console.log(pokeData);
  renderCards(pokeData);
}

function renderCards(pokeData) {
  const cardsUL = document.querySelector(".cards");
  cardsUL.innerHTML = "";
  pokeData.forEach((pokemon) => {
    const pokemonLi = document.createElement("li");
    pokemonLi.className = "card";
    cardsUL.append(pokemonLi);

    const pokeHeader = document.createElement("h2");
    pokeHeader.className = "card--title";
    pokeHeader.innerText = pokemon.name;

    const pokeImg = document.createElement("img");
    pokeImg.className = "card--img";
    pokeImg.width = "256";
    pokeImg.src = pokemon.image;

    const updateButton = document.createElement("button");
    updateButton.className = "update-button";
    updateButton.innerText = "Update";
    updateButton.style.margin = "0px 20px";
    updateButton.addEventListener("click", () => {
      const updatePokeForm = document.createElement("form");
      updatePokeForm.id = "updatePoke-form";
      pokemonLi.append(updatePokeForm);

      const updateNameLabel = document.createElement("label");
      updateNameLabel.innerHTML = "New name: ";
      updateNameLabel.style.display = "block";
      updatePokeForm.append(updateNameLabel);

      const updateName = document.createElement("input");
      updateName.id = "updateName";
      updateName.type = "text";
      updateName.setAttribute("required", "required");
      updateNameLabel.append(updateName);

      const updateImgLabel = document.createElement("label");
      updateImgLabel.innerHTML = "New image: ";
      updateImgLabel.style.display = "block";
      updatePokeForm.append(updateImgLabel);

      const updateImg = document.createElement("input");
      updateImg.id = "updateImg";
      updateImg.type = "url";
      updateImg.setAttribute("required", "required");
      updateImgLabel.append(updateImg);

      const updateFormSubmit = document.createElement("input");
      updateFormSubmit.type = "submit";
      updatePokeForm.append(updateFormSubmit);

      updatePokeForm.addEventListener("submit", async () => {
        event.preventDefault();
        console.log("Update form submitted");
        const response = await fetch(
          "https://boolean-api-server.fly.dev/zainabch123/pokemon/" +
            pokemon.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: pokemon.id,
              name: updateName.value,
              image: updateImg.value,
              liked: false,
            }),
          }
        );
        getData();
      });
      console.log(updatePokeForm);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Delete";
    deleteButton.style.margin = "20px 0px";
    deleteButton.addEventListener("click", async () => {
      console.log("delete pokemon:", pokemon.id);
      console.log("code has reached here at deletePoke");
      const response = await fetch(
        "https://boolean-api-server.fly.dev/zainabch123/pokemon/" + pokemon.id,
        {
          method: "DELETE",
        }
      );
      getData();
    });

    const likeButton = document.createElement("button");
    if (pokemon.liked === false) {
      likeButton.innerText = "Not Liked";
    } else {
      likeButton.innerText = "Liked";
      likeButton.style.backgroundColor = "tomato";
    }
    likeButton.style.margin = "0px 20px";
    likeButton.addEventListener("click", async () => {
      const response = await fetch(
        "https://boolean-api-server.fly.dev/zainabch123/pokemon/" + pokemon.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            liked: !pokemon.liked,
          }),
        }
      );
      const likedPost = await response.json();
      console.log(likedPost);
      getData();
    });

    pokemonLi.append(
      pokeHeader,
      pokeImg,
      updateButton,
      deleteButton,
      likeButton
    );
  });
}

const form = document.querySelector("#poke-form");
const nameInput = document.querySelector("#name-input");
const imgInput = document.querySelector("#image-input");
form.addEventListener("submit", async () => {
  event.preventDefault();
  console.log("Submit button works");
  const response = await fetch(
    "https://boolean-api-server.fly.dev/zainabch123/pokemon",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 118,
        name: nameInput.value,
        image: imgInput.value,
        liked: false,
      }),
    }
  );
  const newPokemon = await response.json();
  console.log("updated Data:", newPokemon);
  nameInput.value = "";
  imgInput.value = "";
  getData();
});

getData();
