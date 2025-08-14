const images = [
    "images/food45.webp",
    "images/food5.webp",
    "images/food6.webp",
    "images/food8.webp"
];

const randomIndex = Math.floor(Math.random() * images.length);
const style = document.createElement('style');
const header = document.querySelector('header');
header.classList.add('homeHeader');
style.innerHTML += `
  #header::before {
    background-image: url('${images[randomIndex]}');
  }
`;
header.appendChild(style);
