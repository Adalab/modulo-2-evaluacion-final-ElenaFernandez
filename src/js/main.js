'use strict';

//VARIABLES GLOBALES
const inputText = document.querySelector('.js-input-text');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const animeList = document.querySelector('.js-list');
const listFavourites = document.querySelector('.js-favourites');

const DEFAULT_IMAGE ='https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
let seriesList = [];

inputText.value='';
//OBTENER INFORMACION DEL API Y GUARDARLA EN UN ARRAY
function handleSearchSerie(event) {
  event.preventDefault();

  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      seriesList = data;
      printAnimeList(seriesList.results);
      console.log(seriesList);
     
    });
  console.log('>> Ready :)');
}
function printAnimeList(seriesList) {
  //debugger;
  for (const eachSerie of seriesList) {
    let htmlCode = document.createElement('li');
    animeList.appendChild(htmlCode);
    htmlCode.innerHTML += `<img src="${eachSerie.image_url ? eachSerie.image_url : DEFAULT_IMAGE}"/>`;
    htmlCode.innerHTML += `${eachSerie.title}`;
  }
}



btnSearch.addEventListener('click', handleSearchSerie);
