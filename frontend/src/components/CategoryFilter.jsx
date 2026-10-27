import React from 'react';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="filter-panel">
      <div className="search-box-wrapper">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search recipes by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => onSearchChange('')}>
            &times;
          </button>
        )}
      </div>

      <div className="category-pills">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
