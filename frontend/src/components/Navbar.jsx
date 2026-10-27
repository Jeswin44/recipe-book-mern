import React from 'react';

const Navbar = ({ onOpenAddModal, totalCount }) => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand-logo-area">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
          <div>
            <h1 className="brand-title">SavoryLog</h1>
            <p className="brand-subtitle">Personal Culinary Repertoire</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="stats-pill">
            <span className="stats-number">{totalCount}</span>
            <span className="stats-label">{totalCount === 1 ? 'Recipe' : 'Recipes'}</span>
          </div>

          <button className="btn-primary" onClick={onOpenAddModal}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Recipe</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
