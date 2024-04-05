const url = 'https://boolean-api-server.fly.dev/tzoltie/pokemon'
const pokemonForm = document.querySelector('#poke-form')
const nameInput = document.querySelector('#name-input')
const urlInput = document.querySelector('#image-input')
const cardList = document.querySelector('.cards')
const mainPage = document.querySelector('#home')

function getCards() {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            cardList.innerHTML = ''
            json.forEach(pokemon => createCard(pokemon.name, pokemon.image, pokemon.liked));
        })
}


function createCard(name, image, liked) {
    const listItem = document.createElement('li')
    listItem.classList.add('card')
    
    const cardHeader = document.createElement('section')
    cardHeader.classList.add('card-header')
    listItem.append(cardHeader)

    const deleteBtn = document.createElement('input')
    deleteBtn.classList.add('delete-button')
    deleteBtn.type = 'button'
    deleteBtn.value = 'X'
    cardHeader.append(deleteBtn)

    deleteBtn.addEventListener('click', () => {
        removerCard(listItem)})

    
    
    const likedBtn = document.createElement('img')
    likedBtn.width = '30'
    likedBtn.classList.add('like-button')
    likedBtn.setAttribute('src', 'assets/svg/like.svg')
    cardHeader.append(likedBtn)
    
    if (liked === true) {
        likedBtn.setAttribute('src', 'assets/svg/liked.svg')
    }

    likedBtn.addEventListener('click', (name, image) => {
        updateLikedStatus(name, image)
    })

    const pokemonName = document.createElement('h2')
    pokemonName.classList.add('card--title')
    pokemonName.innerText = name
    listItem.append(pokemonName)

    const pokemonImage = document.createElement('img')
    pokemonImage.width = '256'
    pokemonImage.classList.add('card--img')
    pokemonImage.setAttribute('src', image)
    listItem.append(pokemonImage)

    const updateBtn = document.createElement('input')
    updateBtn.classList.add('update-button')
    updateBtn.type = 'button'
    updateBtn.value = 'Evolve'
    listItem.append(updateBtn)
    
    updateBtn.addEventListener('click', () => {
        popUpMessage()
    })

    cardList.append(listItem)
}



pokemonForm.addEventListener('submit', (element) => {
    element.preventDefault()

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            image: urlInput.value,
            liked: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then(json => {
            getCards()
            cardList.innerHTML = ''
        })
})


function updateCard(event) {
    event.preventDefault()
    fetch(url, {
        method: 'PUT', 
        body: JSON.stringify({
            name: nameInput.value,
            image: urlInput.value,
            liked: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
        .then((response) => response.json())
        .then(json => {
        getCards()
        cardList.innerHTML = ''
        })
    })
}


getCards()

function removerCard(listItem) {
    listItem.remove()
}


function popUpMessage() {
    const formSection = document.createElement('section')
    formSection.classList.add('popup-section')

    const form = document.createElement('form')
    form.setAttribute('id', 'update-form')

    
    const deleteContainer = document.createElement('div')
    deleteContainer.classList.add('delete-container')
    const deleteBtn = document.createElement('input')
    deleteBtn.classList.add('delete-button')
    deleteBtn.type = 'button'
    deleteBtn.value = 'X'
    deleteContainer.append(deleteBtn)
    form.append(deleteContainer)

    deleteBtn.addEventListener('click', () => {
        cardList.innerHTML = ''
        getCards()
    })

    const nameContainer = document.createElement('div')
    nameContainer.classList.add('name-container')
    const nameLabel = document.createElement('label')
    nameLabel.innerText = 'Name: '
    const nameInput = document.createElement('input')
    nameInput.setAttribute('id', 'updated-name-input')
    nameInput.type = 'text'
    nameInput.name = 'name'
    nameInput.required
    nameLabel.append(nameInput)
    nameContainer.append(nameLabel)
    form.append(nameContainer)

    const urlContainer = document.createElement('div')
    urlContainer.classList.add('url-container')
    const urlLabel = document.createElement('label')
    urlLabel.innerText = 'Image URL: '

    const urlInput = document.createElement('input')
    urlInput.setAttribute('id', 'updated-image-input')
    urlInput.type = 'text'
    urlInput.name = 'image'
    urlInput.required
    urlLabel.append(urlInput)
    urlContainer.append(urlLabel)
    form.append(urlContainer)

    const submitContainer = document.createElement('div')
    submitContainer.classList.add('submit-container')
    const submitInput = document.createElement('input')
    submitInput.type = 'submit'
    submitInput.value = 'EVOLVE POKEMON'
    submitInput.classList.add('update-pokemon')
    submitContainer.append(submitInput)
    form.append(submitContainer)

    submitInput.addEventListener('submit', () => {
        updateCard()})
    
    formSection.append(form)
    cardList.append(formSection)
}

function updateLikedStatus(name, image) {
    fetch(url, {
        method: 'PUT', 
        body: JSON.stringify({
            name: name,
            image: image,
            liked: true
        }),
        headers: {
            'Content-type': 'application/json'
        }
        .then((response) => response.json())
        .then(json => {
        getCards()
        cardList.innerHTML = ''
        })
    })
}