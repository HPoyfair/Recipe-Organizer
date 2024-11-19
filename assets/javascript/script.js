let recipes = [];
let selectedRecipe = null; // Track selected recipe

// Load recipes from localStorage on page load
function loadRecipesFromLocalStorage() {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
    }
    displayRecipes();
}

// Save recipes to localStorage
function saveRecipesToLocalStorage() {
    if (recipes.length > 0) {
        // If there are recipes, store them in localStorage
        localStorage.setItem('recipes', JSON.stringify(recipes));
    } else {
        // If no recipes, remove the 'recipes' key from localStorage
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

    const recipe = {
        id: recipes.length + 1,
        name: nameInput.trim(),
        ingredients: ingredientsInput.split(",").map(item => item.trim())
    };

    recipes.push(recipe);
    saveRecipesToLocalStorage(); // Save to localStorage
    alert("Recipe added!");
    displayRecipes();
}

// Delete Recipe
function deleteRecipe() {
    if (selectedRecipe === null) {
        alert("No recipe selected to delete!");
        return;
    }

    // Remove the recipe from the recipes array
    recipes = recipes.filter(recipe => recipe.id !== selectedRecipe.id);

    saveRecipesToLocalStorage(); // Save updated recipes array to localStorage

    alert("Recipe deleted!");
    displayRecipes();
    selectedRecipe = null;
    displayIngredients();
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

    selectedRecipe.name = newName.trim();
    selectedRecipe.ingredients = newIngredients.split(",").map(item => item.trim());

    saveRecipesToLocalStorage(); // Save updated recipes array to localStorage

    alert("Recipe updated!");
    displayRecipes();
}

// Display Recipes
function displayRecipes(filteredRecipes = recipes) {
    const recipeBox = document.getElementById("displayRecipes");
    recipeBox.innerHTML = "";

    filteredRecipes.forEach(recipe => {
        const recipeElement = document.createElement("section");
        recipeElement.classList.add("recipe-item");
        recipeElement.textContent = recipe.name;

        recipeElement.addEventListener("click", () => {
            document.querySelectorAll(".recipe-item").forEach(item => item.classList.remove("highlight"));
            recipeElement.classList.add("highlight");
            selectedRecipe = recipe;
            displayIngredients(); //Update ingredients display when a recipe is clicked
        });

        recipeBox.appendChild(recipeElement);
    });
}

// Display Ingredients
function displayIngredients() {
    const ingredientsList = document.getElementById("IngredientsList");
    const displayIngredientsSection = document.getElementById("displayIngredients");

    if (selectedRecipe === null) {
        // Hide the ingredients section if no recipe is selected
        displayIngredientsSection.style.display = "none";
        return;
    }

    // Show the ingredients section
    displayIngredientsSection.style.display = "block";

    // Join the ingredients array into a comma-separated string
    const ingredientsString = selectedRecipe.ingredients.join(", ");

    // Display the ingredients string inside the IngredientsList element
    ingredientsList.textContent = ingredientsString;  // Use textContent to show it as a single string
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
window.addEventListener("load", loadRecipesFromLocalStorage);
