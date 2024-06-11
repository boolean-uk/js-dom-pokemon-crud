async function getPokes() {
    try {
      const response = await fetch("https://boolean-uk-api-server.fly.dev/JDC-horizons/pokemon");
      const pokemon = await response.json();
      console.log(pokemon)
      return pokemon
    }  catch (error) {
      console.error(error);
    }
  }

async function makePoke(input) {
    try {
    const response = await fetch("https://boolean-uk-api-server.fly.dev/JDC-horizons/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input)
    });
  
    const pokemon = await response.json();

    console.log(pokemon)
  
    } catch (error) {
      console.error(error);
    }
    renderPage()
  }

async function updatePoke(id, pokemon) {
    try {
        const response = await fetch(`https://boolean-uk-api-server.fly.dev/JDC-horizons/pokemon/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(pokemon)
        })
      
        const data = await response.json();
        
      }  catch (error) {
        console.error(error);
      }

      renderPage()
    }

async function deletePoke(id) {
      try {
        const response = await fetch(`https://boolean-uk-api-server.fly.dev/JDC-horizons/pokemon/${id}`, {
          method: 'DELETE',
        })
        const data = await response.json();
       
      }  catch (error) {
        console.error(error);
      }
      renderPage()
  }

async function renderPage() {
    let pokemon = await getPokes()
    const cardSection = document.querySelector('.cards')
    cardSection.innerHTML = ''
    for (let i = 0; i < pokemon.length; i++) {
        const pokeCard = document.createElement('li')
        pokeCard.classList.add('card')

        const pokeName = document.createElement('h2')
        pokeName.classList.add('card--title')
        pokeName.textContent = pokemon[i].name
        pokeCard.appendChild(pokeName)

        const pokeImg = document.createElement('img')
        pokeImg.classList.add('card--img')
        pokeImg.setAttribute('width', '256')
        pokeImg.setAttribute('src', pokemon[i].image)
        pokeCard.appendChild(pokeImg)

        const updateButton = document.createElement('button')
        updateButton.textContent = 'Update'
        pokeCard.appendChild(updateButton)

        updateButton.addEventListener('click', (event) => {
            const updatedData = {}
            const newName = prompt('Enter name: ')
            if (newName !== null) {
                updatedData.name = newName
                const newImg = prompt('Paste new image url: ')
                if (newImg !== null) {
                    updatedData.image = newImg
                } else {alert('Update cancelled.')}
            } else alert('Update cancelled.')
            updatedData.liked = pokemon[i].liked
            idNum = pokemon[i].id
            console.log(updatedData, idNum)

            updatePoke(idNum, updatedData)
        })

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        pokeCard.appendChild(deleteButton)

        deleteButton.addEventListener('click', (event) => {
            const id = pokemon[i].id
            deletePoke(id)
        })

        cardSection.appendChild(pokeCard)
    }
}

document.querySelector('#poke-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const formInput = {}
    formInput.name = document.getElementById('name-input').value
    formInput.image = document.getElementById('image-input').value
    formInput.liked = false

    makePoke(formInput)
})

renderPage()
