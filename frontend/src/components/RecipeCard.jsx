import React from 'react';

const categoryColors = {
  Breakfast: 'badge-breakfast',
  Lunch: 'badge-lunch',
  Dinner: 'badge-dinner',
  Snack: 'badge-snack',
  Dessert: 'badge-dessert'
};

const RecipeCard = ({ recipe, onViewDetails, onEdit, onDelete }) => {
  const badgeClass = categoryColors[recipe.category] || 'badge-default';

  return (
    <article className="recipe-card" onClick={() => onViewDetails(recipe)}>
      <div className="card-top-bar">
        <span className={`category-tag ${badgeClass}`}>
          {recipe.category}
        </span>
        <div className="time-indicator">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{recipe.cookingTime} mins</span>
        </div>
      </div>

      <div className="card-main-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-summary-hint">
          {recipe.ingredients.length} {recipe.ingredients.length === 1 ? 'ingredient' : 'ingredients'} &bull; Click to see full recipe
        </p>
      </div>

      <div className="card-footer-actions">
        <button
          className="card-action-btn btn-view"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(recipe);
          }}
          title="View Recipe Details"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>View</span>
        </button>

        <div className="card-edit-delete-group">
          <button
            className="card-action-btn btn-edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(recipe);
            }}
            title="Edit Recipe"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit</span>
          </button>

          <button
            className="card-action-btn btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(recipe);
            }}
            title="Delete Recipe"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
