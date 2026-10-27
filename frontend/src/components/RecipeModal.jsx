import React, { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  { id: 'Breakfast', label: 'Breakfast', icon: '☀️', color: '#fef3c7', activeColor: '#fde68a', textColor: '#92400e' },
  { id: 'Lunch', label: 'Lunch', icon: '🍴', color: '#fee2e2', activeColor: '#fecaca', textColor: '#991b1b' },
  { id: 'Dinner', label: 'Dinner', icon: '🍲', color: '#dcfce7', activeColor: '#bbf7d0', textColor: '#166534' },
  { id: 'Dessert', label: 'Dessert', icon: '🧁', color: '#f3e8ff', activeColor: '#e9d5ff', textColor: '#6b21a8' },
  { id: 'Snack', label: 'Snacks', icon: '🍃', color: '#ecfdf5', activeColor: '#d1fae5', textColor: '#065f46' },
  { id: 'Snack', label: 'Drinks', icon: '🥤', color: '#e0f2fe', activeColor: '#bae6fd', textColor: '#0369a1' },
];

const COMMON_UNITS = ['pieces', 'cloves', 'cup', 'tbsp', 'tsp', 'grams', 'ml', 'slices'];

const DEFAULT_INGREDIENTS = [
  { id: 1, name: 'chicken breasts', quantity: '2', unit: 'pieces', icon: '🍗' },
  { id: 2, name: 'cloves garlic, minced', quantity: '3', unit: 'cloves', icon: '🧄' },
  { id: 3, name: 'heavy cream', quantity: '1', unit: 'cup', icon: '🥛' },
  { id: 4, name: 'sun-dried tomatoes', quantity: '1/2', unit: 'cup', icon: '🍅' },
];

const RecipeModal = ({ isOpen, onClose, onSave, recipeToEdit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [cookingTime, setCookingTime] = useState(30);
  const [ingredientsList, setIngredientsList] = useState(DEFAULT_INGREDIENTS);
  const [instructions, setInstructions] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const isEditing = Boolean(recipeToEdit);

  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
      setCategory(recipeToEdit.category || 'Breakfast');
      setCookingTime(recipeToEdit.cookingTime ? Number(recipeToEdit.cookingTime) : 30);
      
      if (Array.isArray(recipeToEdit.ingredients) && recipeToEdit.ingredients.length > 0) {
        setIngredientsList(
          recipeToEdit.ingredients.map((item, idx) => ({
            id: idx + 1,
            name: item,
            quantity: '',
            unit: '',
            icon: '🥑'
          }))
        );
      } else {
        setIngredientsList(DEFAULT_INGREDIENTS);
      }

      setInstructions(recipeToEdit.instructions || '');
      setPhotoPreview(recipeToEdit.image || null);
      setFormError('');
    } else {
      // New Recipe default
      setTitle('');
      setCategory('Breakfast');
      setCookingTime(30);
      setIngredientsList(DEFAULT_INGREDIENTS);
      setInstructions('');
      setPhotoPreview(null);
      setFormError('');
    }
  }, [recipeToEdit, isOpen]);

  if (!isOpen) return null;

  // Add new dynamic ingredient row
  const handleAddIngredient = () => {
    setIngredientsList(prev => [
      ...prev,
      { id: Date.now(), name: '', quantity: '1', unit: 'pieces', icon: '🌿' }
    ]);
  };

  // Remove ingredient row
  const handleRemoveIngredient = (id) => {
    if (ingredientsList.length <= 1) return;
    setIngredientsList(prev => prev.filter(item => item.id !== id));
  };

  // Update ingredient field
  const handleUpdateIngredient = (id, field, value) => {
    setIngredientsList(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Add step helper
  const handleAddStepHelper = () => {
    setInstructions(prev => {
      const stepNum = prev.trim() ? prev.split('\n').filter(Boolean).length + 1 : 1;
      return prev ? `${prev}\nStep ${stepNum}: ` : `Step 1: `;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a Recipe Name.');
      return;
    }

    if (!category) {
      setFormError('Please select a Category.');
      return;
    }

    const timeNum = Number(cookingTime);
    if (!cookingTime || isNaN(timeNum) || timeNum <= 0) {
      setFormError('Cooking Time must be a positive number.');
      return;
    }

    // Format ingredients into array of strings
    const formattedIngredients = ingredientsList
      .map(item => {
        const parts = [];
        if (item.quantity) parts.push(item.quantity.trim());
        if (item.unit) parts.push(item.unit.trim());
        if (item.name) parts.push(item.name.trim());
        return parts.join(' ').trim();
      })
      .filter(str => str.length > 0);

    if (formattedIngredients.length === 0) {
      setFormError('Please add at least one ingredient.');
      return;
    }

    if (!instructions.trim()) {
      setFormError('Please describe the Preparation Steps.');
      return;
    }

    const payload = {
      title: title.trim(),
      category: category === 'Drinks' ? 'Snack' : category,
      cookingTime: timeNum,
      ingredients: formattedIngredients,
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
    <div className="artisan-modal-backdrop" onClick={onClose}>
      <div className="artisan-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button top-right */}
        <button className="artisan-close-btn" onClick={onClose} aria-label="Close form">
          &times;
        </button>

        {/* 1. Header Banner matching reference image (Chalkboard Forest Green) */}
        <div className="artisan-header-banner">
          <div className="artisan-header-content">
            <div className="artisan-title-row">
              <span className="chef-hat-icon">👨‍🍳</span>
              <h2 className="artisan-title">
                {isEditing ? 'Edit Recipe' : 'Add New Recipe'}
              </h2>
            </div>
            <p className="artisan-subtitle">Good food brings people together &hearts;</p>
          </div>

          <div className="artisan-banner-dish">
            <div className="banner-dish-plate">
              <span className="banner-dish-emoji">🍝</span>
            </div>
            <div className="banner-dish-quote">
              <span>Share your flavor with the world &hearts;</span>
            </div>
          </div>
        </div>

        {formError && (
          <div className="artisan-form-alert">
            <span>&bull; {formError}</span>
          </div>
        )}

        {/* 2. Main Dual-Column Canvas */}
        <form onSubmit={handleSubmit} className="artisan-form-body">
          <div className="artisan-two-column-layout">
            
            {/* LEFT COLUMN */}
            <div className="artisan-column left-col">
              
              {/* Recipe Name Card */}
              <div className="artisan-field-card">
                <div className="artisan-card-header">
                  <span className="icon-badge orange-badge">📋</span>
                  <label className="artisan-label" htmlFor="artisan-title">
                    Recipe Name <span className="red-star">*</span>
                  </label>
                </div>
                <div className="artisan-input-wrapper">
                  <input
                    id="artisan-title"
                    type="text"
                    className="artisan-input"
                    placeholder="e.g. Creamy Tuscan Garlic Chicken"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <span className="input-end-icon">✏️</span>
                </div>
              </div>

              {/* Cooking Time Slider Card */}
              <div className="artisan-field-card">
                <div className="artisan-card-header">
                  <span className="icon-badge amber-badge">⏱️</span>
                  <label className="artisan-label">
                    Cooking Time (in minutes) <span className="red-star">*</span>
                  </label>
                </div>
                <div className="time-slider-container">
                  <div className="time-slider-track-wrap">
                    <input
                      type="range"
                      min="5"
                      max="90"
                      step="5"
                      value={cookingTime}
                      onChange={(e) => setCookingTime(Number(e.target.value))}
                      className="artisan-range-slider"
                      disabled={isSubmitting}
                    />
                    <div className="time-slider-ticks">
                      <span>5</span>
                      <span>15</span>
                      <span>30</span>
                      <span>45</span>
                      <span>60</span>
                      <span>90</span>
                    </div>
                  </div>
                  <div className="time-pill-badge">
                    <span>⏱ {cookingTime} min</span>
                  </div>
                </div>
              </div>

              {/* Ingredients Dynamic List Card */}
              <div className="artisan-field-card">
                <div className="artisan-card-header">
                  <span className="icon-badge green-badge">🍃</span>
                  <div>
                    <label className="artisan-label">
                      Ingredients <span className="red-star">*</span>
                    </label>
                    <p className="artisan-label-hint">Add one ingredient at a time</p>
                  </div>
                </div>

                <div className="ingredients-dynamic-list">
                  {ingredientsList.map((item) => (
                    <div key={item.id} className="ingredient-row-item">
                      <div className="ingredient-avatar">{item.icon}</div>
                      <input
                        type="text"
                        className="ingredient-name-input"
                        placeholder="Ingredient name"
                        value={item.name}
                        onChange={(e) => handleUpdateIngredient(item.id, 'name', e.target.value)}
                        disabled={isSubmitting}
                      />
                      <input
                        type="text"
                        className="ingredient-qty-input"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleUpdateIngredient(item.id, 'quantity', e.target.value)}
                        disabled={isSubmitting}
                      />
                      <select
                        className="ingredient-unit-select"
                        value={item.unit}
                        onChange={(e) => handleUpdateIngredient(item.id, 'unit', e.target.value)}
                        disabled={isSubmitting}
                      >
                        <option value="">unit</option>
                        {COMMON_UNITS.map(u => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="ingredient-del-btn"
                        onClick={() => handleRemoveIngredient(item.id)}
                        disabled={ingredientsList.length <= 1 || isSubmitting}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="artisan-add-ingredient-btn"
                  onClick={handleAddIngredient}
                  disabled={isSubmitting}
                >
                  <span>+ Add Ingredient</span>
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="artisan-column right-col">

              {/* Category Picker Card */}
              <div className="artisan-field-card">
                <div className="artisan-card-header">
                  <span className="icon-badge terracotta-badge">🏷️</span>
                  <label className="artisan-label">
                    Category <span className="red-star">*</span>
                  </label>
                </div>

                <div className="artisan-category-grid">
                  {CATEGORIES.map(cat => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id + cat.label}
                        className={`artisan-cat-tile ${isSelected ? 'selected' : ''}`}
                        style={{
                          backgroundColor: isSelected ? cat.activeColor : cat.color,
                          color: cat.textColor,
                          borderColor: isSelected ? cat.textColor : 'transparent'
                        }}
                        onClick={() => setCategory(cat.id)}
                      >
                        <span className="cat-tile-icon">{cat.icon}</span>
                        <span className="cat-tile-label">{cat.label}</span>
                        {isSelected && <span className="cat-tile-check">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload Card (Reference image) */}
              <div className="artisan-field-card photo-card">
                <div className="artisan-card-header">
                  <span className="icon-badge green-badge">📷</span>
                  <div>
                    <label className="artisan-label">Add a Photo <span className="optional-tag">(optional)</span></label>
                    <p className="artisan-label-hint">Upload a picture of your dish to make it more appetizing!</p>
                  </div>
                </div>
                <div className="photo-card-row">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setPhotoPreview(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                  <div className="photo-btn-group">
                    <button
                      type="button"
                      className="artisan-choose-file-btn"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      disabled={isSubmitting}
                    >
                      <span>{photoPreview ? '📷 Change Photo' : '✨ Choose File'}</span>
                    </button>
                    {photoPreview && (
                      <button
                        type="button"
                        className="photo-remove-btn"
                        onClick={() => {
                          setPhotoPreview(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="photo-preview-thumbnail">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Dish preview" className="photo-preview-img" />
                    ) : (
                      <span>🍲</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Preparation Steps Card */}
              <div className="artisan-field-card">
                <div className="artisan-card-header">
                  <span className="icon-badge brown-badge">📝</span>
                  <label className="artisan-label" htmlFor="artisan-instructions">
                    Preparation Steps <span className="red-star">*</span>
                  </label>
                </div>

                <div className="wysiwyg-fake-toolbar">
                  <span className="tool-icon"><b>B</b></span>
                  <span className="tool-icon"><i>I</i></span>
                  <span className="tool-icon"><u>U</u></span>
                  <span className="tool-divider">|</span>
                  <span className="tool-icon">≡</span>
                  <span className="tool-icon">🔢</span>
                  <span className="tool-icon">🔗</span>
                </div>

                <textarea
                  id="artisan-instructions"
                  rows="4"
                  className="artisan-textarea"
                  placeholder="Describe the step-by-step cooking process clearly..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  disabled={isSubmitting}
                />

                <button
                  type="button"
                  className="artisan-add-step-btn"
                  onClick={handleAddStepHelper}
                  disabled={isSubmitting}
                >
                  <span>+ Add Step</span>
                </button>
              </div>

            </div>

          </div>

          {/* 3. Bottom Sticky Bar matching reference image */}
          <div className="artisan-bottom-bar">
            <div className="bottom-note-left">
              <span className="note-curly">/</span>
              <p className="note-text">
                Save your recipe and make someone's day! &hearts;
              </p>
            </div>

            <div className="bottom-actions-right">
              <button
                type="button"
                className="artisan-cancel-text-btn"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="artisan-save-recipe-btn"
                disabled={isSubmitting}
              >
                <span className="chef-hat-white">👨‍🍳</span>
                <span>{isSubmitting ? 'Saving...' : 'Save Recipe →'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeModal;
