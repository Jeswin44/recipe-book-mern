# Recipe Book Web Application (MERN Stack)

A production-grade, full-stack Recipe Book web application built with the MERN stack (MongoDB Atlas, Express.js, React.js, and Node.js). Designed and developed according to the ICT Academy of Kerala MERN Project Guidelines.

---

## 1. Project Overview & Definition

- **Problem Statement:** Food enthusiasts and home cooks need an organized, accessible, and responsive tool to store, browse, edit, and categorize their favorite recipes with preparation instructions and cooking times without dealing with clutter.
- **Target Users:** Home cooks, culinary students, meal planners, and food lovers.
- **MVP Scope:**
  - **Add Recipe:** With custom validation disallowing invalid values (e.g., negative cooking times).
  - **View Recipes:** Responsive grid displaying recipe name, category badge, and cooking time.
  - **View Recipe Details:** Full details modal showing itemized ingredients and preparation steps.
  - **Edit Recipe:** Pre-filled edit form with instant database and screen synchronization.
  - **Delete Recipe:** Safe removal with interactive confirmation modal.
  - **Automatic Synchronization:** Seamless UI refresh without manual browser reload.

---

## 2. User Stories & Acceptance Criteria

- **User Story 1:** *As a user, I want to add a recipe with ingredients, category, and cooking time so that I can catalog my meals.*
  - **Acceptance Criteria:** Required fields (Name, Category, Ingredients, Steps, Time). Cooking time must be a positive number. Shows success or error toast upon submission.
- **User Story 2:** *As a user, I want to view my saved recipes as cards so that I can quickly browse my repertoire.*
  - **Acceptance Criteria:** Cards display title, category, and cooking time. Real-time updates without manual reload.
- **User Story 3:** *As a user, I want to click any recipe to view its complete preparation steps and ingredients.*
  - **Acceptance Criteria:** Modal opens displaying bulleted ingredients and numbered step-by-step instructions.
- **User Story 4:** *As a user, I want to edit and delete existing recipes.*
  - **Acceptance Criteria:** Pre-filled edit form. Confirmation dialog before deletion.

---

## 3. Data Model (Mongoose Schema)

Entity: `Recipe`

| Field | Type | Required | Constraints / Validation |
|---|---|---|---|
| `title` | String | Yes | Trimmed, 2–120 characters |
| `category` | String | Yes | Enum: `['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']` |
| `ingredients` | [String] | Yes | Array of non-empty strings |
| `instructions` | String | Yes | Min length 5 characters |
| `cookingTime` | Number | Yes | Positive number (min: 1 minute) |
| `createdAt` / `updatedAt` | Date | Auto | Mongoose timestamps |

---

## 4. API Contract

Base URL: `/api/recipes`

| Method | Endpoint | Description | Request Body | Success Status | Error Status |
|---|---|---|---|:---:|:---:|
| `GET` | `/api/recipes` | Fetch all recipes (supports `?category=` and `?search=`) | None | 200 OK | 500 |
| `GET` | `/api/recipes/:id` | Fetch single recipe by ID | None | 200 OK | 400, 404 |
| `POST` | `/api/recipes` | Create new recipe | JSON (title, category, ingredients, instructions, cookingTime) | 201 Created | 400 |
| `PUT` | `/api/recipes/:id` | Update existing recipe | JSON (updated fields) | 200 OK | 400, 404 |
| `DELETE` | `/api/recipes/:id` | Delete recipe by ID | None | 200 OK | 400, 404 |

---

## 5. UI Architecture & The 4 UI States

As mandated by Section 7.3 of the MERN Project Guidelines, the UI gracefully handles all four fundamental states:
1. **Loading State:** Clean animated spinner with status feedback while fetching data.
2. **Success State:** Dynamic responsive grid of recipe cards with category badges and time indicators.
3. **Empty State:** Friendly graphic illustration with call-to-action button when no recipes exist.
4. **Error State:** Clear non-technical error message with a dedicated **Retry Connection** button.

---

## 6. Repository Structure
```
final_padshala_project/
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
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── server.js               # Express server entry point
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── recipeApi.js    # Centralized API service with env base URL
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── CategoryFilter.jsx
    │   │   ├── RecipeCard.jsx
    │   │   ├── RecipeModal.jsx      # Add & Edit modal with validation
    │   │   ├── RecipeDetailModal.jsx# Full details modal (ingredients & steps)
    │   │   ├── DeleteConfirmModal.jsx # Confirmation dialog before deletion
    │   │   └── Toast.jsx            # Toast alert notifications
    │   ├── styles/
    │   │   └── index.css       # Responsive custom styling
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env                    # Frontend environment configuration
    ├── .env.example
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 7. How to Install & Run Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Active MongoDB Atlas connection string

### Step 1: Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Backend runs on `http://localhost:5000`*

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 8. Verification & Test Checklist
- [x] Repository includes both `frontend/` and `backend/` folders.
- [x] Working `.env` and `.env.example` included for evaluators.
- [x] Full CRUD operations (Add, View, View Details, Edit, Delete).
- [x] Form validation prevents empty values and negative cooking time.
- [x] Automatic state synchronization without manual page reload.
- [x] All 4 UI states implemented (Loading, Success, Empty, Error with retry).
- [x] Fully responsive layout on desktop, tablet, and mobile screens.
