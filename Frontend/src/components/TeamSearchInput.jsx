import React, { useState } from 'react';
import teams from '../data/fakeTeams';

const TeamSearchInput = ({ label, onSelect }) => {
  const [input, setInput] = useState('');
  const [showList, setShowList] = useState(false);

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (team) => {
    setInput(team.name);
    setShowList(false);
    onSelect(team); 
  };

  return (
    <div style={{ position: 'relative' }}>
      <label>{label}</label>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowList(true);
        }}
        placeholder="Takım ismini yaz..."
        style={{ width: '100%' }}
      />
      {showList && input.length > 0 && (
        <div style={{
          position: 'absolute',
          backgroundColor: '#333',
          borderRadius: '8px',
          marginTop: '5px',
          maxHeight: '150px',
          overflowY: 'auto',
          zIndex: 1000,
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          {filteredTeams.map(team => (
            <div
              key={team.id}
              onClick={() => handleSelect(team)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #444',
                color: 'white'
              }}
            >
              <img src={team.logo} alt={team.name} style={{ width: '24px', height: '24px' }} />
              <span>{team.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSearchInput;
