import React, { useState } from 'react';
import axios from 'axios';
import user from '../data/fakeUser';
import teams from '../data/fakeTeams';
import players from '../data/fakePlayers';

const AddMatchForm = ({ onClose, onMatchAdded }) => {
  const [formData, setFormData] = useState({
    team1: null,
    team2: null,
    score1: '',
    score2: '',
    scorers1: [],
    scorers2: [],
  });

  const [searchTeam1, setSearchTeam1] = useState('');
  const [searchTeam2, setSearchTeam2] = useState('');
  const [scorerSearch, setScorerSearch] = useState('');
  const [selectedSide, setSelectedSide] = useState('1');
  const [scorerGoals, setScorerGoals] = useState('');
  const [selectedScorer, setSelectedScorer] = useState(null);

  const [showTeam1Dropdown, setShowTeam1Dropdown] = useState(false);
  const [showTeam2Dropdown, setShowTeam2Dropdown] = useState(false);
  const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);

  const filteredTeams1 = searchTeam1 ? teams.filter(t => t.name.toLowerCase().includes(searchTeam1.toLowerCase())) : [];
  const filteredTeams2 = searchTeam2 ? teams.filter(t => t.name.toLowerCase().includes(searchTeam2.toLowerCase())) : [];
  const filteredPlayers = scorerSearch ? players.filter(p => p.name.toLowerCase().includes(scorerSearch.toLowerCase())) : [];

  const addScorer = () => {
    if (!selectedScorer || !scorerGoals) {
      alert("Oyuncu seçin ve gol sayısını girin");
      return;
    }
    const newScorer = { id: selectedScorer.id, name: selectedScorer.name, goals: Number(scorerGoals) };
    setFormData(prev => ({
      ...prev,
      [`scorers${selectedSide}`]: [...prev[`scorers${selectedSide}`], newScorer]
    }));
    setScorerSearch('');
    setScorerGoals('');
    setSelectedScorer(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchData = {
      postedBy: user.name,
      team1: formData.team1,
      team2: formData.team2,
      score1: Number(formData.score1),
      score2: Number(formData.score2),
      date: new Date().toISOString().split('T')[0],
      scorers1: formData.scorers1,
      scorers2: formData.scorers2,
    };

    /*axios.post('http://localhost:5000/api/matches', matchData)
      .then(() => {
        alert("Maç eklendi");

        if (onMatchAdded) {
          onMatchAdded(matchData);
        }

        onClose();
      })
      .catch(err => {
        alert("Hata oldu");
        console.error(err);
      });*/
      if (onMatchAdded) {
        onMatchAdded(matchData);
      }
      alert("Maç eklendi!");
      onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#1f1f1f', padding: '20px', borderRadius: '12px', width: '400px', color: 'white' }}>
        <h3>Yeni Maç Ekle</h3>

        {/* Takım 1 */}
        <input placeholder="Takım 1 ara..." value={searchTeam1} onChange={e => { setSearchTeam1(e.target.value); setShowTeam1Dropdown(true); }} />
        {showTeam1Dropdown && searchTeam1 && (
          <div style={{ maxHeight: '100px', overflowY: 'auto', backgroundColor: '#3a3a3a', borderRadius: '8px', padding: '8px', border: '1px solid #555' }}>
            {filteredTeams1.map(team => (
              <div key={team.id} onClick={() => {
                setFormData(p => ({ ...p, team1: team }));
                setSearchTeam1(team.name);
                setShowTeam1Dropdown(false);
              }} style={{ cursor: 'pointer', padding: '4px 0', borderBottom: '1px solid #444' }}>
                <img src={team.logo} alt={team.name} style={{ width: '20px' }} /> {team.name}
              </div>
            ))}
          </div>
        )}

        {/* Takım 2 */}
        <input placeholder="Takım 2 ara..." value={searchTeam2} onChange={e => { setSearchTeam2(e.target.value); setShowTeam2Dropdown(true); }} />
        {showTeam2Dropdown && searchTeam2 && (
          <div style={{ maxHeight: '100px', overflowY: 'auto', backgroundColor: '#3a3a3a', borderRadius: '8px', padding: '8px', border: '1px solid #555' }}>
            {filteredTeams2.map(team => (
              <div key={team.id} onClick={() => {
                setFormData(p => ({ ...p, team2: team }));
                setSearchTeam2(team.name);
                setShowTeam2Dropdown(false);
              }} style={{ cursor: 'pointer', padding: '4px 0', borderBottom: '1px solid #444' }}>
                <img src={team.logo} alt={team.name} style={{ width: '20px' }} /> {team.name}
              </div>
            ))}
          </div>
        )}

        <input type="number" placeholder="Skor 1" value={formData.score1} onChange={e => setFormData(p => ({ ...p, score1: e.target.value }))} />
        <input type="number" placeholder="Skor 2" value={formData.score2} onChange={e => setFormData(p => ({ ...p, score2: e.target.value }))} />

        <hr />
        <h4>Golcü Ekle</h4>
        <select value={selectedSide} onChange={e => setSelectedSide(e.target.value)}>
          <option value="1">Takım 1</option>
          <option value="2">Takım 2</option>
        </select>

        <input placeholder="Oyuncu ara..." value={scorerSearch} onChange={e => {
          setScorerSearch(e.target.value);
          setSelectedScorer(null);
          setShowPlayerDropdown(true);
        }} />
        {showPlayerDropdown && scorerSearch && (
          <div style={{ maxHeight: '100px', overflowY: 'auto', backgroundColor: '#3a3a3a', borderRadius: '8px', padding: '8px', border: '1px solid #555' }}>
            {filteredPlayers.map(player => (
              <div key={player.id} style={{ cursor: 'pointer', padding: '4px 0', borderBottom: '1px solid #444' }} onClick={() => {
                setSelectedScorer(player);
                setScorerSearch(player.name);
                setShowPlayerDropdown(false);
              }}>
                {player.name}
              </div>
            ))}
          </div>
        )}

        {selectedScorer && (
          <div style={{ marginTop: '4px', color: '#ccc', fontSize: '14px' }}>
            Seçilen oyuncu: <strong>{selectedScorer.name}</strong>
          </div>
        )}

        <input placeholder="Kaç gol?" type="number" value={scorerGoals} onChange={e => setScorerGoals(e.target.value)} />
        <button type="button" onClick={addScorer} style={{ marginTop: '6px', marginBottom: '12px' }}>➕ Golcüyü Ekle</button>

        {/* Eklenen golcüler */}
        {(formData.scorers1.length > 0 || formData.scorers2.length > 0) && (
          <div>
            <h4>Eklenen Golcüler</h4>
            {[1, 2].map(side => (
              formData[`scorers${side}`].length > 0 && (
                <div key={side}>
                  <strong>Takım {side}</strong>
                  {formData[`scorers${side}`].map((player, i) => (
                    <div key={player.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      backgroundColor: '#2a2a2a', padding: '6px 10px', marginBottom: '6px', borderRadius: '6px'
                    }}>
                      <span>{player.name} ({player.goals})</span>
                      <div>
                        <button type="button" onClick={() => {
                          setScorerSearch(player.name);
                          setScorerGoals(player.goals);
                          setSelectedSide(String(side));
                          setSelectedScorer(player);
                          setShowPlayerDropdown(false);
                          const updated = formData[`scorers${side}`].filter(p => p.id !== player.id);
                          setFormData(p => ({ ...p, [`scorers${side}`]: updated }));
                        }} style={{ marginRight: '6px' }}>✏️</button>
                        <button type="button" onClick={() => {
                          const updated = formData[`scorers${side}`].filter(p => p.id !== player.id);
                          setFormData(p => ({ ...p, [`scorers${side}`]: updated }));
                        }}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
        )}

        <div style={{ marginTop: '15px' }}>
          <button type="submit">Maçı Ekle</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Kapat</button>
        </div>
      </form>
    </div>
  );
};

export default AddMatchForm;
