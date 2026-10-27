import React from 'react';

const categoryColors = {
  Breakfast: 'badge-breakfast',
  Lunch: 'badge-lunch',
  Dinner: 'badge-dinner',
  Snack: 'badge-snack',
  Dessert: 'badge-dessert'
};

const RecipeDetailModal = ({ isOpen, onClose, recipe, onEdit, onDelete }) => {
  if (!isOpen || !recipe) return null;

  const badgeClass = categoryColors[recipe.category] || 'badge-default';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="detail-header-meta">
            <span className={`category-tag ${badgeClass}`}>
              {recipe.category}
            </span>
            <div className="time-indicator">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{recipe.cookingTime} minutes</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <h2 className="detail-recipe-title">{recipe.title}</h2>

        <div className="detail-sections-container">
          {/* Ingredients Section */}
          <section className="detail-section">
            <h4 className="detail-section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>Ingredients ({recipe.ingredients.length})</span>
            </h4>
            <ul className="ingredients-checklist">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="ingredient-item">
                  <span className="bullet-circle"></span>
                  <span className="ingredient-name">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Preparation Steps Section */}
          <section className="detail-section">
            <h4 className="detail-section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Preparation Steps</span>
            </h4>
            <div className="instructions-body">
              {recipe.instructions.split('\n').filter(p => p.trim().length > 0).map((paragraph, idx) => (
                <div key={idx} className="instruction-step-row">
                  <span className="step-badge">{idx + 1}</span>
                  <p className="step-text">{paragraph}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-modal-footer">
          <div className="detail-footer-actions">
            <button
              className="btn-secondary"
              onClick={() => {
                onClose();
                onEdit(recipe);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>Edit Recipe</span>
            </button>

            <button
              className="btn-danger-outline"
              onClick={() => {
                onClose();
                onDelete(recipe);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Delete</span>
            </button>
          </div>

          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
