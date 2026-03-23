import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaRocket, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password. Check your credentials and try again.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait before trying again.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ns-page d-flex align-items-center" style={{ minHeight: '100vh' }}>
      {/* Grid lines */}
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
          <Col xs={12} sm={10} md={8} lg={5}>
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
              <p style={{ color: 'var(--ns-text-dim)', fontFamily: 'var(--ns-font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                Fleet Authentication
              </p>
            </div>

            <div className="ns-card">
              <div className="ns-card-header">Sign In to Fleet Portal</div>
              <div className="ns-card-body">
                {error && (
                  <div className="ns-alert ns-alert-danger p-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <label className="ns-form-label">Email Address</label>
                    <div className="position-relative">
                      <FaEnvelope
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
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="pilot@example.com"
                        required
                        className="ns-form-control"
                        style={{ paddingLeft: '36px' }}
                      />
                    </div>
                  </Form.Group>

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
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

                  <Button
                    type="submit"
                    className="btn-ns-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <span className="ns-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                        Authenticating...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4" style={{ color: 'var(--ns-text-dim)', fontSize: '0.85rem' }}>
                  No account?{' '}
                  <Link to="/register" style={{ color: 'var(--ns-cyan)' }}>
                    Join the Fleet
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
