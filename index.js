const url = 'https://boolean-api-server.fly.dev/MyrtheDullaart/pokemon'
const cards = document.querySelector('.cards')

async function getAllPokemon() {
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
}

getAllPokemon()