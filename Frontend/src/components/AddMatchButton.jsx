import React from 'react';

const AddMatchButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontSize: '32px',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      +
    </button>
  );
};

export default AddMatchButton;
