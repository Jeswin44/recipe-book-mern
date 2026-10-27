import React, { useState, useRef } from 'react';

const categoryIcons = {
  Breakfast: '🥞',
  Lunch: '🍜',
  Dinner: '🥘',
  Snack: '🍟',
  Dessert: '🍨'
};

const categoryColors = {
  Breakfast: 'badge-breakfast',
  Lunch: 'badge-lunch',
  Dinner: 'badge-dinner',
  Snack: 'badge-snack',
  Dessert: 'badge-dessert'
};

const RecipeCard = ({ recipe, onViewDetails, onEdit, onDelete }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const badgeClass = categoryColors[recipe.category] || 'badge-default';
  const dishEmoji = categoryIcons[recipe.category] || '🍲';

  // Interactive 3D Perspective Tilt Tracking Mouse Movement
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt max 12 deg
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`
    );

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({ opacity: 0.35, x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <article
      ref={cardRef}
      className="recipe-card card-3d"
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onViewDetails(recipe)}
    >
      {/* 3D Dynamic Specular Light Glare */}
      <div
        className="card-3d-glare"
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.7) 0%, transparent 60%)`
        }}
      />

      {/* Floating 3D Circular Dish Visual popping out along Z axis */}
      <div className="card-dish-visual popout-dish-3d">
        <span>{dishEmoji}</span>
      </div>

      <div className="card-top-bar elevated-element-3d">
        <span className={`category-tag ${badgeClass}`}>
          {recipe.category}
        </span>
        <div className="time-indicator-star">
          <span className="star-icon">★</span>
          <span>{recipe.cookingTime} mins</span>
        </div>
      </div>

      <div className="card-main-content elevated-element-3d">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-summary-hint">
          {recipe.ingredients.length} {recipe.ingredients.length === 1 ? 'ingredient' : 'ingredients'} &bull; Click to see full recipe
        </p>
      </div>

      <div className="card-footer-actions elevated-element-3d">
        <button
          className="card-action-btn btn-view btn-3d"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(recipe);
          }}
          title="View Recipe Details"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>View</span>
        </button>

        <div className="card-edit-delete-group">
          <button
            className="card-action-btn btn-edit btn-3d"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(recipe);
            }}
            title="Edit Recipe"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit</span>
          </button>

          <button
            className="card-action-btn btn-delete btn-3d"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(recipe);
            }}
            title="Delete Recipe"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
