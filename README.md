# Recipe Book Web Application (MERN Stack)

A full-stack Recipe Book web application built with the MERN stack (MongoDB Atlas, Express.js, React.js, Node.js) featuring full CRUD functionality, real-time client-side synchronization, responsive UI, and robust validation.

## Project Structure
```
project-root/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection logic
│   ├── controllers/
│   │   └── recipeController.js # RESTful CRUD logic
│   ├── models/
│   │   └── Recipe.js           # Mongoose schema with custom validation
│   ├── routes/
│   │   └── recipeRoutes.js     # Express API routes
│   ├── .env                    # Environment variables (Port & Database URI)
│   ├── package.json
│   └── server.js               # Express server entry point
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── recipeApi.js    # Centralized API service
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── CategoryFilter.jsx
    │   │   ├── RecipeCard.jsx
    │   │   ├── RecipeModal.jsx      # Add & Edit modal with validation
    │   │   ├── RecipeDetailModal.jsx# Full details modal (ingredients & steps)
    │   │   ├── DeleteConfirmModal.jsx # Confirmation dialog before deletion
    │   │   └── Toast.jsx            # Toast alert notifications
    │   ├── styles/
    │   │   └── index.css       # Responsive, modern styling
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Features Implemented
1. **Add Recipe**: Form with validation for Recipe Name, Category (Breakfast, Lunch, Dinner, Snack, Dessert), Ingredients, Preparation Steps, and positive Cooking Time.
2. **View Recipes**: Displays recipes in responsive cards with name, category badge, and cooking time.
3. **View Recipe Details**: Modal showing full ingredients checklist and step-by-step preparation guide.
4. **Edit Recipe**: Pre-filled edit form with live updates to the database and screen.
5. **Delete Recipe**: Confirmation dialog before permanently removing a recipe from the database and UI.
6. **Automatic State Synchronization**: List refreshes immediately after any add, edit, or delete operation without manual page reload.
7. **Responsive UI/UX**: Optimized layout for both desktop and mobile viewports with clean typography and custom color palettes.

## How to Run

### Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`
