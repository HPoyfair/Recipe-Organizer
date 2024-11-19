let recipes = [];

function initializeRecipes() {
    const hardcodedRecipes = JSON.parse(localStorage.getItem("hardcodedRecipes")) || [];
    const userRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];

    recipes = [...hardcodedRecipes, ...userRecipes]; // Combine hardcoded and user recipes
    displayRecipes();
}

function loadHardcodedRecipes() {
    if (!localStorage.getItem("hardcodedRecipesLoaded")) {
        fetch('assets/recipes.json')
            .then(response => response.json())
            .then(data => {
                recipes = [...recipes, ...data];
                saveHardcodedRecipesToLocalStorage(data);
                localStorage.setItem("hardcodedRecipesLoaded", "true");
                displayRecipes();
            })
            .catch(error => console.error("Error loading hardcoded recipes:", error));
    } else {
        alert("Hardcoded recipes are already loaded!");
    }
}

function saveHardcodedRecipesToLocalStorage(hardcodedRecipes) {
    localStorage.setItem("hardcodedRecipes", JSON.stringify(hardcodedRecipes));
}

function saveUserRecipesToLocalStorage() {
    const userRecipes = recipes.filter(recipe => !recipe.file); // Exclude hardcoded recipes
    localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
}

function wipeMemory() {
    localStorage.clear();
    recipes = [];
    displayRecipes();
    alert("Memory wiped!");
}

let isEditing = false;

function addRecipe() {
    const nameInput = document.getElementById("searchInput");
    const ingredientsInput = document.getElementById("ingredientsInput");
    const directionsContainer = document.getElementById("displayDirections");

    if (!isEditing) {
        nameInput.placeholder = "Write Recipe Name";
        ingredientsInput.placeholder = "Write ingredients, separated by a comma";

        const textarea = document.getElementById("directionsInput");
        if (!textarea) {
            const newTextarea = document.createElement("textarea");
            newTextarea.id = "directionsInput";
            newTextarea.placeholder = "Write the directions here...";
            newTextarea.rows = 5;
            directionsContainer.appendChild(newTextarea);
        }

        isEditing = true;
        return;
    }

    const recipeName = nameInput.value.trim();
    const ingredients = ingredientsInput.value.trim();
    const directionsInput = document.getElementById("directionsInput");
    const directions = directionsInput ? directionsInput.value.trim() : "";

    if (!recipeName || !ingredients || !directions) {
        alert("Please fill in all fields before saving!");
        return;
    }

    const newId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;

    const newRecipe = {
        id: newId,
        name: recipeName,
        ingredients: ingredients.split(",").map(item => item.trim()),
        instructions: directions
    };

    recipes.push(newRecipe);
    saveUserRecipesToLocalStorage();
    displayRecipes();

    nameInput.value = "";
    ingredientsInput.value = "";
    if (document.getElementById("directionsInput")) {
        document.getElementById("directionsInput").remove();
    }
    isEditing = false;
}

function deleteRecipe(recipeId) {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
    if (recipeIndex !== -1) {
        recipes.splice(recipeIndex, 1);
        saveUserRecipesToLocalStorage();
        displayRecipes();
    }
}

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

            if (recipe.file) {
                loadRecipeInstructions(recipe.file);
            } else if (recipe.instructions) {
                displayCustomDirections(recipe.instructions);
            } else {
                displayCustomDirections(null);
            }
        });

        recipeBox.appendChild(recipeElement);
    });
}

function displayCustomDirections(instructions) {
    const directionsList = document.getElementById("directionsList");

    if (!directionsList) {
        console.error("Error: #directionsList element is missing from the DOM.");
        return;
    }

    directionsList.innerHTML = "";

    if (!instructions) {
        directionsList.innerHTML = "<p>No instructions available for this recipe.</p>";
        return;
    }

    instructions.split("\n").forEach(line => {
        const listItem = document.createElement("p");
        listItem.textContent = line;
        directionsList.appendChild(listItem);
    });
}

function filterRecipes() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();

    if (searchInput === "loadrecipes") {
        loadHardcodedRecipes();
        return;
    }

    const filteredRecipes = recipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(searchInput);
        const ingredientMatch = recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(searchInput)
        );
        return nameMatch || ingredientMatch;
    });

    displayRecipes(filteredRecipes);
}


function loadRecipeInstructions(filePath) {
    const directionsList = document.getElementById("directionsList");

    if (!directionsList) {
        console.error("Error: #directionsList element is missing from the DOM.");
        return;
    }

    directionsList.innerHTML = "";

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            text.split("\n").forEach(line => {
                const listItem = document.createElement("p");
                listItem.textContent = line;
                directionsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading recipe instructions:", error);
            directionsList.innerHTML = "<p>Error loading recipe instructions.</p>";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeRecipes();

    const addButton = document.getElementById("AddButton");
    if (addButton) {
        addButton.addEventListener("click", addRecipe);
    }
});

function deleteHighlightedRecipe() {
    // Find the highlighted recipe in the recipe list
    const highlightedRecipe = document.querySelector(".recipe-item.highlight");

    if (!highlightedRecipe) {
        alert("Please select a recipe to delete!");
        return;
    }

    // Find the recipe by name
    const recipeName = highlightedRecipe.textContent;
    const recipeIndex = recipes.findIndex(recipe => recipe.name === recipeName);

    if (recipeIndex !== -1) {
        // Remove the recipe from the array
        recipes.splice(recipeIndex, 1);

        // Update local storage
        saveHardcodedRecipesToLocalStorage(recipes.filter(recipe => recipe.file));
        saveUserRecipesToLocalStorage();

        // Refresh the recipe list display
        displayRecipes();
    } else {
        alert("Recipe not found!");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const deleteButton = document.getElementById("DeleteButton");
    if (deleteButton) {
        deleteButton.addEventListener("click", deleteHighlightedRecipe);
    }

    const addButton = document.getElementById("AddButton");
    if (addButton) {
        addButton.addEventListener("click", addRecipe);
    }

    
    initializeRecipes();
});

function editHighlightedRecipe() {
   
    const highlightedRecipe = document.querySelector(".recipe-item.highlight");

    if (!highlightedRecipe) {
        alert("Please select a recipe to edit!");
        return;
    }

    // Get the recipe name
    const recipeName = highlightedRecipe.textContent;
    const recipe = recipes.find(r => r.name === recipeName);

    if (!recipe) {
        alert("Recipe not found!");
        return;
    }

    // Display current recipe details in editable fields
    const nameInput = document.getElementById("searchInput");
    const ingredientsInput = document.getElementById("ingredientsInput");
    const directionsContainer = document.getElementById("displayDirections");

    nameInput.value = recipe.name; // Pre-fill name
    ingredientsInput.value = recipe.ingredients.join(", "); // Pre-fill ingredients as a comma-separated string

    // Create or update the directions input
    let directionsInput = document.getElementById("directionsInput");
    if (!directionsInput) {
        directionsInput = document.createElement("textarea");
        directionsInput.id = "directionsInput";
        directionsInput.rows = 5;
        directionsContainer.appendChild(directionsInput);
    }
    directionsInput.value = recipe.instructions; // Pre-fill directions

    // Change button behavior to save edits
    const editButton = document.getElementById("EditButton");
    editButton.textContent = "Save";
    editButton.onclick = () => saveEditedRecipe(recipe);
}

function saveEditedRecipe(originalRecipe) {
    // Get updated values from inputs
    const nameInput = document.getElementById("searchInput");
    const ingredientsInput = document.getElementById("ingredientsInput");
    const directionsInput = document.getElementById("directionsInput");

    const updatedName = nameInput.value.trim();
    const updatedIngredients = ingredientsInput.value.trim();
    const updatedDirections = directionsInput.value.trim();

    if (!updatedName || !updatedIngredients || !updatedDirections) {
        alert("Please fill in all fields before saving!");
        return;
    }

    // Update the recipe object
    originalRecipe.name = updatedName;
    originalRecipe.ingredients = updatedIngredients.split(",").map(item => item.trim());
    originalRecipe.instructions = updatedDirections;

    // Save updated recipes to local storage
    saveUserRecipesToLocalStorage();
    saveHardcodedRecipesToLocalStorage(recipes.filter(recipe => recipe.file));

    // Refresh the recipe list
    displayRecipes();

    // Reset Edit button
    const editButton = document.getElementById("EditButton");
    editButton.textContent = "Edit";
    editButton.onclick = editHighlightedRecipe;

    // Clear inputs
    nameInput.value = "";
    ingredientsInput.value = "";
    directionsInput.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.getElementById("EditButton");
    if (editButton) {
        editButton.addEventListener("click", editHighlightedRecipe);
    }

    const addButton = document.getElementById("AddButton");
    if (addButton) {
        addButton.addEventListener("click", addRecipe);
    }

    const deleteButton = document.getElementById("DeleteButton");
    if (deleteButton) {
        deleteButton.addEventListener("click", deleteHighlightedRecipe);
    }

    // Initialize recipes from local storage
    initializeRecipes();
});
