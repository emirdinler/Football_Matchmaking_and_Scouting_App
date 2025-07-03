// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header style={{
      position: 'fixed',           
      top: 0,                      
      left: 0,
      right: 0,
      zIndex: 999,                 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1f1f1f',
      color: 'white',
      padding: '10px 20px',
      height: '60px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      {/*Logo + Arama */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/logosite.jpg" alt="Logo" style={{ width: '40px' }} />
        <input
          type="text"
          placeholder="Oyuncu veya Takım Ara..."
          style={{
            width: '250px',
            padding: '8px 12px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Buton + İkonlar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '6px',
          cursor: 'pointer',
          width: '120px',
          height: '40px',
          fontWeight: 'bold'
        }}>
          RAKİP BUL
        </button>
        <span style={{ fontSize: '20px' }}>📩</span>
        <span style={{ fontSize: '20px' }}>👤</span>
        <span style={{ fontSize: '20px' }}>💬</span>
        <span style={{ fontSize: '20px' }}>⚙️</span>
      </div>
    </header>
  );
};

export default Header;
