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
  const createToyBtn = document.querySelector('.submit')
  createToyBtn.addEventListener('click', submitToy)
  })


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