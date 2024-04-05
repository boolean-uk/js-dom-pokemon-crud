const form = document.querySelector("#poke-form")
const cardsList = document.querySelector(".cards")

async function render () {
    cardsList.innerHTML = ""
    
    const pokemonReq = await fetch('https://boolean-api-server.fly.dev/angustownsley/pokemon')

    const pokemon = await pokemonReq.json()
    

    pokemon.forEach((item) => {
        const pokemonCard = document.createElement("li")
        
        const pokemonName = document.createElement("h2")
        pokemonName.innerHTML = item.name
       
       
        const pokemonImage = document.createElement("img")
        pokemonImage.src = item.image
        pokemonImage.width = 256

        pokemonCard.append(pokemonName)
        pokemonCard.append(pokemonImage)

        cardsList.append(pokemonCard)
    })
}

render()