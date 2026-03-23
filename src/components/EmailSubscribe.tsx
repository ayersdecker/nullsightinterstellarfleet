import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaBell } from 'react-icons/fa';

export default function EmailSubscribe() {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = currentUser?.email || email;
    if (!targetEmail) return;

    setStatus('loading');
    try {
      // Check if already subscribed
      const q = query(collection(db, 'subscribers'), where('email', '==', targetEmail));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setStatus('error');
        setMessage('This email is already subscribed.');
        return;
      }

      await addDoc(collection(db, 'subscribers'), {
        email: targetEmail,
        scHandle: userProfile?.scHandle || null,
        subscribedAt: new Date().toISOString(),
      });

      if (currentUser) {
        await updateUserProfile({ subscribed: true });
      }

      setStatus('success');
      setMessage('You\'re subscribed! You\'ll receive fleet updates and news.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Subscription failed. Please try again.');
    }
  };

  if (userProfile?.subscribed) {
    return (
      <div className="ns-panel d-flex align-items-center gap-3">
        <FaBell style={{ color: 'var(--ns-cyan)', flexShrink: 0 }} size={20} />
        <div>
          <div style={{ fontFamily: 'var(--ns-font-display)', color: 'var(--ns-cyan)', fontWeight: 600 }}>
            Subscribed
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--ns-text-dim)' }}>
            You're receiving fleet communications.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {status === 'success' && (
        <div className="ns-alert ns-alert-success mb-3 p-3 rounded">
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className="ns-alert ns-alert-danger mb-3 p-3 rounded">
          {message}
        </div>
      )}
      <Form onSubmit={handleSubscribe} className="d-flex gap-2 flex-wrap">
        {!currentUser && (
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="pilot@example.com"
            required
            className="ns-form-control"
            style={{ maxWidth: '280px' }}
          />
        )}
        <Button
          type="submit"
          className="btn-ns-primary d-flex align-items-center gap-2"
          disabled={status === 'loading'}
        >
          <FaEnvelope size={14} />
          {status === 'loading' ? 'Subscribing...' : 'Subscribe to Fleet Comms'}
        </Button>
      </Form>
      <div style={{ fontSize: '0.75rem', color: 'var(--ns-text-dim)', marginTop: '0.5rem' }}>
        Receive fleet news, ops scheduling, and org updates.
      </div>
    </div>
  );
}
