let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  //Fetch Andy's Toys
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      addCard(item)
      
      
      })
    })
   })
  //Show form button
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //fill out form and create toy
  const createToyBtn = document.querySelector('.add-toy-form')
  createToyBtn.addEventListener('submit', submitToy)

  //increase a toy's likes
  /*
  const buttonCollection = Array.from(document.querySelectorAll('.like-btn'))
  console.log(buttonCollection)
  
  const buttonCollectionArray =[...buttonCollection]
  console.log(buttonCollectionArray)
  buttonCollectionArray.forEach((button) => {
    console.log(button)
  }) */



  //clickLike.addEventListener('click', clickForLike)

  

function clickForLike() {
  console.log('click!')
  /*
  item.likes+= 1
  oneCard.querySelector('card').p.innerText = item.likes + ' likes' 
  sendPatch() */
}

function submitToy(event){
  console.log(event.target.image.value)
  event.preventDefault()
  const toyObj = {
    name: event.target.name.value,
    image: event.target.image.value
  }
  sendPost(toyObj)
} 

function addCard(item){
  const oneCard = document.createElement('div')
  const cardName = document.createElement('h2')
  const cardImage = document.createElement('img')
  const cardLikes = document.createElement('p')
  const cardButton = document.createElement('button')
  const cardStack = document.getElementById('toy-collection')
  oneCard.classList.add('card')
  cardName.innerText = item.name
  cardImage.classList.add('toy-avatar')
  cardImage.src = item.image
  cardLikes.innerText = `${item.likes} `+'likes'
  cardButton.classList.add('like-btn')
  cardButton.setAttribute('id',`${item.id}`)
  cardButton.innerText = 'Like'
  cardStack.appendChild(oneCard)
  oneCard.appendChild(cardName)
  oneCard.appendChild(cardImage)
  oneCard.appendChild(cardLikes)
  oneCard.appendChild(cardButton)

  //create like button
  cardButton.addEventListener('click', (event) => {
    const cardId = event.target.id
    
    fetch(`http://localhost:3000/toys/${cardId}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({
        'likes': item.likes+1
      })
    })
    .then(res => res.json())
    .then(data => cardLikes.innerText = `${data.likes} `+'likes')
})
}

function sendPost(newToy) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify(newToy)
    })
  .then(res => res.json())
  .then(newToy => {
    addCard(newToy)
  })
}

