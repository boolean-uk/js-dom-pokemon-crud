const form = document.querySelector('#poke-form')
const inputName = document.querySelector('#name-input')
const inputImage = document.querySelector('#image-input')
const cardsUl = document.querySelector('.cards')

const urlApi = 'https://boolean-api-server.fly.dev/FBagdeli/pokemon'

function render(){
  fetch(urlApi)
    .then(res => res.json())
    .then(json => {
      for(i in json){
        showPokemon(json[i])
      }
    })
  // showPokemon()
}

function showPokemon(pokemon){

  const cardLi = document.createElement('li')
  cardLi.classList.add('card')
  
  const titleH2 = document.createElement('h2')
  titleH2.classList.add('card--title')
  titleH2.innerText = pokemon.name
  
  const image = document.createElement('img')
  image.setAttribute('src', pokemon.image)
  image.setAttribute('width', 256)
  image.classList.add('card--img')
  
  cardLi.append(titleH2, image)
  cardsUl.append(cardLi)
}

render()