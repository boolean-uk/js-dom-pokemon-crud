let pokemonData = []

// 1) Get pokemon data
async function getPokemonData () {
    const response = await fetch("https://boolean-api-server.fly.dev/iscreamvann/pokemon")
    const responseData = await response.json()
    return responseData
}

// 2) Render Pokemon
function renderPokemon() {
    const pokemonListDOM = document.querySelector(".cards")

pokemonListDOM.innerHTML = ""

    pokemonData.forEach((item) => {
        console.log("item is ", item)
        pokemonListDOM.innerHTML += `
            <li class="card">
                <h2 class="card--title">${item.name}</h2>
                <img
                    width="256"
                    class="card--img"
                    src="${item.image}"
                />
            </li>
        `
    })
    console.log("list item", pokemonListDOM)
}

async function postPokemon (formData) {
 console.log("Posting pokemon", formData)

 const options = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
 }
 
 const response = await fetch("https://boolean-api-server.fly.dev/iscreamvann/pokemon", options)

 const responseData = await response.json()

 pokemonData.push(responseData)

 renderPokemon()
}


document.addEventListener("DOMContentLoaded", async function() {

    // 3) Get the form and add an onsubmit event
    const pokemonForm = document.querySelector("#poke-form")

    // 4) Add submit event to form
    pokemonForm.onsubmit = (event) => {
        console.log("event", event)
        event.preventDefault();

        const formData = {
            name: event.target[0].value,
            image: event.target[1].value,
            liked: event.target[2].checked,
        }

        // 5) Post a new pokemon
        postPokemon(formData)
    }

    // Add the pokemon data to the variable
    pokemonData = await getPokemonData();

    // Render the pokemon cards
    renderPokemon()


    console.log("pokemon data: ", pokemonData);


})
