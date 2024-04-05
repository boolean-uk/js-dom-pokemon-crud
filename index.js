const form = document.querySelector('#poke-form')
const inputName = document.querySelector('#name-input')
const inputImage = document.querySelector('#image-input')
const cardsUl = document.querySelector('.cards')

const urlApi = 'https://boolean-api-server.fly.dev/FBagdeli/pokemon'

function render(){
  
  fetch(urlApi)
    .then(res => res.json())
    .then(json => {
      cardsUl.innerHTML = ''
      for(i in json){
        showPokemon(json[i])
      }
    })

}

function addPokemon(event){
  event.preventDefault()
  
  fetch(urlApi, {
    method: 'POST',
    body: JSON.stringify({
        "name": inputName.value,
        "image": inputImage.value,
        "liked": false
    }),
    headers:{
      'content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    showPokemon(json)
  })
}


form.addEventListener('submit', addPokemon)

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

  const deleteBtn = deletePokemon(pokemon)
  
  cardLi.append(titleH2, image, deleteBtn)
  cardsUl.append(cardLi)
}

function deletePokemon(pokemon){
  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.addEventListener('click',() => {
    console.log(pokemon.id)
    fetch(`${urlApi}/${pokemon.id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(json => console.log(json))
    fetch(urlApi)
    .then(res => res.json())
    .then(json => { console.log(json)})
    render()
  })
  return deleteBtn
}

render()
