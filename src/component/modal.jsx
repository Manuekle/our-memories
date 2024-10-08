/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function modal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? 'visible bg-black/20' : 'invisible'}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-zinc-900/90 rounded-xl shadow p-6 transition-all
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:text-gray-600"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
}

export default modal;
