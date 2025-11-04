'use client';

import { useEffect, useState } from 'react';

interface Tournament {
  name: string;
  date: string;
  tier: number;
}

interface Player {
  id: string;
  name: string;
  realName: string;
  team: string;
  tournaments: Tournament[];
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');

  useEffect(() => {
    fetch('/api/players')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPlayers(data.players);
        } else {
          setError(data.error);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  const teams = ['all', ...new Set(players.map(p => p.team))];

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.realName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || player.team === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const totalTournaments = new Set(
    players.flatMap(p => p.tournaments.map(t => t.name))
  ).size;

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading Chinese Dota 2 players data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Chinese Dota 2 Players</h1>
        <p style={styles.subtitle}>
          Tier 1 Tournament Participants in 2025
        </p>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{players.length}</div>
            <div style={styles.statLabel}>Total Players</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{teams.length - 1}</div>
            <div style={styles.statLabel}>Teams</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{totalTournaments}</div>
            <div style={styles.statLabel}>Tournaments</div>
          </div>
        </div>
      </header>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          style={styles.select}
        >
          {teams.map(team => (
            <option key={team} value={team}>
              {team === 'all' ? 'All Teams' : team}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.grid}>
        {filteredPlayers.map(player => (
          <div key={player.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.playerName}>{player.name}</h2>
              <span style={styles.teamBadge}>{player.team}</span>
            </div>
            <p style={styles.realName}>{player.realName}</p>
            <div style={styles.tournamentsSection}>
              <h3 style={styles.tournamentsTitle}>
                Tournaments ({player.tournaments.length})
              </h3>
              <ul style={styles.tournamentList}>
                {player.tournaments.map((tournament, idx) => (
                  <li key={idx} style={styles.tournamentItem}>
                    <div style={styles.tournamentName}>{tournament.name}</div>
                    <div style={styles.tournamentDate}>
                      {new Date(tournament.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div style={styles.noResults}>
          No players found matching your search criteria.
        </div>
      )}

      <footer style={styles.footer}>
        <p>Data represents Chinese Dota 2 players participating in Liquipedia Tier 1 tournaments during 2025</p>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '40px',
  },
  title: {
    fontSize: '3rem',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: '0 0 30px 0',
    opacity: 0.9,
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap' as 'wrap',
  },
  statCard: {
    background: 'rgba(255,255,255,0.2)',
    padding: '20px 40px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
  filters: {
    maxWidth: '1200px',
    margin: '0 auto 30px',
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap' as 'wrap',
  },
  searchInput: {
    flex: '1',
    minWidth: '250px',
    padding: '12px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    outline: 'none',
  },
  select: {
    padding: '12px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '200px',
  },
  grid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '10px',
  },
  playerName: {
    fontSize: '1.5rem',
    margin: '0',
    color: '#333',
    fontWeight: 'bold',
  },
  teamBadge: {
    background: '#667eea',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '600',
    whiteSpace: 'nowrap' as 'nowrap',
  },
  realName: {
    fontSize: '1rem',
    color: '#666',
    margin: '0 0 20px 0',
    fontStyle: 'italic',
  },
  tournamentsSection: {
    borderTop: '1px solid #eee',
    paddingTop: '16px',
  },
  tournamentsTitle: {
    fontSize: '1rem',
    margin: '0 0 12px 0',
    color: '#333',
    fontWeight: '600',
  },
  tournamentList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  tournamentItem: {
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  tournamentName: {
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '4px',
  },
  tournamentDate: {
    fontSize: '0.85rem',
    color: '#999',
  },
  loading: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5rem',
    marginTop: '100px',
  },
  error: {
    textAlign: 'center',
    color: '#ff6b6b',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '100px auto',
  },
  noResults: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.2rem',
    background: 'rgba(255,255,255,0.2)',
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  footer: {
    textAlign: 'center',
    color: 'white',
    padding: '20px',
    fontSize: '0.9rem',
    opacity: 0.8,
  },
};
