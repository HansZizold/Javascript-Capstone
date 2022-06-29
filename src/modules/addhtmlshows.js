import { retrieveShow } from './retrieveshow.js';
import popupForm from './popup.js';

const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

var ebModal = document.getElementById('mainModalArea');

const addhtmlShows = (id, name, image, summary, url) => {
  const showContainer = document.querySelector('.show-container');
  const showItem = document.createElement('div');
  showItem.classList.add('show-item');
  showItem.innerHTML += `
    <img src="${image}" alt="Shows">
    <div class='show-info'>
      <p>${name}</p>
      <i class="fas fa-heart">  5 likes</i>
    </div>
    <div class="summary">${truncate(summary, 100, '...')}</div>
    <button type="button" class="show_modal"  data-id="${id}">Comment</button>
    <button type="button" class="loaded" reserve-id="${id}">Reservation</button>
    `;
  showContainer.appendChild(showItem);

  document.querySelectorAll('.show_modal').forEach((row) => row.addEventListener('click', () => displayModal(row.getAttribute('data-id'))));
};


const displayModal = (j) => { 
  console.log(`https://api.tvmaze.com/shows/${j}`)
  document.querySelector('#popup-section').innerHTML = 'Loading,please wait..';
  const promiseShow = retrieveShow(`https://api.tvmaze.com/shows/${j}`);
  promiseShow.then((e) => {
    popupForm(e);
  });
  ebModal.style.display = "block";
}

// Get the <span> element that closes the modal
var ebSpan = document.getElementsByClassName("close_modal")[0];

// When the user clicks on <span> (x), close the modal
ebSpan.onclick = function() {
    ebModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == ebModal) {
        ebModal.style.display = "none";
    }
}


export default addhtmlShows;