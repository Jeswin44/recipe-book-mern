import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import RecipeDetailModal from './components/RecipeDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import {
  fetchAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from './api/recipeApi';

export function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [detailRecipe, setDetailRecipe] = useState(null);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch / Refresh recipes list automatically
  const loadRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const data = await fetchAllRecipes(selectedCategory, searchQuery);
      setRecipes(data);
    } catch (err) {
      const msg = err.message || 'Could not connect to backend server';
      setFetchError(msg);
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  // Open modal for Adding
  const handleOpenAdd = () => {
    setRecipeToEdit(null);
    setIsFormModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEdit = (recipe) => {
    setRecipeToEdit(recipe);
    setIsFormModalOpen(true);
  };

  // Save Recipe (Handles both Create and Update)
  const handleSaveRecipe = async (recipeData, recipeId) => {
    if (recipeId) {
      // Update
      const res = await updateRecipe(recipeId, recipeData);
      showToast(res.message || 'Recipe successfully updated!');
    } else {
      // Create
      const res = await createRecipe(recipeData);
      showToast(res.message || 'New recipe added to your collection!');
    }

    // Automatically refresh recipes on screen without manual reload
    await loadRecipes();
  };

  // Prompt delete confirmation
  const handlePromptDelete = (recipe) => {
    setRecipeToDelete(recipe);
  };

  // Confirm delete action
  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;
    try {
      setIsDeleting(true);
      const res = await deleteRecipe(recipeToDelete._id);
      showToast(res.message || 'Recipe deleted successfully.');
      setRecipeToDelete(null);
      // Auto refresh list
      await loadRecipes();
    } catch (err) {
      showToast(err.message || 'Failed to delete recipe', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Toast Alert Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Navigation */}
      <Navbar
        onOpenAddModal={handleOpenAdd}
        totalCount={recipes.length}
      />

      {/* Main Body */}
      <main className="main-wrapper">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Content States: Loading, Error, Empty, and Success */}
        {isLoading ? (
          <div className="state-box">
            <div className="spinner-dot" style={{ width: 28, height: 28, borderColor: '#d9532f', borderTopColor: 'transparent' }}></div>
            <p style={{ marginTop: '1rem', color: '#6b7280', fontWeight: 500 }}>Loading recipes...</p>
          </div>
        ) : fetchError ? (
          <div className="state-box">
            <div className="state-icon" style={{ color: '#ef4444' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="state-title">Unable to Load Recipes</h3>
            <p className="state-desc">{fetchError}</p>
            <button className="btn-primary" onClick={loadRecipes}>
              Retry Connection
            </button>
          </div>
        ) : recipes.length === 0 ? (
          <div className="state-box">
            <div className="state-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3 className="state-title">No Recipes Found</h3>
            <p className="state-desc">
              {searchQuery || selectedCategory !== 'All'
                ? 'No recipes match your current filter or search criteria.'
                : 'Your recipe collection is empty. Start adding delicious recipes!'}
            </p>
            <button className="btn-primary" onClick={handleOpenAdd}>
              Add Your First Recipe
            </button>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onViewDetails={setDetailRecipe}
                onEdit={handleOpenEdit}
                onDelete={handlePromptDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Recipe Modal */}
      <RecipeModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveRecipe}
        recipeToEdit={recipeToEdit}
      />

      {/* Recipe Full Details Modal */}
      <RecipeDetailModal
        isOpen={Boolean(detailRecipe)}
        recipe={detailRecipe}
        onClose={() => setDetailRecipe(null)}
        onEdit={handleOpenEdit}
        onDelete={handlePromptDelete}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(recipeToDelete)}
        recipeTitle={recipeToDelete ? recipeToDelete.title : ''}
        isDeleting={isDeleting}
        onClose={() => setRecipeToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;
