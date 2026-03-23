import { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaRocket, FaSave, FaIdCard, FaEnvelope, FaPlus, FaTimes } from 'react-icons/fa';
import EmailSubscribe from '../components/EmailSubscribe';

const SHIP_OPTIONS = [
  'Aurora MR', 'Mustang Alpha', 'Avenger Titan', 'Freelancer', 'Constellation Andromeda',
  'Cutlass Black', 'Buccaneer', 'Gladius', 'Arrow', 'Hornet F7C', 'Vanguard Warden',
  'Caterpillar', 'Carrack', 'Hammerhead', 'Orion', 'Prospector', 'Vulture', 'Reclaimer',
  '890 Jump', 'Retaliator', 'Polaris', 'Idris-M',
];

const DIVISIONS = ['Unassigned', 'VANGUARD', 'MERIDIAN', 'HORIZON'];

export default function Profile() {
  const { userProfile, updateUserProfile, currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    displayName: userProfile?.displayName || '',
    scHandle: userProfile?.scHandle || '',
    role: userProfile?.role || 'Unassigned',
  });
  const [ships, setShips] = useState<string[]>(userProfile?.ships || []);
  const [newShip, setNewShip] = useState('');

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile({ ...form, ships });
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const addShip = () => {
    if (newShip && !ships.includes(newShip)) {
      setShips([...ships, newShip]);
      setNewShip('');
    }
  };

  const removeShip = (s: string) => setShips(ships.filter((x) => x !== s));

  return (
    <div className="ns-page py-5">
      <Container>
        {/* Header */}
        <div className="mb-5">
          <span className="ns-badge ns-badge-cyan mb-3 d-inline-block">Pilot Record</span>
          <h1
            style={{
              fontFamily: 'var(--ns-font-display)',
              fontSize: '2rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Pilot <span style={{ color: 'var(--ns-cyan)' }}>Profile</span>
          </h1>
        </div>

        <Row className="g-4">
          {/* Profile card */}
          <Col lg={4}>
            <div className="ns-card mb-4">
              <div className="ns-card-body text-center py-5">
                {/* Avatar */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: '2px solid var(--ns-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    background: 'rgba(0,212,255,0.08)',
                  }}
                >
                  <FaUser size={32} style={{ color: 'var(--ns-cyan)' }} />
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--ns-font-display)',
                    letterSpacing: '0.08em',
                    marginBottom: '0.25rem',
                  }}
                >
                  {userProfile?.displayName || 'Unknown Pilot'}
                </h4>
                <div style={{ color: 'var(--ns-cyan)', fontFamily: 'var(--ns-font-body)', marginBottom: '0.5rem' }}>
                  @{userProfile?.scHandle || 'no-handle'}
                </div>
                <span className="ns-badge ns-badge-cyan">{userProfile?.rank || 'Recruit'}</span>

                <div
                  style={{
                    borderTop: '1px solid var(--ns-border)',
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                  }}
                >
                  <div className="d-flex justify-content-around">
                    <div>
                      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.5rem', color: 'var(--ns-cyan)' }}>
                        {ships.length}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ns-text-dim)', fontFamily: 'var(--ns-font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Ships
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.5rem', color: 'var(--ns-gold)' }}>
                        {userProfile?.joinedAt ? Math.floor((Date.now() - new Date(userProfile.joinedAt).getTime()) / 86400000) : 0}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ns-text-dim)', fontFamily: 'var(--ns-font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribe */}
            <div className="ns-card">
              <div className="ns-card-header">Fleet Communications</div>
              <div className="ns-card-body">
                <EmailSubscribe />
              </div>
            </div>
          </Col>

          {/* Edit form */}
          <Col lg={8}>
            <div className="ns-card mb-4">
              <div className="ns-card-header d-flex justify-content-between align-items-center">
                <span className="d-flex align-items-center gap-2">
                  <FaIdCard size={14} />
                  Pilot Information
                </span>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="btn-ns-primary"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="ns-card-body">
                {saved && (
                  <div className="ns-alert ns-alert-success p-3 rounded mb-4">
                    Profile updated successfully.
                  </div>
                )}

                {editing ? (
                  <div>
                    <Form.Group className="mb-4">
                      <label className="ns-form-label">Display Name</label>
                      <Form.Control
                        type="text"
                        value={form.displayName}
                        onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                        className="ns-form-control"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <label className="ns-form-label">Star Citizen Handle</label>
                      <Form.Control
                        type="text"
                        value={form.scHandle}
                        onChange={(e) => setForm({ ...form, scHandle: e.target.value })}
                        className="ns-form-control"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <label className="ns-form-label">Division</label>
                      <Form.Select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="ns-form-control"
                      >
                        {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </Form.Select>
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <button onClick={handleSave} disabled={saving} className="btn-ns-primary d-flex align-items-center gap-2">
                        <FaSave size={14} />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button onClick={() => setEditing(false)} className="btn-ns-danger">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {[
                      { label: 'Display Name', value: userProfile?.displayName, icon: <FaUser size={14} /> },
                      { label: 'SC Handle', value: userProfile?.scHandle, icon: <FaIdCard size={14} /> },
                      { label: 'Email', value: currentUser?.email, icon: <FaEnvelope size={14} /> },
                      { label: 'Rank', value: userProfile?.rank, icon: <FaRocket size={14} /> },
                      {
                        label: 'Member Since',
                        value: userProfile?.joinedAt ? new Date(userProfile.joinedAt).toLocaleDateString() : '—',
                        icon: null,
                      },
                      { label: 'Division', value: userProfile?.role || 'Unassigned', icon: null },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className="d-flex gap-3 py-3"
                        style={{ borderBottom: '1px solid var(--ns-border)' }}
                      >
                        <div
                          style={{
                            width: '160px',
                            flexShrink: 0,
                            color: 'var(--ns-text-dim)',
                            fontFamily: 'var(--ns-font-display)',
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          {f.icon}
                          {f.label}
                        </div>
                        <div style={{ color: 'var(--ns-text-bright)', fontFamily: 'var(--ns-font-body)' }}>
                          {f.value || '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ships */}
            <div className="ns-card">
              <div className="ns-card-header d-flex align-items-center gap-2">
                <FaRocket size={14} />
                Hangar Registry
              </div>
              <div className="ns-card-body">
                {ships.length === 0 ? (
                  <p style={{ color: 'var(--ns-text-dim)', fontSize: '0.875rem' }}>
                    No ships registered. Add your fleet below.
                  </p>
                ) : (
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {ships.map((s) => (
                      <div
                        key={s}
                        className="d-flex align-items-center gap-2"
                        style={{
                          background: 'rgba(0,212,255,0.07)',
                          border: '1px solid var(--ns-cyan-dim)',
                          borderRadius: '3px',
                          padding: '0.3rem 0.7rem',
                          fontFamily: 'var(--ns-font-display)',
                          fontSize: '0.8rem',
                          color: 'var(--ns-text-bright)',
                        }}
                      >
                        <FaRocket size={11} style={{ color: 'var(--ns-cyan)' }} />
                        {s}
                        {editing && (
                          <button
                            onClick={() => removeShip(s)}
                            style={{ background: 'none', border: 'none', color: 'var(--ns-red)', cursor: 'pointer', padding: 0, marginLeft: '4px' }}
                          >
                            <FaTimes size={11} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Add ship */}
                {editing && (
                  <div className="d-flex gap-2 align-items-center flex-wrap">
                    <Form.Select
                      value={newShip}
                      onChange={(e) => setNewShip(e.target.value)}
                      className="ns-form-control"
                      style={{ maxWidth: '260px' }}
                    >
                      <option value="">— Select a ship —</option>
                      {SHIP_OPTIONS.filter((s) => !ships.includes(s)).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </Form.Select>
                    <button
                      onClick={addShip}
                      disabled={!newShip}
                      className="btn-ns-primary d-flex align-items-center gap-2"
                      style={{ padding: '0.45rem 0.9rem' }}
                    >
                      <FaPlus size={12} />
                      Add Ship
                    </button>
                  </div>
                )}

                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="btn-ns-primary d-flex align-items-center gap-2 mt-2"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                  >
                    <FaPlus size={11} />
                    Manage Hangar
                  </button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
