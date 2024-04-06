const form = document.querySelector("#poke-form")
const cardsList = document.querySelector(".cards")
const nameInput = document.querySelector("#name-input")
const imgInput = document.querySelector("#image-input")

async function render() {
    

    const pokemonReq = await fetch(
        "https://boolean-api-server.fly.dev/angustownsley/pokemon"
    )

    const pokemon = await pokemonReq.json()
    
    cardsList.innerHTML = ""

    pokemon.forEach((item) => {
        const pokemonCard = document.createElement("li")

        const topContainer = document.createElement("div")
        topContainer.className = "top-container"

        const pokemonName = document.createElement("h2")
        pokemonName.innerHTML = item.name

        const delButton = document.createElement("button")
        delButton.addEventListener("click", () => {
            const id = item.id

            deletePokemon(id)
        })
        delButton.innerHTML = "&#10060"

        const likeButton = document.createElement("button")
        likeButton.addEventListener("click", () => {
           const id = item.id
           const name = item.name
           const image = item.image
           const liked = item.liked
            likePokemon(name ,id, image , liked )
        })
        const icon = document.createElement("img")
        icon.src = "./assets/svg/not-liked.svg"
        if(item.liked === true) {
            icon.src ="./assets/svg/liked.svg"
        }
        icon.height = 25

        likeButton.append(icon)

        const pokemonImage = document.createElement("img")
        pokemonImage.src = item.image
        pokemonImage.width = 256

        topContainer.append(delButton)
        topContainer.append(pokemonName)
        topContainer.append(likeButton)

        pokemonCard.append(topContainer)
        pokemonCard.append(pokemonImage)

        cardsList.append(pokemonCard)
    })
}

async function addPokemon(name, imageUrl) {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, image: imageUrl, liked: false }),
    }

    fetch("https://boolean-api-server.fly.dev/angustownsley/pokemon", options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            render()
        })
        .catch((err) => {
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

async function likePokemon(name, id, image, liked) {
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: `${name}`,
            liked: !liked,
            image: image
        }),
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
            alert("Pokemon not liked, please try again")
        })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    addPokemon(nameInput.value, imgInput.value)
})

render()
