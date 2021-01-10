# Getting Started with Notes editor application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Clone the repo:

### `git clone https://github.com/shebbar93/notes-editor.git`

Install NPM modules:

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


Comments : 
1. There are 5 notes list in this application loaded from src/Data/NotesData.js.
2. Each list of note has some fields which are editable.
3. Each note supports following functionality.
    → Undo : Reverts the changes made to the field of the selected note.
    → Redo : Reverts the changes made after Undo.
    → Save : Saves the fields value of the selected note and clears undo/redo history.
    → Cancel : Sets the fields to the default value for the selected note that is available in the src/Data/NotesData. js.
4. Navigating between the notes will clear the unsaved changes & undo/redo history.
