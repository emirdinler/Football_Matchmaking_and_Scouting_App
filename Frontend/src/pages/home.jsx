import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MatchCard from '../components/MatchCard';
import AddMatchButton from '../components/AddMatchButton';
import AddMatchForm from '../components/AddMatchForm';
import fakeMatches from '../data/fakeMatches';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [matches, setMatches] = useState(fakeMatches);

  const handleMatchAdded = (newMatch) => {
    setMatches(prev => [newMatch, ...prev]);
  };

  return (
    <div style={{
      backgroundColor: '#121212',
      color: 'white',
      minHeight: '100vh',
      paddingTop: '80px',
      paddingLeft: '300px',
      paddingRight: '30px'
    }}>
      <Sidebar />
      <h1 style={{ marginBottom: '20px' }}></h1>

      {matches.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}

      <AddMatchButton onClick={() => setShowForm(true)} />
      {showForm && (
        <AddMatchForm
          onClose={() => setShowForm(false)}
          onMatchAdded={handleMatchAdded}
        />
      )}
    </div>
  );
};

export default Home;
