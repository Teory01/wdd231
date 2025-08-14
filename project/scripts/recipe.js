const images = [
    "images/recipe1.webp",
    "images/recipe3.webp",
    "images/recipe4.webp"
];

const searchBut = document.querySelector('#searchButtonContainer');
searchBut.style.transform = 'scale(0)';
searchBut.style.transition = '.5s ease-in-out';

const randomIndex = Math.floor(Math.random() * images.length);
const style = document.createElement('style');
const header = document.querySelector('#header');
header.classList.add('recipeHeader');
style.innerHTML += `    
  #header::before {
    background-image: url('${images[randomIndex]}');
  }

`;
header.appendChild(style);


////////////////////////////////////////////////////


const searchBox = document.querySelector('#searchBoxContainer');
searchBox.classList.add('recipeSearchBox');
searchBox.style.transform = 'scale(0)';
searchBox.style.transition = '.5s ease-in-out';