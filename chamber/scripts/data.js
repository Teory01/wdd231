const url = "https://avee1000.github.io/wdd231/chamber/data/data.json";
async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
async function buildCards() {
    const allData =  await getData();
    const container = document.getElementById('edo-container');
    allData.forEach(attraction => {
      const cards = document.createElement('div');
      cards.className = 'cards';
      
      cards.innerHTML = `
        <h2>${attraction.title}</h2>
        <figure>
          <img src="${attraction.image}" alt="${attraction.title}" width="300" height="200" loading="lazy">
        </figure>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <button>Learn more</button>
      `;
      container.appendChild(cards);
    });
}

const now =  Date.now();
const sidebar = document.querySelector(".lastVisited p");

const lastVisit = localStorage.getItem("lastVisit");
if (!lastVisit) {
  sidebar.textContent = "Welcome! Let us know if you have any questions.";
}else {
  const timeDifference = now - parseInt(lastVisit, 10);
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  console.log(daysDifference);
  if (daysDifference < 1) {
    sidebar.textContent = "Back so soon! Awesome!";
  } else if (daysDifference === 1) {
    sidebar.textContent = "You last visited 1 day ago.";
  } else {
    sidebar.textContent = `You last visited ${daysDifference} days ago.`;
  }
}
localStorage.setItem("lastVisit", now);

sidebar.parentElement.parentElement.style.right = "0";
document.querySelector(".closeCont span").addEventListener("click", function () { 
  sidebar.parentElement.parentElement.style.right = "";
})
  
buildCards();