import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { FaRocket, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';

export default function AppNavbar() {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" fixed="top" className="ns-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaRocket className="me-2" style={{ color: 'var(--ns-cyan)' }} />
          NULLSIGHT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav">
          <FaBars style={{ color: 'var(--ns-text)' }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/fleet">Fleet</Nav.Link>
            {currentUser && (
              <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto align-items-center gap-2">
            {currentUser ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  className="btn-ns-primary d-flex align-items-center gap-2"
                  style={{ border: 'none', padding: '0.4rem 0.9rem' }}
                  id="user-dropdown"
                >
                  <FaUser size={12} />
                  <span>{userProfile?.scHandle || currentUser.displayName || 'Pilot'}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    background: 'var(--ns-dark-2)',
                    border: '1px solid var(--ns-border)',
                    minWidth: '180px',
                  }}
                >
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    style={{ color: 'var(--ns-text)', fontFamily: 'var(--ns-font-display)' }}
                  >
                    <FaUser size={12} className="me-2" />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider style={{ borderColor: 'var(--ns-border)' }} />
                  <Dropdown.Item
                    onClick={handleLogout}
                    style={{ color: 'var(--ns-red)', fontFamily: 'var(--ns-font-display)' }}
                  >
                    <FaSignOutAlt size={12} className="me-2" />
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button
                  as={Link as any}
                  to="/login"
                  variant="outline"
                  className="btn-ns-primary"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button
                  as={Link as any}
                  to="/register"
                  variant="outline"
                  className="btn-ns-secondary"
                  size="sm"
                >
                  Join Fleet
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
