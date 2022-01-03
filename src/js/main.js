'use strict';

//VARIABLES GLOBALES
const inputText = document.querySelector('.js-input-text');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const animeList = document.querySelector('.js-list');
const listFavourites = document.querySelector('.js-favourites');
const btnResetFav = document.querySelector('.js-reset-fav');
const DEFAULT_IMAGE =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
let seriesList = [];
let favouritesAnime = [];

//OBTENER INFORMACION DEL API Y GUARDARLA EN UN ARRAY
function handleSearchSerie(event) {
  event.preventDefault();
  animeList.innerHTML = '';
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      seriesList = data.results;
      printAnimeList(seriesList);
    });
}

// PINTAR LA FUNCION EN EL HTML
function printAnimeList(seriesList) {
  for (const eachSerie of seriesList) {
    let htmlCode = document.createElement('li');
    htmlCode.classList.add('anime');
    animeList.appendChild(htmlCode);
    htmlCode.innerHTML += `<img data-id="${
      eachSerie.mal_id
    }"  class="img" src="${
      eachSerie.image_url ? eachSerie.image_url : DEFAULT_IMAGE
    }"  />`;
    htmlCode.innerHTML += `${eachSerie.title}`;
    htmlCode.addEventListener('click', addToFav);
    //debugger;
    //busca en el array de favoritos la serie que voy a cambiar el color
    let animeFavourite = favouritesAnime.find(
      (element) => parseInt(element.mal_id) === eachSerie.mal_id
    );
    if (animeFavourite) {
      htmlCode.classList.add('select-border');
    }
  }
}

//AÑADIR ELEMENTOS AL ARRAY FAVOURITESANIME
function addToFav(event) {
  const clickedId = event.target.dataset.id;

  //para que no se repita la serie, si ya se encuentra en favoritos, no la pinto
  let favoAnime = favouritesAnime.find((anime) => anime.mal_id === clickedId);

  //GUARDAR EN EL ARRAY FAV// si el mal_id no es el mismo, lo pinto
  if (favoAnime === undefined) {
    for (const fav of seriesList) {
      if (fav.mal_id === parseInt(clickedId)) {
        favouritesAnime.push({
          mal_id: `${fav.mal_id}`,
          image_url: `${fav.image_url}`,
          title: `${fav.title}`,
        });
        //convertir a json favouritesanimes para poder almacenaro en localStorage
        localStorage.setItem(
          'favourite_animes',
          JSON.stringify(favouritesAnime)
        );
        //CAMBIAR EL ELEMENTO DE COLOR
        event.currentTarget.classList.add('select-border');
        printToFav(fav);
      }
    }
  } else {
    deleteFav(clickedId);
  }
}

// FUNCION AÑADIR UN FAVORITO A LA LISTA DE FAVORITOS
function printToFav(anime) {
  let htmlCode = document.createElement('li');
  htmlCode.setAttribute('data-id', `${anime.mal_id}`);
  htmlCode.classList.add('favs-anime');
  listFavourites.appendChild(htmlCode);
  htmlCode.innerHTML += `<img class="img__fav" src="${
    anime.image_url ? anime.image_url : DEFAULT_IMAGE
  }" />`;
  htmlCode.innerHTML += `${anime.title}`;
  let input = document.createElement('input');
  htmlCode.appendChild(input);
  input.setAttribute('type', 'submit');
  input.setAttribute('value', 'x');
  input.classList.add('btnx');
  input.setAttribute('data-id', `${anime.mal_id}`);
  input.addEventListener('click', deleteFavAnime);
}

//FUNCION PINTA LO FAVORITOS QUE SE ENCUENTRAN EN EL LOCALSTORAGE CUANDO RECARGAS LA PAGINA
function loadFavAnimes() {
  if (localStorage.getItem('favourite_animes')) {
    favouritesAnime = JSON.parse(localStorage.getItem('favourite_animes'));
  }
  for (const favAnime of favouritesAnime) {
    printToFav(favAnime);
  }
}

//BOTON RESET
function handleResetBtn(event) {
  event.preventDefault();
  animeList.innerHTML = '';
  inputText.value = '';
}

//FUNCION RESET FAVORITOS
function handleResetFav(event) {
  event.preventDefault();
  listFavourites.innerHTML = '';
  favouritesAnime = [];
  //VACIAR EL LOCALSTORAGE
  localStorage.clear();
}

//FUNCIÓN BORRAR FAVORITOS
function deleteFavAnime(event) {
  event.preventDefault();
  const clickedId = event.target.dataset.id;

  deleteFav(clickedId);
}

function deleteFav(animeId) {
  //te devuelve la posicion del anime en el array de favoritos segun su id.
  let index = favouritesAnime.findIndex(
    (element) => element.mal_id === animeId
  );
  //desde el indice, borra 1
  favouritesAnime.splice(index, 1);

  //sobreescribiendo el  localStorage
  localStorage.setItem('favourite_animes', JSON.stringify(favouritesAnime));
  //localStorage.removeItem('favourite_animes', 'id');
  //debugger;
  //borrar el elemento seleccionado de la lista de favoritos
  let child = document.querySelector(`li[data-id="${animeId}"]`);
  listFavourites.removeChild(child);
  //debugger;´
  //quitar el color cuando se borra de favoritos
  let anime = seriesList.find((anime) => anime.mal_id === parseInt(animeId));
  if (anime !== undefined) {
    let serieInList = document.querySelector(
      `img[data-id="${animeId}"]`
    ).parentElement;
    serieInList.classList.remove('select-border');
  }
}

inputText.value = '';
loadFavAnimes();

btnSearch.addEventListener('click', handleSearchSerie);
btnReset.addEventListener('click', handleResetBtn);
btnResetFav.addEventListener('click', handleResetFav);
