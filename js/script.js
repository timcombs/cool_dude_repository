console.log('worked!');

const coolCards = document.getElementsByClassName('cool__card');
for (let i = 0; i < coolCards.length; i++) {
  coolCards[i].addEventListener('click', handleCoolClick);
}

function handleCoolClick(event) {
  event.target.classList.toggle('green');
}

const sendURL = 'http://localhost:3000/api/send/'; // this will not work!!
// get reference to the send button
const sendBtn = document.getElementById('send');
sendBtn.addEventListener('click', sendData);

const apiURL = 'http://localhost:3000/api/products/';

// fetch - easy promise-based way to do httpRequests
// axios - is very similar to fetch
fetch(apiURL)
  .then((response) => {
    return response.json(); // this is turning json into a javascript data structure
  })
  .then((data) => {
    console.log(data);
    createCards(data);
  })
  .catch((err) => console.error('error:', err));

function createCards(dataArray) {
  const wrapper = document.getElementById('cards');

  for (let i = 0; i < dataArray.length; i++) {
    const card = makeOneCard(dataArray[i]);

    wrapper.appendChild(card);

    console.log(card);
  }
}

function sendData(ev) {
  const btn = ev.target;

  // need to get values out of the siblings of the button
  const number = btn.previousElementSibling.value;
  const text = btn.previousElementSibling.previousElementSibling.value;

  console.log(number, text);
  const bodyStr = JSON.stringify({number: number, text: text});
  console.log(bodyStr);

  fetch(sendURL, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyStr,
  })
    .then((response) => {
      return response.json(); // this is turning json into a javascript data structure
    })
    .then((data) => {
      console.log(data);
      createCards(data);
    })
    .catch((err) => console.error('post error:', err));
}

function makeOneCard(dataObj) {
  const card = document.createElement('a');
  const image = document.createElement('img');
  const title = document.createElement('h4');
  const descrip = document.createElement('p');

  image.src = dataObj.imageUrl;
  image.alt = dataObj.altTxt;

  title.innerText = dataObj.name;
  descrip.innerText = dataObj.description;

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(descrip);

  return card;
}
