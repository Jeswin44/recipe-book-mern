import React, { useState, useEffect } from 'react';

const CATEGORY_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

const RecipeModal = ({ isOpen, onClose, onSave, recipeToEdit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [cookingTime, setCookingTime] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructions, setInstructions] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(recipeToEdit);

  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
      setCategory(recipeToEdit.category || 'Breakfast');
      setCookingTime(recipeToEdit.cookingTime ? String(recipeToEdit.cookingTime) : '');
      setIngredientsText(
        Array.isArray(recipeToEdit.ingredients)
          ? recipeToEdit.ingredients.join('\n')
          : ''
      );
      setInstructions(recipeToEdit.instructions || '');
      setFormError('');
    } else {
      // Reset form for new recipe
      setTitle('');
      setCategory('Breakfast');
      setCookingTime('');
      setIngredientsText('');
      setInstructions('');
      setFormError('');
    }
  }, [recipeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Strict Validations
    if (!title.trim()) {
      setFormError('Recipe Name is required.');
      return;
    }

    if (!category) {
      setFormError('Please select a Category.');
      return;
    }

    const timeNum = Number(cookingTime);
    if (!cookingTime || isNaN(timeNum) || timeNum <= 0) {
      setFormError('Cooking Time must be a valid positive number (e.g., 15 minutes).');
      return;
    }

    const ingredientsList = ingredientsText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (ingredientsList.length === 0) {
      setFormError('Please provide at least one ingredient (enter each on a new line).');
      return;
    }

    if (!instructions.trim()) {
      setFormError('Preparation Steps are required.');
      return;
    }

    const payload = {
      title: title.trim(),
      category,
      cookingTime: timeNum,
      ingredients: ingredientsList,
      instructions: instructions.trim()
    };

    setIsSubmitting(true);
    try {
      await onSave(payload, recipeToEdit ? recipeToEdit._id : null);
      onClose();
    } catch (err) {
      setFormError(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</h2>
            <p className="modal-subtitle">
              {isEditing ? 'Update the details below and save changes.' : 'Fill in the information to store your new culinary dish.'}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {formError && (
          <div className="form-alert-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label className="form-label" htmlFor="recipe-title">
              Recipe Name <span className="required-star">*</span>
            </label>
            <input
              id="recipe-title"
              type="text"
              className="form-input"
              placeholder="e.g. Creamy Tuscan Garlic Chicken"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row-two-col">
            <div className="form-group">
              <label className="form-label" htmlFor="recipe-category">
                Category <span className="required-star">*</span>
              </label>
              <select
                id="recipe-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="recipe-time">
                Cooking Time (in minutes) <span className="required-star">*</span>
              </label>
              <input
                id="recipe-time"
                type="number"
                min="1"
                step="1"
                className="form-input"
                placeholder="e.g. 30"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="recipe-ingredients">
              Ingredients <span className="required-star">*</span>
              <span className="label-helper-text">(One ingredient per line)</span>
            </label>
            <textarea
              id="recipe-ingredients"
              rows="4"
              className="form-textarea"
              placeholder={"2 chicken breasts\n3 cloves garlic, minced\n1 cup heavy cream\n1/2 cup sun-dried tomatoes"}
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="recipe-instructions">
              Preparation Steps <span className="required-star">*</span>
            </label>
            <textarea
              id="recipe-instructions"
              rows="5"
              className="form-textarea"
              placeholder="Describe the step-by-step cooking process clearly..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-dot"></span>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Create Recipe'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeModal;
