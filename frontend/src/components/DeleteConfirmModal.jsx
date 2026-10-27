import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, recipeTitle, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-bubble">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <h3 className="confirm-title">Delete this recipe?</h3>
        <p className="confirm-desc">
          Are you sure you want to remove <strong>"{recipeTitle}"</strong> from your Recipe Book? This action cannot be undone.
        </p>

        <div className="confirm-actions">
          <button
            className="btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
