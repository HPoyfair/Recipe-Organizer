let recipes = [];
let selectedRecipe = null; // Track selected recipe

// Load recipes from localStorage on page load
function loadRecipesFromLocalStorage() {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
    }
    displayRecipes();  // Display all recipes after loading

    // Ensure the ingredients and directions sections are correctly displayed or hidden
    displayIngredients();
    displayDirections();
}

// Save recipes to localStorage
function saveRecipesToLocalStorage() {
    if (recipes.length > 0) {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    } else {
        localStorage.removeItem('recipes');
    }
}

// Add Recipe
function addRecipe() {
    const nameInput = prompt("Enter the name of the recipe");
    if (nameInput === null || nameInput.trim() === "") {
        alert("Recipe name is required!");
        return;
    }

    const ingredientsInput = prompt("Enter the ingredients, separated by commas");
    if (ingredientsInput === null || ingredientsInput.trim() === "") {
        alert("Ingredients are required!");
        return;
    }

    const directionsInput = prompt("Enter the directions, separated by commas");
    if (directionsInput === null || directionsInput.trim() === "") {
        alert("Directions are required!");
        return;
    }

    const recipe = {
        id: recipes.length + 1,
        name: nameInput.trim(),
        ingredients: ingredientsInput.split(",").map(item => item.trim()),
        directions: directionsInput.split(",").map(item => item.trim())  // Store directions
    };

    recipes.push(recipe);
    saveRecipesToLocalStorage();
    alert("Recipe added!");
    displayRecipes();
}

// Delete Recipe
function deleteRecipe() {
    if (selectedRecipe === null) {
        alert("No recipe selected to delete!");
        return;
    }

    recipes = recipes.filter(recipe => recipe.id !== selectedRecipe.id);
    saveRecipesToLocalStorage();
    alert("Recipe deleted!");
    displayRecipes();
    selectedRecipe = null;
    displayIngredients();
    displayDirections();
}

// Edit Recipe
function editRecipe() {
    if (selectedRecipe === null) {
        alert("No recipe selected to edit!");
        return;
    }

    const newName = prompt("Edit recipe name:", selectedRecipe.name);
    if (newName === null || newName.trim() === "") {
        alert("Recipe name is required!");
        return;
    }

    const newIngredients = prompt("Edit ingredients, separated by commas:", selectedRecipe.ingredients.join(", "));
    if (newIngredients === null || newIngredients.trim() === "") {
        alert("Ingredients are required!");
        return;
    }

    const newDirections = prompt("Edit directions, separated by commas:", selectedRecipe.directions.join(", "));
    if (newDirections === null || newDirections.trim() === "") {
        alert("Directions are required!");
        return;
    }

    selectedRecipe.name = newName.trim();
    selectedRecipe.ingredients = newIngredients.split(",").map(item => item.trim());
    selectedRecipe.directions = newDirections.split(",").map(item => item.trim());

    saveRecipesToLocalStorage();
    alert("Recipe updated!");
    displayRecipes();
    displayIngredients();
    displayDirections();
}

// Display Recipes
function displayRecipes(filteredRecipes = recipes) {
    const recipeBox = document.getElementById("displayRecipes");
    recipeBox.innerHTML = ""; // Clear the previous display

    filteredRecipes.forEach(recipe => {
        const recipeElement = document.createElement("section");
        recipeElement.classList.add("recipe-item");
        recipeElement.textContent = recipe.name;

        recipeElement.addEventListener("click", () => {
            document.querySelectorAll(".recipe-item").forEach(item => item.classList.remove("highlight"));
            recipeElement.classList.add("highlight");
            selectedRecipe = recipe;
            displayIngredients(); // Update ingredients display when a recipe is clicked
            displayDirections();  // Update directions display when a recipe is clicked
        });

        recipeBox.appendChild(recipeElement);
    });

    // Ensure selected recipe is highlighted after the list is refreshed
    if (selectedRecipe) {
        const selectedElement = Array.from(recipeBox.children).find(item => item.textContent === selectedRecipe.name);
        if (selectedElement) {
            selectedElement.classList.add("highlight");
        }
    }
}


// Display Ingredients
function displayIngredients() {
    const ingredientsList = document.getElementById("IngredientsList");
    const displayIngredientsSection = document.getElementById("displayIngredients");

    // Check if there's a selected recipe and if it has ingredients
    if (selectedRecipe === null || selectedRecipe.ingredients.length === 0) {
        displayIngredientsSection.style.display = "none";  // Hide if no ingredients
        return;
    }

    displayIngredientsSection.style.display = "block";  // Show the ingredients section
    const ingredientsString = selectedRecipe.ingredients.join(", ");
    ingredientsList.textContent = ingredientsString;

    if (ingredientsString.trim().length > 0) {
        ingredientsList.style.borderStyle = "solid";
    } else {
        ingredientsList.style.borderStyle = "none";
    }
}

// Display Directions
function displayDirections() {
    const directionsList = document.getElementById("directionsList");
    const displayDirectionsSection = document.getElementById("displayDirections");

    // Check if there's a selected recipe and if it has directions
    if (selectedRecipe === null || selectedRecipe.directions.length === 0) {
        displayDirectionsSection.style.display = "none";  // Hide if no directions
        return;
    }

    displayDirectionsSection.style.display = "block";  // Show the directions section
    directionsList.innerHTML = "";  // Clear previous directions list

    // Add a border to directions section if directions are available
    directionsList.style.borderStyle = "solid";

    selectedRecipe.directions.forEach(direction => {
        const listItem = document.createElement("li");
        listItem.textContent = direction;
        directionsList.appendChild(listItem);
    });
}

// Filter Recipes
function filterRecipes() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchInput));
    displayRecipes(filteredRecipes);
}

// Button event listeners
document.getElementById("AddButton").addEventListener("click", addRecipe);
document.getElementById("DeleteButton").addEventListener("click", deleteRecipe);
document.getElementById("EditButton").addEventListener("click", editRecipe);

// Load recipes from localStorage when the page loads
window.addEventListener("load", () => {
    loadRecipesFromLocalStorage();
    displayIngredients();  // Ensure ingredients section visibility is correct on load
    displayDirections();   // Ensure directions section visibility is correct on load
});
