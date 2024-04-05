/* <li class="card">
    <h2 class="card--title">Bulbasaur</h2>
    <img
        width="256"
        class="card--img"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    />
</li> */

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
    const url = await fetch("https://boolean-api-server.fly.dev/MrStashy/pokemon")
    const json = await url.json()
    
    json.forEach(buildCard)
}

renderCards()