
# Recipe Organizer

## Description

The **Recipe Organizer** is a web application designed to help users manage their recipes conveniently. It allows users to add, edit, delete, and search for recipes by name or ingredients. It also includes functionality to load predefined recipes and store user-created recipes locally for persistence. 

### Motivation
The project was built to create an efficient and user-friendly way to organize recipes digitally. It eliminates the hassle of managing recipes on paper or scattered across different platforms by providing an all-in-one digital recipe book.

### Purpose
This project solves the problem of organizing recipes in a single, easily searchable, and editable location. It allows users to:
- Quickly search for recipes by name or ingredients.
- Edit existing recipes to accommodate new variations.
- Save and load recipes persistently across sessions.

### Learnings
This project provided insights into:
- Managing local storage for data persistence.
- Handling DOM manipulations for dynamic user interfaces.
- Efficient search and filter algorithms.
- Event-driven programming in JavaScript.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)

---

## Installation

To install and run the Recipe Organizer locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <git@github.com:HPoyfair/Recipe-Organizer.git>
   ```

2. Navigate to the project directory:
   ```bash
   cd recipe-organizer
   ```

3. Open the `index.html` file in your preferred browser to start the application.



---

## Usage

### Adding a Recipe
1. Fill in the recipe name and ingredients in the respective input fields.
2. Click the **Add** button to save the recipe.

### Editing a Recipe
1. Select a recipe by clicking on it in the recipe list.
2. Click the **Edit** button. Update the recipe details in the fields.
3. Click **Save** to save the changes.

### Deleting a Recipe
1. Select a recipe by clicking on it in the recipe list.
2. Click the **Delete** button to remove it from the list.

### Searching for Recipes
- Use the search bar to type a recipe name or an ingredient. Recipes matching the search query will be displayed.

### Product Image
<img width="1322" alt="Screenshot 2024-11-18 at 9 56 59 PM" src="https://github.com/user-attachments/assets/26117e9b-96a9-4d45-8e83-81ee92b5c1a4">

### Product Link
https://hpoyfair.github.io/Recipe-Organizer/

---

## Credits

- **Project Developer**: Hayden Poyfair: https://github.com/HPoyfair
  **Project Developer**: Jade Peterson: https://github.com/Shadowsdepth
  **Project Developer**: Chris Marinica: https://github.com/chrismarinica
  **Project Developer**: Shameem Pourostadkar: https://github.com/Shameem1212
- **Third-party Libraries**: 
  - [PureCSS](https://purecss.io/) for UI styling.
- **Inspiration**: Tutorials on JavaScript DOM manipulation and local storage.

---

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

---

## Features

- Add, edit, and delete recipes.
- Search recipes by name or ingredients.
- Load predefined recipes from a JSON file.
- Persist user-created recipes across sessions using local storage.

---

## How to Contribute

Contributions are welcome! If you’d like to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## Tests

Currently, manual testing is used for this application:
1. Add a recipe and verify it is displayed in the recipe list.
2. Edit a recipe and ensure changes are saved.
3. Delete a recipe and confirm it is removed from the list.
4. Search for recipes by name or ingredients to ensure accurate filtering.

Automated testing will be added in future iterations.
