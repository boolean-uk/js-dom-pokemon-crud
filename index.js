const cards = document.querySelector(".cards")
const form = document.querySelector("form")
const url = "https://boolean-api-server.fly.dev/Alistair1080/pokemon"
const nameInput = document.querySelector("#name-input")
const imageInput = document.querySelector("#image-input")

function renderPokemon () {
    fetch(url)
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            cards.innerHTML = ""
            json.forEach(pokemon => {
            //   console.log(pokemon)
              createLi(pokemon)

            })
        })
}

function createLi(pokemon) {
    const li = document.createElement("li")
    li.classList.add("card")

    const h2 = document.createElement("h2")
    h2.classList.add("card--title")
    h2.innerText = pokemon.name

    const img = document.createElement("img")
    img.setAttribute("width", "256")
    img.classList.add("card--img")
    img.setAttribute("src", pokemon.image)

    li.append(h2, img)
    cards.append(li)
}

renderPokemon()

form.addEventListener("submit", (event) => {
    event.preventDefault()
    // console.log(nameInput.value)
    // console.log(imageInput.value)
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            liked: false,
            image: imageInput.value,
            name: nameInput.value,
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(json => {
            nameInput.value = ""
            imageInput.value = ""
            renderPokemon()
        })
})