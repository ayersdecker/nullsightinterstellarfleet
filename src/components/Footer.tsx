import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRocket, FaDiscord, FaTwitch, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ns-footer">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <div
              className="d-flex align-items-center gap-2 mb-3"
              style={{ fontFamily: 'var(--ns-font-display)', color: 'var(--ns-cyan)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.1em' }}
            >
              <FaRocket />
              NULLSIGHT
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
              An elite interstellar fleet operating in the Star Citizen universe.
              We specialize in exploration, trade, combat, and research operations.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://robertsspaceindustries.com/en/orgs/NULLSIGHT" target="_blank" rel="noreferrer"
                style={{ color: 'var(--ns-text-dim)' }} title="RSI Org Page">
                <FaRocket size={18} />
              </a>
              <a href="#discord" style={{ color: 'var(--ns-text-dim)' }} title="Discord">
                <FaDiscord size={18} />
              </a>
              <a href="#twitch" style={{ color: 'var(--ns-text-dim)' }} title="Twitch">
                <FaTwitch size={18} />
              </a>
              <a href="#youtube" style={{ color: 'var(--ns-text-dim)' }} title="YouTube">
                <FaYoutube size={18} />
              </a>
            </div>
          </Col>

          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6
              style={{
                fontFamily: 'var(--ns-font-display)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ns-cyan)',
                fontSize: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              Navigation
            </h6>
            <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
              {[['/', 'Home'], ['/fleet', 'Fleet'], ['/dashboard', 'Dashboard'], ['/profile', 'Profile']].map(
                ([path, label]) => (
                  <li key={path} className="mb-2">
                    <Link to={path} style={{ color: 'var(--ns-text-dim)' }}>{label}</Link>
                  </li>
                )
              )}
            </ul>
          </Col>

          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6
              style={{
                fontFamily: 'var(--ns-font-display)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ns-cyan)',
                fontSize: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              Account
            </h6>
            <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
              {[['/login', 'Sign In'], ['/register', 'Join Fleet']].map(([path, label]) => (
                <li key={path} className="mb-2">
                  <Link to={path} style={{ color: 'var(--ns-text-dim)' }}>{label}</Link>
                </li>
              ))}
              <li className="mb-2">
                <a
                  href="https://robertsspaceindustries.com/en/orgs/NULLSIGHT"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--ns-text-dim)' }}
                >
                  RSI Org Page
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6
              style={{
                fontFamily: 'var(--ns-font-display)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ns-cyan)',
                fontSize: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              Star Citizen Universe
            </h6>
            <p style={{ fontSize: '0.8rem', color: 'var(--ns-text-dim)', lineHeight: 1.7 }}>
              This site is not affiliated with Cloud Imperium Games or Roberts Space Industries.
              Star Citizen® is a registered trademark of Cloud Imperium Games Corp.
            </p>
            <a
              href="https://robertsspaceindustries.com"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.8rem', color: 'var(--ns-cyan-dim)' }}
            >
              robertsspaceindustries.com ↗
            </a>
          </Col>
        </Row>

        <div
          style={{
            borderTop: '1px solid var(--ns-border)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--ns-text-dim)' }}>
            © {year} NULLSIGHT Interstellar Fleet. All rights reserved.
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--ns-font-display)',
              letterSpacing: '0.15em',
              color: 'var(--ns-text-dim)',
            }}
          >
            PERSISTENCE THROUGH EXCELLENCE
          </span>
        </div>
      </Container>
    </footer>
  );
}
