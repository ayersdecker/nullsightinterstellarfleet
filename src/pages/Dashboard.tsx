import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import {
  FaRocket, FaUsers, FaShieldAlt, FaChartLine, FaBell,
  FaCalendarAlt, FaNewspaper, FaStar
} from 'react-icons/fa';
import EmailSubscribe from '../components/EmailSubscribe';

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Fleet Operations Resumed',
    body: 'With the latest patch, NULLSIGHT operations are back in full swing. Check the schedule for upcoming runs.',
    date: '2954.12.01',
    tag: 'Operations',
    tagColor: 'var(--ns-cyan)',
  },
  {
    id: 2,
    title: 'New Ships Added to Registry',
    body: 'Several members have acquired new vessels. Update your fleet profile to reflect your hangar.',
    date: '2954.11.28',
    tag: 'Fleet',
    tagColor: 'var(--ns-gold)',
  },
  {
    id: 3,
    title: 'VANGUARD Division Recruiting',
    body: 'The combat division is looking for skilled pilots. Apply through the Fleet Management page.',
    date: '2954.11.20',
    tag: 'Recruitment',
    tagColor: 'var(--ns-red)',
  },
];

export default function Dashboard() {
  const { userProfile } = useAuth();
  const [memberCount, setMemberCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const snap = await getDocs(collection(db, 'users'));
        setMemberCount(snap.size);
      } catch {
        setMemberCount(null);
      }
    }
    fetchCount();
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="ns-page py-5">
      <Container>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-5">
          <div>
            <p style={{ color: 'var(--ns-text-dim)', fontFamily: 'var(--ns-font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
              {greeting()}, Pilot
            </p>
            <h1
              style={{
                fontFamily: 'var(--ns-font-display)',
                fontSize: '2rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}
            >
              {userProfile?.displayName || userProfile?.scHandle || 'Unknown Pilot'}
            </h1>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="ns-badge ns-badge-cyan">{userProfile?.rank || 'Recruit'}</span>
              {userProfile?.scHandle && (
                <span style={{ color: 'var(--ns-text-dim)', fontSize: '0.85rem' }}>
                  @{userProfile.scHandle}
                </span>
              )}
            </div>
          </div>
          <div className="ns-card p-3 text-center" style={{ minWidth: 120 }}>
            <FaStar style={{ color: 'var(--ns-gold)' }} size={20} className="mb-1" />
            <div style={{ fontFamily: 'var(--ns-font-display)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--ns-text-dim)', textTransform: 'uppercase' }}>
              Status
            </div>
            <div style={{ color: 'var(--ns-green)', fontFamily: 'var(--ns-font-display)', fontWeight: 600 }}>
              Active
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <Row className="g-3 mb-4">
          {[
            { icon: <FaUsers />, label: 'Fleet Members', value: memberCount !== null ? memberCount : '—', color: 'var(--ns-cyan)' },
            { icon: <FaShieldAlt />, label: 'Active Ops', value: '3', color: 'var(--ns-red)' },
            { icon: <FaRocket />, label: 'Your Ships', value: userProfile?.ships?.length || 0, color: 'var(--ns-gold)' },
            { icon: <FaChartLine />, label: 'Fleet Rank', value: '#1', color: 'var(--ns-green)' },
          ].map((s) => (
            <Col key={s.label} xs={6} lg={3}>
              <div className="ns-card p-3">
                <div className="d-flex align-items-center gap-2 mb-2" style={{ color: s.color }}>
                  {s.icon}
                  <span style={{ fontFamily: 'var(--ns-font-display)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ns-text-dim)' }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: s.color }}>
                  {s.value}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          {/* Announcements */}
          <Col lg={8}>
            <div className="ns-card h-100">
              <div className="ns-card-header d-flex align-items-center gap-2">
                <FaNewspaper size={14} />
                Fleet Announcements
              </div>
              <div className="ns-card-body p-0">
                {ANNOUNCEMENTS.map((a, i) => (
                  <div
                    key={a.id}
                    className="p-4"
                    style={{
                      borderBottom: i < ANNOUNCEMENTS.length - 1 ? '1px solid var(--ns-border)' : 'none',
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2 flex-wrap">
                      <h6
                        style={{
                          fontFamily: 'var(--ns-font-display)',
                          letterSpacing: '0.05em',
                          marginBottom: 0,
                          color: 'var(--ns-text-bright)',
                        }}
                      >
                        {a.title}
                      </h6>
                      <div className="d-flex gap-2 align-items-center">
                        <span
                          className="ns-badge"
                          style={{ color: a.tagColor, borderColor: a.tagColor, fontSize: '0.65rem' }}
                        >
                          {a.tag}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--ns-text-dim)', fontFamily: 'var(--ns-font-body)' }}>
                          {a.date}
                        </span>
                      </div>
                    </div>
                    <p style={{ color: 'var(--ns-text-dim)', fontSize: '0.875rem', marginBottom: 0, lineHeight: 1.7 }}>
                      {a.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Right panel */}
          <Col lg={4}>
            <div className="d-flex flex-column gap-3">
              {/* Quick links */}
              <div className="ns-card">
                <div className="ns-card-header d-flex align-items-center gap-2">
                  <FaRocket size={14} />
                  Quick Actions
                </div>
                <div className="ns-card-body p-0">
                  {[
                    { label: 'Fleet Management', href: '/fleet', icon: <FaUsers size={14} />, color: 'var(--ns-cyan)' },
                    { label: 'My Profile', href: '/profile', icon: <FaStar size={14} />, color: 'var(--ns-gold)' },
                    {
                      label: 'RSI Org Page',
                      href: 'https://robertsspaceindustries.com/en/orgs/NULLSIGHT',
                      icon: <FaShieldAlt size={14} />,
                      color: 'var(--ns-text-dim)',
                      external: true,
                    },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                      className="d-flex align-items-center gap-3 p-3"
                      style={{
                        color: 'var(--ns-text)',
                        borderBottom: '1px solid var(--ns-border)',
                        transition: 'background 0.2s',
                        textDecoration: 'none',
                        fontFamily: 'var(--ns-font-display)',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,212,255,0.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                    >
                      <span style={{ color: link.color }}>{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Subscribe */}
              <div className="ns-card">
                <div className="ns-card-header d-flex align-items-center gap-2">
                  <FaBell size={14} />
                  Fleet Comms
                </div>
                <div className="ns-card-body">
                  <EmailSubscribe />
                </div>
              </div>

              {/* Upcoming ops */}
              <div className="ns-card">
                <div className="ns-card-header d-flex align-items-center gap-2">
                  <FaCalendarAlt size={14} />
                  Upcoming Ops
                </div>
                <div className="ns-card-body">
                  {[
                    { name: 'Cargo Run — ArcCorp to Hurston', time: '2954.12.05 18:00 UTC', div: 'MERIDIAN' },
                    { name: 'Bounty Sweep — Aaron Halo', time: '2954.12.07 20:00 UTC', div: 'VANGUARD' },
                    { name: 'Jump Point Survey — Pyro', time: '2954.12.10 17:00 UTC', div: 'HORIZON' },
                  ].map((op) => (
                    <div
                      key={op.name}
                      className="mb-3 pb-3"
                      style={{ borderBottom: '1px solid var(--ns-border)' }}
                    >
                      <div style={{ fontFamily: 'var(--ns-font-display)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--ns-text-bright)', marginBottom: '0.2rem' }}>
                        {op.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ns-text-dim)', fontFamily: 'var(--ns-font-body)' }}>
                        {op.time}
                      </div>
                      <div
                        className="ns-badge mt-1"
                        style={{
                          color: op.div === 'VANGUARD' ? 'var(--ns-red)' : op.div === 'MERIDIAN' ? 'var(--ns-gold)' : 'var(--ns-cyan)',
                          borderColor: op.div === 'VANGUARD' ? 'var(--ns-red)' : op.div === 'MERIDIAN' ? 'var(--ns-gold)' : 'var(--ns-cyan)',
                          fontSize: '0.6rem',
                        }}
                      >
                        {op.div}
                      </div>
                    </div>
                  ))}
                  <div style={{ fontSize: '0.75rem', color: 'var(--ns-text-dim)' }}>
                    All times in UTC. Join Discord for details.
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
