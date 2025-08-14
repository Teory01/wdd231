
import { showModal } from './featured-recipes.js';


const header = document.querySelector('#header');
header.classList.add('favoriteHeader');





//////////////////////////////////////////////////////////////////////////////////////////////////

const recipesContainer = document.getElementById('product-list');
const template = document.querySelector('#recipesCardTemplate');

async function displayRecipes(recipeData) {
    recipesContainer.innerHTML = '';

    recipeData.forEach((recipe) => {
        const clone = template.content.cloneNode(true);
        const recipeImageContainer = clone.querySelector('.recipeImageContainer');
        const image = clone.querySelector('img');
        image.setAttribute('src', recipe.image);
        image.setAttribute('alt', recipe.name);
        image.setAttribute('height', 200);
        image.setAttribute('width', 200);     

        const recipeInformationContainer = clone.querySelector('.recipeInformationContainer');
        recipeInformationContainer.innerHTML = `<h3>${recipe.name}</h3>
                        <p class="mealType">${recipe.mealType}</p>
                        <p>Difficulty: ${recipe.difficulty}</p>
                        <p>Ratings: ${recipe.rating}</p>`;
        
        recipeImageContainer.querySelector('.text').innerHTML = `
        <p>Cuisine: ${recipe.cuisine}</p>
        <p>Servings: ${recipe.servings}</p>
        <p>Calories Per Serving: ${recipe.caloriesPerServing}</p>
        <p>Prep Time: ${recipe.prepTimeMinutes} minutes</p>
        <p>Cooking Time: ${recipe.cookTimeMinutes} minutes</p>
        `;
        const infoButton = recipeImageContainer.querySelector('.info-button');
        infoButton.addEventListener('mouseover', function () {
            const imgTextOverlay = infoButton.nextElementSibling.nextElementSibling;
            imgTextOverlay.style.top = "0";
            const child = infoButton.children[0];
            child.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        });
                
        infoButton.addEventListener("mouseout", () => { 
            const imgTextOverlay = infoButton.nextElementSibling.nextElementSibling;
            imgTextOverlay.style.top = "";
            const child = infoButton.children[0];
            child.style.backgroundColor = "";
        });

        clone.querySelector('.view-recipe-btn').addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.overflow = "hidden";
            showModal(recipe);
        });

        const removeButton = clone.querySelector('.removeFavorites');
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            const informationContainer = removeButton.parentElement.previousElementSibling;
            const containerToBeRemoved = informationContainer.parentElement;
            const nameOfRecipe = informationContainer.querySelector('h3');
            const currentLocal = JSON.parse(localStorage.getItem('favorites'));
            let newCurrentLocal = currentLocal.filter((r) => r.name !== nameOfRecipe.textContent);
            localStorage.setItem("favorites", JSON.stringify(newCurrentLocal));
            console.log(newCurrentLocal)
            console.log(nameOfRecipe.textContent)

            containerToBeRemoved.style.transform = 'scale(0)';
            containerToBeRemoved.style.transition = '.5s ease';
            setTimeout(() => {
                containerToBeRemoved.remove();
            }, 300);
            heroContainerMain.querySelector('.heroText p').innerHTML = `<span>${newCurrentLocal.length !== 0 ? newCurrentLocal.length : 0}</span> Recipes saved with love and hunger`;
        });

        recipesContainer.appendChild(clone);
    });
}

const difficultySelect = document.querySelector('#difficulty');
difficultySelect.addEventListener('change', () => {
    console.log(difficultySelect.value);
    renderSavedRecipes();
});

const mealSelect = document.querySelector('#meal-filter');
mealSelect.addEventListener('change', () => {
    console.log(mealSelect.value);
    renderSavedRecipes();
});

const sort = document.querySelector('#sort-products');
sort.addEventListener('change', () => {
    console.log(sort.value);
    renderSavedRecipes();
});

function renderSavedRecipes() {
    const list = localStorage.getItem('favorites');
    const localList = JSON.parse(list)
    console.log(localList)
    let filtered

    if (localList) {
        filtered = localList.filter((r) => {
            const meal = mealSelect.value === "all" || r.mealType.includes(mealSelect.value);
            const difficulty = difficultySelect.value === "all" || r.difficulty === difficultySelect.value;
            return meal && difficulty;
        });
        
        if (sort.value === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort.value === "rating") {
            filtered.sort((a, b) => b.rating - a.rating);
        } else {
            filtered.sort((a, b) => b.caloriesPerServing - a.caloriesPerServing);
        }

        displayRecipes(filtered);
    } else if (!localList){
        console.log("No recipes saved");
    }
}
renderSavedRecipes();