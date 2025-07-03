import React from 'react';
import { Link } from 'react-router-dom';

const MatchCard = ({ match }) => {
  return (
    <div style={{
      backgroundColor: '#1f1f1f',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      marginBottom: '20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* takımlar + skorlar */}
      <div style={{ paddingRight: '40px' }}>
        <p style={{ marginBottom: '10px', color: '#aaa' }}>
          {match.postedBy} paylaştı - {match.date}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Takım 1 */}
          <Link to={`/team/${match.team1.id}`} style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={match.team1.logo} alt={match.team1.name} style={{ width: '40px' }} />
              <p>{match.team1.name}</p>
            </div>
          </Link>

          {/* Skor */}
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {match.score1} - {match.score2}
          </div>

          {/* Takım 2 */}
          <Link to={`/team/${match.team2.id}`} style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={match.team2.logo} alt={match.team2.name} style={{ width: '40px' }} />
              <p>{match.team2.name}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Golcüler */}
      <div style={{ minWidth: '200px' }}>
        {match.scorers1.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <strong>{match.team1.name}:</strong>
            {match.scorers1.map((player, i) => (
              <div key={i} style={{ fontSize: '14px' }}>
                <Link to={`/player/${player.id}`} style={{ color: 'white', textDecoration: 'underline' }}>
                  {player.name}
                </Link> ({player.goals})
              </div>
            ))}
          </div>
        )}
        {match.scorers2.length > 0 && (
          <div>
            <strong>{match.team2.name}:</strong>
            {match.scorers2.map((player, i) => (
              <div key={i} style={{ fontSize: '14px' }}>
                <Link to={`/player/${player.id}`} style={{ color: 'white', textDecoration: 'underline' }}>
                  {player.name}
                </Link> ({player.goals})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
