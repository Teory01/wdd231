const url = "https://dummyjson.com/recipes?limit=50";

export async function loadRecipes() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

/**
 * Creates and displays a modal dialog with recipe information
 * @param {Object} recipe - The recipe object containing ingredients and instructions
 */
export function showModal(recipe) {
    // Create a dialog element for the modal
    const dialog = document.createElement('dialog');
    dialog.setAttribute('class', 'modal');

    // Create ingredients section
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.className = 'ingredientsContainer';
    const ingredientsHeader = document.createElement('h3');
    ingredientsHeader.textContent = 'Ingredients';
    const ingredients = document.createElement('ul');
    // Populate ingredients list
    recipe.ingredients.forEach((ingredient) => {
        const listOfIngredient = document.createElement('li');
        listOfIngredient.textContent = ingredient;
        ingredients.appendChild(listOfIngredient);
    });
    ingredientsContainer.append(ingredientsHeader, ingredients);

    
    // Create instructions section
    const instContainer = document.createElement('div');
    instContainer.className = 'instructionsContainer';
    const instHeader = document.createElement('h3');
    instHeader.textContent = 'Instructions';
    const instructions = document.createElement('ul');
    // Populate instructions list with step numbers
    recipe.instructions.forEach((instruction, index) => {
        instructions.innerHTML += `<li><span>Step ${index + 1}</span>${instruction}`;
    });
    instContainer.append(instHeader, instructions);


    // Add both sections to the dialog
    dialog.append(ingredientsContainer, instContainer);

    // Append the modal to the body
    document.body.appendChild(dialog);

    // Show the modal and prevent body scrolling
    document.body.style.overflow = "hidden";
    dialog.showModal();

    // Reset scroll position to top
    dialog.scrollTop = 0;


    // Close the modal when the close button is clicked
    // const closeButton = dialog.querySelector('.close-button');
    // closeButton.addEventListener('click', () => {
    //     dialog.close();
    //     dialog.remove();
    // });

    // Close the modal when clicking outside the modal content
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.classList.add('closing'); // Add the closing animation class
            setTimeout(() => {
                dialog.close();
                dialog.remove();
            }, 200); 
            document.body.style.overflow = "";
        }
    });
} 

/**
 * Asynchronously displays random recipes on the page
 * This function loads recipes, selects 3 random ones, and displays them in recipe cards
 */
async function displayRandomRecipes() {
    // Load recipes from data source
    const recipes = await loadRecipes();

    // Initialize an empty array to store all recipes
    const recipeList = [];

    // Create a Set to store unique random indices
    const set = new Set();

    // Get all recipe card elements from the DOM
    const recipeCard = document.querySelectorAll('.recipe-card');

    // Add all recipes to the recipeList array
    recipes.forEach((r) => {
        recipeList.push(r);
    })

    // Generate 3 unique random indices
    while (set.size < 3) {
        const ranNum = Math.floor(Math.random() * recipeList.length);
        set.add(ranNum);
    }

    // Convert the set of indices to an array and get the corresponding recipes
    const randomRecipes = Array.from(set).map(index => recipeList[index]);
    console.log(randomRecipes);

    // Process each random recipe and display it in a card
    randomRecipes.forEach((recipe, index) => {
        // Get the current card element
        const card = recipeCard[index];

        // Create and configure the recipe image
        const recipeImageContainer = card.querySelector('.imgContainer');
        const recipeImage = document.createElement('img');
        recipeImage.className = 'imgContainer';
        recipeImage.setAttribute('src', recipe.image);
        recipeImage.setAttribute('alt', recipe.name);
        recipeImage.setAttribute('height', 300);
        recipeImage.setAttribute('width', 200);    
        recipeImage.setAttribute('loading', 'lazy');
        recipeImageContainer.appendChild(recipeImage);

        // Add recipe information to the card
        const recipeInfo = card.querySelector('.recipe-card .recipes');
        recipeInfo.innerHTML += `
            <h3>${recipe.name}</h3>
            <p class="mealType">${recipe.mealType}</p>
            <p>Prep Time: ${recipe.prepTimeMinutes}</p>
            <p>Cooking Time: ${recipe.cookTimeMinutes} minutes</p>
            <p>Servings: ${recipe.servings}</p>
            <p>Ratings: ${recipe.rating}</p>
        `;

        // Add hover effect to the recipe image
        card.querySelector('.imgContainer').addEventListener('mouseenter', function () {
            recipeImage.style.transform = "scale(1.1)";
            recipeImage.style.transition = "transform 0.7s ease-in-out";
        });
        card.querySelector('.imgContainer').addEventListener('mouseleave', function () {
            recipeImage.style.transform = "";
            recipeImage.style.transition = "transform 0.7s ease-in-out";
        });

        // Add click event to the view recipe button
        card.querySelector('.view-recipe-btn').addEventListener('click', (e) => {
            e.preventDefault();
            showModal(recipe);
        });

    });
}

if (document.querySelector('.recipe-card')) {
    displayRandomRecipes();
}