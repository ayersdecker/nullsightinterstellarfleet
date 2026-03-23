import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { UserProfile } from '../contexts/AuthContext';
import {
  FaUsers, FaRocket, FaShieldAlt, FaGlobe, FaBoxOpen,
  FaSearch,
} from 'react-icons/fa';

const DIVISIONS = ['All', 'VANGUARD', 'MERIDIAN', 'HORIZON', 'Unassigned'];

const DIVISION_COLORS: Record<string, string> = {
  VANGUARD: 'var(--ns-red)',
  MERIDIAN: 'var(--ns-gold)',
  HORIZON: 'var(--ns-cyan)',
  Unassigned: 'var(--ns-text-dim)',
};

const SHIPS_REGISTRY = [
  { name: 'Hammerhead', manufacturer: 'Aegis Dynamics', role: 'Capital Combat', crew: '8+', division: 'VANGUARD' },
  { name: 'Carrack', manufacturer: 'Anvil Aerospace', role: 'Exploration', crew: '6', division: 'HORIZON' },
  { name: 'Caterpillar', manufacturer: 'Drake Interplanetary', role: 'Cargo / Multi-crew', crew: '5', division: 'MERIDIAN' },
  { name: 'Constellation Andromeda', manufacturer: 'Roberts Space Industries', role: 'Multi-role', crew: '3', division: 'VANGUARD' },
  { name: 'Orion', manufacturer: 'Roberts Space Industries', role: 'Mining', crew: '4', division: 'MERIDIAN' },
  { name: '890 Jump', manufacturer: 'Origin Jumpworks', role: 'Exploration / Luxury', crew: '10', division: 'HORIZON' },
  { name: 'Retaliator', manufacturer: 'Aegis Dynamics', role: 'Torpedo Bomber', crew: '4', division: 'VANGUARD' },
  { name: 'Reclaimer', manufacturer: 'Aegis Dynamics', role: 'Salvage', crew: '5', division: 'MERIDIAN' },
];

export default function FleetManagement() {
  const [members, setMembers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [divFilter, setDivFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'roster' | 'ships'>('roster');
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const snap = await getDocs(collection(db, 'users'));
        setMembers(snap.docs.map((d) => d.data() as UserProfile));
      } catch {
        setMembers([]);
      } finally {
        setLoadingMembers(false);
      }
    }
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((m) => {
    const matchSearch =
      !search ||
      m.scHandle?.toLowerCase().includes(search.toLowerCase()) ||
      m.displayName?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const filteredShips = SHIPS_REGISTRY.filter(
    (s) => divFilter === 'All' || s.division === divFilter
  );

  const tabStyle = (active: boolean) => ({
    padding: '0.5rem 1.2rem',
    background: active ? 'rgba(0,212,255,0.1)' : 'transparent',
    border: active ? '1px solid var(--ns-cyan)' : '1px solid var(--ns-border)',
    color: active ? 'var(--ns-cyan)' : 'var(--ns-text-dim)',
    fontFamily: 'var(--ns-font-display)',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderRadius: '3px',
  });

  return (
    <div className="ns-page py-5">
      <Container>
        {/* Header */}
        <div className="mb-5">
          <span className="ns-badge ns-badge-cyan mb-3 d-inline-block">Fleet Operations</span>
          <h1
            style={{
              fontFamily: 'var(--ns-font-display)',
              fontSize: '2rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Fleet <span style={{ color: 'var(--ns-cyan)' }}>Management</span>
          </h1>
          <p style={{ color: 'var(--ns-text-dim)', maxWidth: 600 }}>
            View the NULLSIGHT roster, browse the fleet registry, and manage your team assignments.
          </p>
        </div>

        {/* Division overview */}
        <Row className="g-3 mb-5">
          {[
            { name: 'VANGUARD', label: 'Combat & Security', icon: <FaShieldAlt size={22} />, color: 'var(--ns-red)', count: members.filter((m) => m.role === 'VANGUARD').length },
            { name: 'MERIDIAN', label: 'Trade & Logistics', icon: <FaBoxOpen size={22} />, color: 'var(--ns-gold)', count: members.filter((m) => m.role === 'MERIDIAN').length },
            { name: 'HORIZON', label: 'Exploration & Science', icon: <FaGlobe size={22} />, color: 'var(--ns-cyan)', count: members.filter((m) => m.role === 'HORIZON').length },
            { name: 'Fleet Total', label: 'Active Members', icon: <FaUsers size={22} />, color: 'var(--ns-green)', count: members.length },
          ].map((d) => (
            <Col key={d.name} xs={6} lg={3}>
              <div className="ns-card p-3">
                <div style={{ color: d.color, marginBottom: '0.75rem' }}>{d.icon}</div>
                <div
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: d.color,
                    lineHeight: 1,
                  }}
                >
                  {d.count}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--ns-font-display)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: d.color,
                    fontSize: '0.75rem',
                    marginTop: '0.25rem',
                  }}
                >
                  {d.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ns-text-dim)' }}>{d.label}</div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Tabs */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <button style={tabStyle(activeTab === 'roster')} onClick={() => setActiveTab('roster')}>
            <FaUsers size={12} className="me-2" />
            Member Roster
          </button>
          <button style={tabStyle(activeTab === 'ships')} onClick={() => setActiveTab('ships')}>
            <FaRocket size={12} className="me-2" />
            Ship Registry
          </button>
        </div>

        {/* Roster */}
        {activeTab === 'roster' && (
          <div className="ns-card">
            <div className="ns-card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="d-flex align-items-center gap-2">
                <FaUsers size={14} />
                Member Roster
              </span>
              <div className="d-flex gap-2 align-items-center">
                <div className="position-relative">
                  <FaSearch
                    size={12}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--ns-text-dim)',
                    }}
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search members..."
                    className="ns-form-control"
                    style={{ paddingLeft: '30px', height: '32px', fontSize: '0.85rem', width: '200px' }}
                  />
                </div>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              {loadingMembers ? (
                <div className="p-5 text-center">
                  <div className="ns-spinner mx-auto" />
                  <div style={{ color: 'var(--ns-text-dim)', marginTop: '1rem', fontFamily: 'var(--ns-font-display)', fontSize: '0.85rem' }}>
                    Loading roster...
                  </div>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="p-5 text-center" style={{ color: 'var(--ns-text-dim)' }}>
                  {members.length === 0
                    ? 'No members found. Be the first to register!'
                    : 'No members match your search.'}
                </div>
              ) : (
                <table className="ns-table w-100">
                  <thead>
                    <tr>
                      <th>Handle</th>
                      <th>Name</th>
                      <th>Rank</th>
                      <th>Joined</th>
                      <th>Ships</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((m) => (
                      <tr key={m.uid}>
                        <td>
                          <span style={{ color: 'var(--ns-cyan)', fontFamily: 'var(--ns-font-display)', fontWeight: 600 }}>
                            {m.scHandle || '—'}
                          </span>
                        </td>
                        <td style={{ color: 'var(--ns-text-bright)' }}>{m.displayName || '—'}</td>
                        <td>
                          <span className="ns-badge ns-badge-cyan" style={{ fontSize: '0.65rem' }}>
                            {m.rank || 'Recruit'}
                          </span>
                        </td>
                        <td style={{ color: 'var(--ns-text-dim)', fontSize: '0.85rem', fontFamily: 'var(--ns-font-body)' }}>
                          {m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : '—'}
                        </td>
                        <td style={{ color: 'var(--ns-text-dim)' }}>{m.ships?.length || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Ships Registry */}
        {activeTab === 'ships' && (
          <div>
            {/* Filter */}
            <div className="d-flex gap-2 mb-4 flex-wrap">
              {DIVISIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDivFilter(d)}
                  style={{
                    ...tabStyle(divFilter === d),
                    color: divFilter === d ? (DIVISION_COLORS[d] || 'var(--ns-cyan)') : 'var(--ns-text-dim)',
                    borderColor: divFilter === d ? (DIVISION_COLORS[d] || 'var(--ns-cyan)') : 'var(--ns-border)',
                    background: divFilter === d ? `rgba(${divFilter === 'VANGUARD' ? '255,74,74' : divFilter === 'MERIDIAN' ? '232,200,74' : '0,212,255'},0.08)` : 'transparent',
                  }}
                >
                  {d}
                </button>
              ))}
            </div>

            <Row className="g-3">
              {filteredShips.map((ship) => (
                <Col key={ship.name} md={6} lg={4}>
                  <div className="ns-card h-100">
                    <div className="ns-card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5
                          style={{
                            fontFamily: 'var(--ns-font-display)',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            marginBottom: 0,
                            color: 'var(--ns-text-bright)',
                          }}
                        >
                          {ship.name}
                        </h5>
                        <span
                          className="ns-badge"
                          style={{
                            color: DIVISION_COLORS[ship.division],
                            borderColor: DIVISION_COLORS[ship.division],
                            fontSize: '0.6rem',
                          }}
                        >
                          {ship.division}
                        </span>
                      </div>
                      <div style={{ color: 'var(--ns-text-dim)', fontSize: '0.8rem', marginBottom: '0.75rem', fontFamily: 'var(--ns-font-body)' }}>
                        {ship.manufacturer}
                      </div>
                      <div className="d-flex gap-3" style={{ fontSize: '0.8rem' }}>
                        <div>
                          <span style={{ color: 'var(--ns-text-dim)', fontFamily: 'var(--ns-font-display)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Role</span>
                          <div style={{ color: 'var(--ns-text)', fontFamily: 'var(--ns-font-body)' }}>{ship.role}</div>
                        </div>
                        <div>
                          <span style={{ color: 'var(--ns-text-dim)', fontFamily: 'var(--ns-font-display)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Crew</span>
                          <div style={{ color: 'var(--ns-text)', fontFamily: 'var(--ns-font-body)' }}>{ship.crew}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}
