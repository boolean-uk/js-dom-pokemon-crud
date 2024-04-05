const url = "https://boolean-api-server.fly.dev/MrStashy/pokemon"

//Build card
const buildCard = pokemon => {
    const li = document.createElement('li')

    const h2 = document.createElement('h2')
    h2.classList.add('card--title')
    h2.innerText = pokemon.name
    li.append(h2)

    const img = document.createElement('img')
    img.setAttribute('width', 256)
    img.setAttribute('src', pokemon.image)
    img.classList.add('card--img')
    li.append(img)

    const cardList = document.querySelector('.cards')
    cardList.append(li)
}

const renderCards = async () => {
    const response = await fetch(url)
    const json = await response.json()
    json.forEach(buildCard)
}

//Add event listener to button
const addForm = document.querySelector('#poke-form')
addForm.addEventListener('submit', (event) => {
    const nameInput = document.querySelector('#name-input')
    const imgInput = document.querySelector('#image-input')
    event.preventDefault()
    console.log(nameInput.value)
})


const addNewPokemon = async () => {
    
 
}



renderCards()