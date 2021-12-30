# Módulo 2: Ejercicio de evaluación final

[![Autor](https://img.shields.io/badge/github-Elena%20Fernández-brightgreen?style=for-the-badge&logo=github)](https://github.com/ElenaFernandez) 

Bienvenidos a mi ejercicio de la evaluación final del módulo 2.

Este ejercicio consiste en desarrollar una aplicación web de búsqueda de series de anime, que nos permita des/marcar las series favoritas y guardarlas en el localStorage.

Pero, ¿que hace en concreto la aplicación web?

- Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de Jikan para la búsqueda de series de anime. Os recomendamos echar un vistazo al JSON que devuelve una petición de búsqueda para ver qué datos son los que necesitamos: https://api.jikan.moe/v3/search/anime?q=naruto

- Para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el campo de búsqueda. Por cada serie contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos una imagen de la serie y el título.

- Algunas de las series que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno. Podemos crear una imagen de relleno con el servicio de placeholder.com donde en la propia URL indicamos el tamaño, colores, texto: https://via.placeholder.com/210x295/ffffff/666666/?text=TV.

Una vez que nos ha pintado la lista de animes, podemos elegir nuestros favoritos, y para hacerlo mas visible, tenemos que hacer lo siguiente:

- El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.

- Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas.

## Stack tecnológico

- HTML
- Preprocesador de CSS : SASS con sintaxis SCSS
     - BEM
     - Flexbox
     - Variables
     - Estilos anidados
- JavaScript
    - Escuchar eventos del HTML y realizar cambios desde JS en el HTML y CSS
- Automatización de procesos con Gulp de NodeJS
- GitHubPages

## Aplicación Web

Aquí podeis ver la aplicación web http://beta.adalab.es/modulo-2-evaluacion-final-ElenaFernandez/.


