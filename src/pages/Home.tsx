import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  FaRocket, FaShieldAlt, FaChartLine, FaUsers, FaStar,
  FaCrosshairs, FaGlobe, FaBoxOpen
} from 'react-icons/fa';
import EmailSubscribe from '../components/EmailSubscribe';

const FEATURES = [
  {
    icon: <FaShieldAlt size={28} />,
    title: 'Combat Operations',
    desc: 'Coordinated fleet combat missions, bounty hunting, and security contracts. Train with the best pilots in the verse.',
  },
  {
    icon: <FaChartLine size={28} />,
    title: 'Trade & Logistics',
    desc: 'Optimize cargo routes, manage fleet supply chains, and leverage market intelligence for maximum profit.',
  },
  {
    icon: <FaGlobe size={28} />,
    title: 'Exploration',
    desc: 'Chart unknown systems, discover anomalies, and push the frontier of mapped space with dedicated scout teams.',
  },
  {
    icon: <FaBoxOpen size={28} />,
    title: 'Mining & Industry',
    desc: 'Industrial-scale mining operations with Orion-class ships and refined resource trading across the UEE.',
  },
  {
    icon: <FaUsers size={28} />,
    title: 'Fleet Management',
    desc: 'Organize crew, assign roles, schedule ops, and manage your personal fleet registry through our dashboard.',
  },
  {
    icon: <FaCrosshairs size={28} />,
    title: 'Tactical Intel',
    desc: 'Access real-time commodity prices, ship loadout recommendations, and fleet coordination tools.',
  },
];

const STATS = [
  { value: '50+', label: 'Fleet Members' },
  { value: '3', label: 'Active Divisions' },
  { value: '100+', label: 'Ships Registered' },
  { value: '24/7', label: 'Operations' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="ns-hero">
        <Container>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="ns-badge ns-badge-cyan">Est. Star Citizen Alpha 3.x</span>
          </div>
          <h1 className="ns-hero-title">NULLSIGHT</h1>
          <p className="ns-hero-subtitle">Interstellar Fleet</p>
          <div className="ns-divider" />
          <p className="ns-hero-tagline">
            An elite organization operating in the Star Citizen universe.
            We unite pilots, explorers, traders, and warriors under one banner —
            forging a legacy across the stars.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/register">
              <Button className="btn-ns-primary">
                <FaRocket className="me-2" />
                Join the Fleet
              </Button>
            </Link>
            <a
              href="https://robertsspaceindustries.com/en/orgs/NULLSIGHT"
              target="_blank"
              rel="noreferrer"
            >
              <Button className="btn-ns-secondary">
                <FaStar className="me-2" />
                RSI Org Page
              </Button>
            </a>
          </div>
        </Container>

        {/* Floating grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            zIndex: -1,
          }}
        />
      </section>

      {/* Stats */}
      <section style={{ background: 'rgba(13,17,23,0.9)', borderTop: '1px solid var(--ns-border)', borderBottom: '1px solid var(--ns-border)' }}>
        <Container>
          <Row className="py-4">
            {STATS.map((s) => (
              <Col key={s.label} xs={6} md={3} className="py-3">
                <div className="ns-stat">
                  <div className="ns-stat-value">{s.value}</div>
                  <div className="ns-stat-label">{s.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section className="ns-section">
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: 'var(--ns-font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Fleet <span style={{ color: 'var(--ns-cyan)' }}>Capabilities</span>
            </h2>
            <div className="ns-divider" />
            <p style={{ color: 'var(--ns-text-dim)', maxWidth: 600, margin: '0 auto' }}>
              NULLSIGHT operates across all major disciplines in the Star Citizen universe.
              Whether you're a seasoned veteran or a new recruit, there's a place for you.
            </p>
          </div>
          <Row className="g-4">
            {FEATURES.map((f) => (
              <Col key={f.title} md={6} lg={4}>
                <div className="ns-card h-100">
                  <div className="ns-card-body">
                    <div style={{ color: 'var(--ns-cyan)', marginBottom: '1rem' }}>
                      {f.icon}
                    </div>
                    <h5
                      style={{
                        fontFamily: 'var(--ns-font-display)',
                        letterSpacing: '0.05em',
                        marginBottom: '0.75rem',
                        color: 'var(--ns-text-bright)',
                      }}
                    >
                      {f.title}
                    </h5>
                    <p style={{ color: 'var(--ns-text-dim)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 0 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About section */}
      <section
        style={{
          background: 'rgba(13,17,23,0.85)',
          borderTop: '1px solid var(--ns-border)',
          borderBottom: '1px solid var(--ns-border)',
        }}
        className="ns-section"
      >
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <span className="ns-badge ns-badge-cyan mb-3 d-inline-block">About Us</span>
              <h2
                style={{
                  fontFamily: 'var(--ns-font-display)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                Who is <span style={{ color: 'var(--ns-cyan)' }}>NULLSIGHT</span>?
              </h2>
              <p style={{ color: 'var(--ns-text-dim)', lineHeight: 1.8, marginBottom: '1rem' }}>
                NULLSIGHT is an interstellar organization dedicated to excellence across all
                aspects of the Star Citizen universe. Founded on the principles of teamwork,
                discipline, and strategic superiority, we operate as a cohesive unit in
                pursuit of our collective goals.
              </p>
              <p style={{ color: 'var(--ns-text-dim)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Our members range from solo pilots to multi-crew veterans. We welcome all
                playstyles and provide the tools, training, and camaraderie needed to thrive
                in the persistent universe.
              </p>
              <Link to="/register">
                <Button className="btn-ns-primary">
                  Apply for Membership
                </Button>
              </Link>
            </Col>
            <Col lg={6}>
              <div className="ns-card ns-scan-line">
                <div className="ns-card-header">Fleet Divisions</div>
                <div className="ns-card-body">
                  {[
                    { name: 'VANGUARD', color: 'var(--ns-red)', desc: 'Combat & Security' },
                    { name: 'MERIDIAN', color: 'var(--ns-gold)', desc: 'Trade & Logistics' },
                    { name: 'HORIZON', color: 'var(--ns-cyan)', desc: 'Exploration & Science' },
                  ].map((d) => (
                    <div
                      key={d.name}
                      className="d-flex align-items-center gap-3 mb-3 pb-3"
                      style={{ borderBottom: '1px solid var(--ns-border)' }}
                    >
                      <div
                        style={{
                          width: 4,
                          height: 40,
                          background: d.color,
                          flexShrink: 0,
                          borderRadius: 2,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--ns-font-display)',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            color: d.color,
                          }}
                        >
                          {d.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--ns-text-dim)' }}>
                          {d.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: 4, height: 40, background: 'var(--ns-border)', flexShrink: 0, borderRadius: 2 }} />
                    <div style={{ color: 'var(--ns-text-dim)', fontSize: '0.85rem' }}>
                      More divisions forming...
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Subscribe */}
      <section className="ns-section">
        <Container>
          <div className="text-center mb-5">
            <h2
              style={{
                fontFamily: 'var(--ns-font-display)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Stay <span style={{ color: 'var(--ns-cyan)' }}>Connected</span>
            </h2>
            <div className="ns-divider" />
            <p style={{ color: 'var(--ns-text-dim)', maxWidth: 500, margin: '0 auto 2rem' }}>
              Subscribe to receive fleet communications, operation schedules,
              and organization news directly to your inbox.
            </p>
            <div className="d-flex justify-content-center">
              <EmailSubscribe />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
