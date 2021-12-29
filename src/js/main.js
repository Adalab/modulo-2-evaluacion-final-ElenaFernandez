'use strict';

//VARIABLES GLOBALES
const inputText = document.querySelector('.js-input-text');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const animeList = document.querySelector('.js-list');
const listFavourites = document.querySelector('.js-favourites');

const DEFAULT_IMAGE =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
let seriesList = [];
let favouritesAnime = [];

inputText.value = '';

//OBTENER INFORMACION DEL API Y GUARDARLA EN UN ARRAY
function handleSearchSerie(event) {
  event.preventDefault();
  animeList.innerHTML = '';
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      seriesList = data;
      printAnimeList(seriesList.results);

      console.log(seriesList);
    });
}

// PINTAR LA FUNCION EN EL HTML
function printAnimeList(seriesList) {
  for (const eachSerie of seriesList) {
    let htmlCode = document.createElement('li');
    htmlCode.classList.add('anime');
    animeList.appendChild(htmlCode);
    htmlCode.innerHTML += `<img data-id="${eachSerie.mal_id}"  class="img" src="${
      eachSerie.image_url ? eachSerie.image_url : DEFAULT_IMAGE
    }"  />`;
    htmlCode.innerHTML += `${eachSerie.title}`;
    htmlCode.addEventListener('click', addToFav);
  }
}

//AÑADIR ELEMENTOS AL ARRAY FAVOURITESANIME
function addToFav(event) {
  const clickedId = event.target.dataset.id;
  for (const fav of seriesList.results) {
    if (fav.mal_id === parseInt(clickedId)) {
      favouritesAnime.push({
        mal_id: `${fav.mal_id}`,
        image_url: `${fav.image_url}`,
        title: `${fav.title}`,
      });
      //convertir a json favouritesanimes para poder almacenaro en localStorage
      localStorage.setItem('favourite_animes', JSON.stringify(favouritesAnime));
      printToFav(fav);
    }
  }
}

// FUNCION AÑADIR UN FAVORITO A LA LISTA DE FAVORITOS
function printToFav(anime) {
  let htmlCode = document.createElement('li');
  htmlCode.classList.add('favs-anime');
  listFavourites.appendChild(htmlCode);
  htmlCode.innerHTML += `<img data-id="${anime.mal_id}" class="img" src="${
    anime.image_url ? anime.image_url : DEFAULT_IMAGE
  }"/>`;
  htmlCode.innerHTML += `${anime.title}`;
}

//PINTA TODOS LOS ANIMES EN FAVORITOS
function printFavAnimes(favouritesAnime) {
  for (const favAnime of favouritesAnime) {
    printToFav(favAnime);
  }
}

//BOTON RESET
function handleResetBtn(event) {
  event.preventDefault();
  animeList.innerHTML = '';
}

//FUNCION ALMACENAMIENTO LOCAL
function loadFavAnimes() {
  if (localStorage.getItem('favourite_animes')) {
    favouritesAnime = JSON.parse(localStorage.getItem('favourite_animes'));
  }
  printFavAnimes(favouritesAnime);
}


loadFavAnimes();
btnSearch.addEventListener('click', handleSearchSerie);
btnReset.addEventListener('click', handleResetBtn);
