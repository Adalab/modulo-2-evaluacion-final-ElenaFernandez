'use strict';

//GLOBAL VAR
const inputText = document.querySelector('.js-input-text');
const animeList = document.querySelector('.js-list');
const listFavourites = document.querySelector('.js-favourites');
const DEFAULT_IMAGE =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let seriesList = [];
let favouritesAnime = [];

//GET DATA FROM API AND UPLOAD TO AN ARRAY
function getDataFromApi(event) {
  event.preventDefault();
  animeList.innerHTML = '';
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      seriesList = data.results;
      renderAnimeList(seriesList);
    });
}

// PRINT FUNCTION IN HTML
function renderAnimeList(seriesList) {
  for (const eachSerie of seriesList) {
    let liSerie = document.createElement('li');
    liSerie.classList.add('anime');
    animeList.appendChild(liSerie);
    liSerie.innerHTML += `<img data-id="${
      eachSerie.mal_id
    }"  class="img" src="${
      eachSerie.image_url ? eachSerie.image_url : DEFAULT_IMAGE
    }"  />`;
    liSerie.innerHTML += `<p>${eachSerie.title}</p>`;
    liSerie.addEventListener('click', addToFav);
    //SEARCH IN THE FAVOURITES ARRAY WHICH  ONE IS GOING TO CHANGE COLOR
    let animeFavourite = favouritesAnime.find(
      (element) => parseInt(element.mal_id) === eachSerie.mal_id
    );
    if (animeFavourite) {
      liSerie.classList.add('select-border');
    }
  }
}

//UPLOAD ELEMENTS TO FAVOURITES ARRAY
function addToFav(event) {
  const clickedId = event.target.dataset.id;
  //FOR DON´T REPEAT THE SERIE, IF THE ANIME IS IN FAVOURITES, DON'T PRINT
  let animeFav = favouritesAnime.find((anime) => anime.mal_id === clickedId);
  //UPLOAD ELEMENTS TO FAVOURITES ARRAY// IF THE MAL_ID IS DIFFERENT, PRINT THE ANIME IN FAVOURITES
  if (animeFav === undefined) {
    for (const eachFav of seriesList) {
      if (eachFav.mal_id === parseInt(clickedId)) {
        favouritesAnime.push({
          mal_id: `${eachFav.mal_id}`,
          image_url: `${eachFav.image_url}`,
          title: `${eachFav.title}`,
        });
        // SET LOCALSTORAGE
        localStorage.setItem(
          'favourite_animes',
          JSON.stringify(favouritesAnime)
        );
        //CHANGE THE COLOR OF THE ELEMENT THAT I'VE CLICK
        event.currentTarget.classList.add('select-border');
        renderFavouriteAnime(eachFav);
      }
    }
  } else {
    deleteFav(clickedId);
  }
}

// PRINT FAVOURITES IN HTML
function renderFavouriteAnime(anime) {
  let liFavSerie = document.createElement('li');
  liFavSerie.setAttribute('data-id', `${anime.mal_id}`);
  liFavSerie.classList.add('favs-anime');
  listFavourites.appendChild(liFavSerie);
  liFavSerie.innerHTML += `<img class="img__fav" src="${
    anime.image_url ? anime.image_url : DEFAULT_IMAGE
  }" />`;
  liFavSerie.innerHTML += `<p>${anime.title}</p>`;
  liFavSerie.appendChild(createInput(anime.mal_id));
}

function createInput(animeId) {
  let input = document.createElement('input');
  input.setAttribute('type', 'submit');
  input.setAttribute('value', 'x');
  input.setAttribute('data-id', `${animeId}`);
  input.classList.add('btnx');
  input.addEventListener('click', deleteFavAnime);
  return input;
}

//PRINT FAVOURITES THAT ARE IN THE LOCALSTORAGE WHEN THE PAGE IS RELOAD
function loadFavAnimes() {
  if (localStorage.getItem('favourite_animes')) {
    favouritesAnime = JSON.parse(localStorage.getItem('favourite_animes'));
  }
  for (const eachFavAnime of favouritesAnime) {
    renderFavouriteAnime(eachFavAnime);
  }
}

//BUTTON RESET
function handleResetBtn(event) {
  event.preventDefault();
  animeList.innerHTML = '';
  inputText.value = '';
}

//BUTTON RESET FAVOURITES
function handleResetBtnFav(event) {
  event.preventDefault();
  listFavourites.innerHTML = '';
  favouritesAnime = [];
  //CLEAR LOCALSTORAGE
  localStorage.clear();
}

//DELETE FAVOURITES
function deleteFavAnime(event) {
  event.preventDefault();
  const clickedId = event.target.dataset.id;

  deleteFav(clickedId);
}

function deleteFav(animeId) {
  // RETURN THE POSITION ON THE RARRAY FAVOURITES WITH THE ID
  let index = favouritesAnime.findIndex(
    (element) => element.mal_id === animeId
  );
  //FROM INDEX, DELETE 1
  favouritesAnime.splice(index, 1);
  //REWRITE LOCALSTORAGE
  localStorage.setItem('favourite_animes', JSON.stringify(favouritesAnime));
  //DELETE FROM FAVOURITES THE ELEMENT CLICKED
  let child = document.querySelector(`li[data-id="${animeId}"]`);
  listFavourites.removeChild(child);
  //DELETE COLOR WHEN ITS NOT IN FAVOURITES
  let anime = seriesList.find((anime) => anime.mal_id === parseInt(animeId));
  if (anime !== undefined) {
    let serieInList = document.querySelector(
      `img[data-id="${animeId}"]`
    ).parentElement;
    serieInList.classList.remove('select-border');
  }
}
//HELPERS
function listenEvents() {
  const btnSearch = document.querySelector('.js-btn-search');
  const btnReset = document.querySelector('.js-btn-reset');
  const btnResetFav = document.querySelector('.js-reset-fav');

  btnSearch.addEventListener('click', getDataFromApi);
  btnReset.addEventListener('click', handleResetBtn);
  btnResetFav.addEventListener('click', handleResetBtnFav);
}

inputText.value = '';
loadFavAnimes();
listenEvents();
