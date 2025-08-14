
import { loadRecipes, showModal } from './featured-recipes.js';

const recipesContainer = document.getElementById('product-list');
const paginationContainer = document.getElementById('pagination'); 
const template = document.querySelector('#recipesCardTemplate');


let currentPage = 1;
const recipesPerPage = 10; // Number of recipes per page

/**
 * Asynchronously displays recipe data by populating the DOM with recipe cards
 * @param {Array} recipeData - Array of recipe objects to be displayed
 */
async function displayRecipes(recipeData) {
    // Clear the recipes container before adding new content
    recipesContainer.innerHTML = '';

    // Iterate through each recipe in the provided data
    recipeData.forEach(recipe => {
        // Create a deep clone of the template content
        const clone = template.content.cloneNode(true);
        // Find and set up the recipe image container and image attributes
        const recipeImageContainer = clone.querySelector('.recipeImageContainer');
        const image = clone.querySelector('img');
        image.setAttribute('src', recipe.image);
        image.setAttribute('alt', recipe.name);
        image.setAttribute('height', 300);
        image.setAttribute('width', 300);     

        // Populate recipe information container with recipe details
        const recipeInformationContainer = clone.querySelector('.recipeInformationContainer');
        recipeInformationContainer.innerHTML = `<h3>${recipe.name}</h3>
                        <p class="mealType">${recipe.mealType}</p>
                        <p>Difficulty: ${recipe.difficulty}</p>
                        <p>Ratings: ${recipe.rating}</p>`;
        
        // Add additional recipe information to the image container's text overlay
        recipeImageContainer.querySelector('.text').innerHTML = `
        <p>Cuisine: ${recipe.cuisine}</p>
        <p>Servings: ${recipe.servings}</p>
        <p>Calories Per Serving: ${recipe.caloriesPerServing}</p>
        <p>Prep Time: ${recipe.prepTimeMinutes} minutes</p>
        <p>Cooking Time: ${recipe.cookTimeMinutes} minutes</p>
        `;
        // Add hover effect to the info button
        const infoButton = recipeImageContainer.querySelector('.info-button');
        infoButton.addEventListener('mouseover', function () {
            // Move text overlay to top on hover
            const imgTextOverlay = infoButton.nextElementSibling.nextElementSibling;
            imgTextOverlay.style.top = "0";
            // Add semi-transparent background to child element
            const child = infoButton.children[0];
            child.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        });
                
        // Remove hover effects when mouse leaves
        infoButton.addEventListener("mouseout", () => { 
            // Reset text overlay position
            const imgTextOverlay = infoButton.nextElementSibling.nextElementSibling;
            imgTextOverlay.style.top = "";
            // Reset child element background
            const child = infoButton.children[0];
            child.style.backgroundColor = "";
        });



        /////////////////////////////////////////////////////////////////
        //WORKING WITH LOCAL STORAGE
        //loading saved recipes from localStorage
        const saveButton = clone.querySelector("a.addFavorites");
        const recipeLink = saveButton.parentElement;
        const recipeInfo = recipeLink.previousElementSibling;
        const nameOfRecipe = recipeInfo.querySelector('h3');


        const favorites = localStorage.getItem("favorites");
        const favoritesList = JSON.parse(favorites);
        if (favorites) {
            const alreadySaved = favoritesList.filter((p) => recipe.id === p.id);
            if (alreadySaved.length > 0) {
                console.log(alreadySaved[0])
                if (nameOfRecipe.textContent === alreadySaved[0].name) {
                    const savedRecipeParentsibling = nameOfRecipe.parentElement.nextElementSibling;
                    const savedRecipeLinkbutton = savedRecipeParentsibling.querySelector('a span');
                    savedRecipeLinkbutton.textContent = "Saved";
                    savedRecipeLinkbutton.parentElement.classList.toggle('saved');
                }
            }

        } 


        ////////////////////////////////////////////////////////////
        // SAVE TO LOCAL STORAGE CODE
        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            saveButton.classList.toggle("saved");
            saveButton.querySelector('span').textContent = saveButton.classList.contains("saved") ? "Saved" : "Save";

            if (saveButton.querySelector('span').textContent === "Saved") {    
                if (recipe.name.includes(nameOfRecipe.textContent)) {
                    let savedRecipes = JSON.parse(localStorage.getItem("favorites")) || [];
                    const exists = savedRecipes.find(r => r.id === recipe.id);
                    if (!exists) {
                      savedRecipes.push(recipe);
                      localStorage.setItem("favorites", JSON.stringify(savedRecipes));
                    }
                }
                const savedAlert = document.querySelector('.savedAlert');
                savedAlert.classList.add('showAlert');
                setTimeout(() => {
                    savedAlert.classList.remove('showAlert');
                }, 1000); 
            } else {
                const storedData = JSON.parse(localStorage.getItem("favorites"));
                if (storedData) {
                    const find = storedData.filter((d) => d.name !== nameOfRecipe.textContent);
                    localStorage.setItem("favorites", JSON.stringify(find));
                  }
            }
        });


        clone.querySelector('.view-recipe-btn').addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.overflow = "hidden";
            showModal(recipe);
        });


        recipesContainer.appendChild(clone);
    });
}


const difficultySelect = document.querySelector('#difficulty');
difficultySelect.addEventListener('change', () => {
    console.log(difficultySelect.value);
    renderRecipes();
});

const mealSelect = document.querySelector('#meal-filter');
mealSelect.addEventListener('change', () => {
    console.log(mealSelect.value);
    renderRecipes();
});

const sort = document.querySelector('#sort-products');
sort.addEventListener('change', () => {
    console.log(sort.value);
    renderRecipes();
});

const searchInput = document.getElementById('search');
const searchIcon = document.querySelector('.search-icon');
searchIcon.addEventListener('click', () => {
    renderRecipes(); 
});
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
        console.log(searchInput.value.length)
        renderRecipes(); 
    }
});

// Function to render recipes
/**
 * Renders recipes based on various filters and sorting options
 * @param {number} page - The current page number for pagination
 * @returns {Promise<void>}
 */
async function renderRecipes(page = 1) {
    try {
        // Load all recipes from the data source
        const recipes = await loadRecipes();
        // Filter recipes based on selected meal type and difficulty
        let filtered = recipes.filter((r) => {
            // Check if recipe matches selected meal type or if "all" is selected
            const meal = mealSelect.value === "all" || r.mealType.includes(mealSelect.value);
            // Check if recipe matches selected difficulty or if "all" is selected
            const difficulty = difficultySelect.value === "all" || r.difficulty === difficultySelect.value; 
            return meal && difficulty;
        });

        // Sort recipes based on selected criteria
        if (sort.value === "name") {
            // Sort alphabetically by recipe name
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }else if (sort.value === "rating") {
            // Sort by rating in descending order
            filtered.sort((a, b) => b.rating - a.rating);
        } else {
            // Sort by calories per serving in descending order
            filtered.sort((a, b) => b.caloriesPerServing - a.caloriesPerServing);
        }

        // Apply search term filter if provided
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(recipe => 
                // Search in recipe name
                recipe.name.toLowerCase().includes(searchTerm) ||
                // Search in meal types
                recipe.mealType.some((m) => {return m.toLowerCase().includes(searchTerm)}) ||
                recipe.cuisine.toLowerCase().includes(searchTerm)
            );
        } 

        const startIndex = (page - 1) * recipesPerPage;
        console.log(page)
        console.log(startIndex)
        const endIndex = startIndex + recipesPerPage;
        console.log(endIndex)
        const paginatedRecipes = filtered.slice(startIndex, endIndex);
        console.log(paginatedRecipes);

        displayRecipes(paginatedRecipes);

        renderPagination(filtered.length, page);

    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesContainer.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
    }
}

// Function to render pagination controls
/**
 * Renders pagination buttons based on total number of recipes and current page
 * @param {number} totalRecipes - Total number of recipes available
 * @param {number} currentPage - Currently active page number
 */
export function renderPagination(totalRecipes, currentPage) {
    // Calculate total pages needed
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);
    // Clear existing pagination buttons
    paginationContainer.innerHTML = '';

    // Create and append buttons for each page
        // Create a new button element
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        if (i === currentPage) {
            pageButton.disabled = true;
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            renderRecipes(i);
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Initialize the recipe rendering
document.addEventListener('DOMContentLoaded', () => {
    renderRecipes(currentPage);
});

