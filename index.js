// const pokemonApi = "https://boolean-api-server.fly.dev/PerikK/pokemon"

// //Access HTML elements
// const body = document.querySelector('body')
// body.style.backgroundColor = 'darkseagreen'
// const allCards = document.querySelector(".cards")


// //Create pokemon cards
// function createCards(pok) {
// 	const card = document.createElement("li")
// 	card.classList.add("card")

// 	const pokemonName = document.createElement("h2")
// 	pokemonName.classList.add("card--title")
// 	pokemonName.innerText = pok.name

// 	const image = document.createElement("img")
// 	image.classList.add("card--img")
// 	image.setAttribute("width", 256)
// 	image.setAttribute("src", pok.image)

// 	card.append(pokemonName)
// 	card.append(image)
// 	allCards.append(card)
// }

// //GET pokemons
// async function populateCards() {
// 	const response = await fetch(pokemonApi)
// 	const pokJson = await response.json()
// 	allCards.innerHTML = ""
// 	pokJson.forEach((pok) => createCards(pok))
// }
// populateCards()












const pokemonApi = "https://boolean-api-server.fly.dev/PerikK/pokemon"

//Access HTML elements
const body = document.querySelector("body")
body.style.backgroundColor = "darkseagreen"
const addNewPokemon = document.querySelector("#poke-form")
const input = document.querySelector("#name-input")
const imageInput = document.querySelector("#image-input")
const allCards = document.querySelector(".cards")

//Create pokemon cards
function createCards(pok) {
	const card = document.createElement("li")
	card.classList.add("card")

	const pokemonName = document.createElement("h2")
	pokemonName.classList.add("card--title")
	pokemonName.innerText = pok.name

	const image = document.createElement("img")
	image.classList.add("card--img")
	image.setAttribute("width", 256)
	image.setAttribute("src", pok.image)

	const deleteCardBtn = document.createElement("button")
	deleteCardBtn.classList.add("delete-btn")
	deleteCardBtn.innerText = "Delete"
	deleteCardBtn.style.margin = "10px"
	deleteCardBtn.addEventListener("click", () => deletePokemon(pok))

	card.append(pokemonName)
	card.append(image)
	card.append(deleteCardBtn)
	allCards.append(card)
}

//GET pokemons
async function populateCards() {
	const response = await fetch(pokemonApi)
	const pokJson = await response.json()
	allCards.innerHTML = ""
	pokJson.forEach((pok) => createCards(pok))
}

//Add functionality to form
addEventListener("submit", (event) => {
	event.preventDefault()
	const nameInput = document.querySelector("#name-input")
	const imgInput = document.querySelector("#image-input")
	newPokemon(nameInput, imgInput)
})

async function newPokemon(name, img) {
	await fetch(pokemonApi, {
		method: "POST",
		body: JSON.stringify({
			name: name.value,
			image: img.value,
			liked: false,
		}),
		headers: {
			"content-type": "application/json",
		},
	})
	name.value = ""
	img.value = ""
	populateCards()
}

//Delete pokemon
async function deletePokemon(pok) {
	await fetch(`${pokemonApi}/${pok.id}`, {
		method: "DELETE",
	})
	populateCards()
}

populateCards()