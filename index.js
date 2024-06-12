let pokemonList = [];
const cardsUl = document.querySelector(".cards");
async function getPokemon() {
  try {
    const response = await fetch(
      "https://boolean-api-server.fly.dev/akonde/pokemon"
    );
    pokemonList = await response.json();
    // console.log(pokemonList, 'insider!!');
    for (let i = 0; i < pokemonList.length; i++) {
      const name = pokemonList[i].name;
      const image = pokemonList[i].image;
      renderPage(name, image);
    }
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
  }
}

getPokemon();

function renderPage(name, image) {
  const li = document.createElement("li");
  li.classList = "card";
  cardsUl.appendChild(li);
  const h2 = document.createElement("h2");
  h2.classList = "card--title";
  h2.textContent = name;
  li.appendChild(h2);
  const img = document.createElement("img");
  img.classList = "card--img";
  img.width = "256";
  img.src = image;
  li.appendChild(img);
}

// function createPokemon(data) {
//   const pokemon = await -> fetch + result from create pokemon
//   // add pokemon to pokemonList
//   renderPage()
// }
// "name": "Pikachu",
//   "image": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/220px-Pok%C3%A9mon_Pikachu_art.png",
//   "liked": false

async function createPokemon(data = {}) {
    try {
      const response = await fetch( 
        "https://boolean-api-server.fly.dev/akonde/pokemon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
  
      console.log("response:", response);
  
      const post = await response.json();
      console.log("post:", post);
    } catch (error) {
      console.error("Failed to create Pokémon:", error);
    }
  }
  
  createPokemon({
    name: "lion",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/220px-Pok%C3%A9mon_Pikachu_art.png",
    liked: true
  });
  
createPokemon()

// function handleFormSubmi(event) {
//   // prevent default
//   // get form data so we can create the new pokemon data
//   const pokemonData = {...}
//   createPokemon(pokemonData)
// }

// function renderPage() {
//   // clear page
//   // re-render based on pokemonList
// }
