import React from 'react';
import user from '../data/fakeUser';
import teams from '../data/fakeTeams';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      left: '30px',
      width: '240px',
      backgroundColor: 'transparent',
      color: 'white',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      
      {/* PROFİL */}
      <div style={{
        backgroundColor: '#1f1f1f',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        <img
          src={user.profilePicture}
          alt="Profil"
          style={{ width: '100px', borderRadius: '50%', marginBottom: '10px' }}
        />
        <h2 style={{ margin: '10px 0 5px' }}>{user.name}</h2>
        <p style={{ margin: 0 }}>{user.city} / Türkiye</p>

        {/* Takım + Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '10px',
          fontWeight: 'bold'
        }}>
          <img
            src={user.teamLogo}
            alt="Takım Logo"
            style={{ width: '24px', height: '24px' }}
          />
          <span>{user.team}</span>
        </div>
      </div>

      {/*  ÖNERİLEN TAKIMLAR  */}
      <div style={{
        backgroundColor: '#1f1f1f',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Önerilen Takımlar</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {teams.map(team => (
            <Link
              to={`/team/${team.id}`}
              key={team.id}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 8px',
                borderRadius: '6px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2c2c2c'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <img src={team.logo} alt="logo" style={{ width: '24px', height: '24px' }} />
                <span>{team.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
