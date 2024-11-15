


const recipes = [
    { id: 1, name: "Spaghetti Bolognese", ingredients: ["spaghetti", "tomato sauce", "ground beef"], file: "assets/recipe-instructions/1 Spaghetti Bolognese.txt" },
    { id: 2, name: "Caesar Salad", ingredients: ["lettuce", "croutons", "parmesan", "caesar dressing"], file: "assets/recipe-instructions/2 Caesar Salad.txt" }
    
];

function addRecipe() {
    

    const nameInput = prompt("Enter the name of the recipe");
    const ingredientsInput = prompt("Enter the ingredients, separated by commas");

    const recipe = {
        id: recipes.length + 1, // Unique ID based on the array length
        name: nameInput, // Recipe name
        ingredients: ingredientsInput.split(",").map(item => item.trim()) // Split into an array and trim whitespace
    };

    recipes.push(recipe); // Add the new recipe to the recipes array
    console.log(recipes); // Show the updated recipes array in the console

    alert("Recipe added!");
    displayRecipes();
}
document.getElementById("AddButton").addEventListener("click", addRecipe);




function deleteRecipe(){
   


}

function displayRecipes(filteredRecipes = recipes){
    //alert("hit");
const recipeBox = document.getElementById("displayRecipes");
    
    recipeBox.innerHTML = ""; //clears the recipbox
    //alert("hit");
    filteredRecipes.forEach(recipe => {
        const recipeElement = document.createElement("section");
        recipeElement.classList.add("recipe-item");
        recipeElement.textContent = recipe.name;
        
        recipeElement.addEventListener("click", () => {
            document.querySelectorAll(".recipe-item").forEach(item => item.classList.remove("highlight"));
            recipeElement.classList.add("highlight")

            loadRecipeInstructions(recipe.file);
        } );








        recipeBox.appendChild(recipeElement);
        
    });
    
    

}


function toggleDisplay(){
    const recipeBox = document.getElementById("displayRecipes");
   
    if (recipeBox.style.display === "none"){
        recipeBox.style.display = "block";
        displayRecipes();
        
    }
    else {
        recipeBox.style.display = "none";
    }
}

document.getElementById("DisplayButton").addEventListener("click", toggleDisplay);


function filterRecipes(){
    alert("hit");
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchInput));
    
        displayRecipes(filteredRecipes);
}


function loadRecipeInstructions(filePath) {
    try {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("File not found");
                }
                return response.text();
            })
            .then(text => {
                const directionsList = document.getElementById("directionsList");
                directionsList.innerHTML = ""; // Clear previous directions

                // Split the text by new lines and create list items
                text.split("\n").forEach(line => {
                    const listItem = document.createElement("li");
                    listItem.textContent = line;
                    directionsList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Error loading recipe instructions:", error);
            });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
    }
}



