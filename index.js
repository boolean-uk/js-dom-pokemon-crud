const pokemonApi = "https://boolean-api-server.fly.dev/PerikK/pokemon"

//Access HTML elements
const body = document.querySelector('body')
body.style.backgroundColor = 'darkseagreen'
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

	card.append(pokemonName)
	card.append(image)
	allCards.append(card)
}

//GET pokemons
async function populateCards() {
	const response = await fetch(pokemonApi)
	const pokJson = await response.json()
	allCards.innerHTML = ""
	pokJson.forEach((pok) => createCards(pok))
}
populateCards()
