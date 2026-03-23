import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaRocket, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaIdCard } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: '',
    scHandle: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(form.email, form.password, form.scHandle.trim(), form.displayName.trim());
      navigate('/dashboard');
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (code === 'auth/weak-password') {
        setError('Password too weak. Use at least 8 characters.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      id: 'displayName',
      label: 'Display Name',
      placeholder: 'Your name or callsign',
      type: 'text',
      icon: <FaUser size={14} />,
    },
    {
      id: 'scHandle',
      label: 'Star Citizen Handle',
      placeholder: 'Your RSI username',
      type: 'text',
      icon: <FaIdCard size={14} />,
    },
    {
      id: 'email',
      label: 'Email Address',
      placeholder: 'pilot@example.com',
      type: 'email',
      icon: <FaEnvelope size={14} />,
    },
  ];

  return (
    <div className="ns-page d-flex align-items-center py-5" style={{ minHeight: '100vh' }}>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          zIndex: -1,
        }}
      />
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="text-center mb-4">
              <FaRocket size={32} style={{ color: 'var(--ns-cyan)' }} className="mb-3" />
              <h1
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.6rem',
                  letterSpacing: '0.2em',
                  color: 'var(--ns-text-bright)',
                }}
              >
                NULLSIGHT
              </h1>
              <p
                style={{
                  color: 'var(--ns-text-dim)',
                  fontFamily: 'var(--ns-font-display)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                }}
              >
                Fleet Enrollment
              </p>
            </div>

            <div className="ns-card">
              <div className="ns-card-header">Create Fleet Account</div>
              <div className="ns-card-body">
                <div className="ns-panel mb-4" style={{ fontSize: '0.85rem', color: 'var(--ns-text-dim)' }}>
                  Register with your Star Citizen handle to join the NULLSIGHT fleet.
                  Your SC handle will be visible to other members.
                </div>

                {error && (
                  <div className="ns-alert ns-alert-danger p-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  {fields.map((f) => (
                    <Form.Group key={f.id} className="mb-4">
                      <label className="ns-form-label">{f.label}</label>
                      <div className="position-relative">
                        <span
                          style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--ns-text-dim)',
                            zIndex: 1,
                          }}
                        >
                          {f.icon}
                        </span>
                        <Form.Control
                          type={f.type}
                          value={form[f.id as keyof typeof form]}
                          onChange={set(f.id)}
                          placeholder={f.placeholder}
                          required
                          className="ns-form-control"
                          style={{ paddingLeft: '36px' }}
                        />
                      </div>
                    </Form.Group>
                  ))}

                  <Form.Group className="mb-4">
                    <label className="ns-form-label">Password</label>
                    <div className="position-relative">
                      <FaLock
                        size={14}
                        style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--ns-text-dim)',
                          zIndex: 1,
                        }}
                      />
                      <Form.Control
                        type={showPw ? 'text' : 'password'}
                        value={form.password}
                        onChange={set('password')}
                        placeholder="Min. 8 characters"
                        required
                        className="ns-form-control"
                        style={{ paddingLeft: '36px', paddingRight: '40px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: 'var(--ns-text-dim)',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                      </button>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <label className="ns-form-label">Confirm Password</label>
                    <div className="position-relative">
                      <FaLock
                        size={14}
                        style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--ns-text-dim)',
                          zIndex: 1,
                        }}
                      />
                      <Form.Control
                        type={showPw ? 'text' : 'password'}
                        value={form.confirm}
                        onChange={set('confirm')}
                        placeholder="Repeat password"
                        required
                        className="ns-form-control"
                        style={{ paddingLeft: '36px' }}
                      />
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn-ns-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <span className="ns-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                        Enrolling...
                      </span>
                    ) : (
                      'Enroll in Fleet'
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4" style={{ color: 'var(--ns-text-dim)', fontSize: '0.85rem' }}>
                  Already a member?{' '}
                  <Link to="/login" style={{ color: 'var(--ns-cyan)' }}>
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
