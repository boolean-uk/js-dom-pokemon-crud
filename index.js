const form = document.querySelector("#poke-form")
const cardsList = document.querySelector(".cards")
const nameInput = document.querySelector("#name-input")
const imgInput = document.querySelector("#image-input")

async function render() {
    cardsList.innerHTML = ""

    const pokemonReq = await fetch(
        "https://boolean-api-server.fly.dev/angustownsley/pokemon"
    )

    const pokemon = await pokemonReq.json()

    pokemon.forEach((item) => {
        const pokemonCard = document.createElement("li")

        const topContainer = document.createElement("div")
        topContainer.className = "top-container"

        const pokemonName = document.createElement("h2")
        pokemonName.innerHTML = item.name

        const delButton = document.createElement("button")
        delButton.addEventListener("click", () => {
            id = item.id

            deletePokemon(id)
        })
        delButton.innerHTML = "&#10060"

        const pokemonImage = document.createElement("img")
        pokemonImage.src = item.image
        pokemonImage.width = 256

        topContainer.append(delButton)
        topContainer.append(pokemonName)
        
        
        pokemonCard.append(topContainer)
        pokemonCard.append(pokemonImage)

        cardsList.append(pokemonCard)
    })
}

async function addPokemon(name, imageUrl) {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: name,	image: imageUrl, liked : false})
    }

    console.log(options)

     fetch('https://boolean-api-server.fly.dev/angustownsley/pokemon', options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    render()
})
  .catch(err => {
    alert("failed to add pokemon")
    throw err
})

}


async function deletePokemon(id) {
        const options = {
            method: "DELETE",
        }
    
        fetch(
            `https://boolean-api-server.fly.dev/angustownsley/pokemon/${id}`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                render()
            })
            .catch((err) => {
                console.error(err)
                alert("Pokemon not deleted, please try again")
            })
    }

form.addEventListener("submit", (e) => {
    e.preventDefault()
    addPokemon(nameInput.value, imgInput.value)
})

render()
