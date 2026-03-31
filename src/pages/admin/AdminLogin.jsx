import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password, 'admin');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div style={{ textAlign: 'center', zIndex: 10, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1 style={{ fontFamily: '"Old Standard TT", serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', textShadow: '2px 4px 8px rgba(0,0,0,0.9)', margin: 0, fontWeight: 700, letterSpacing: '1px', lineHeight: 1.1 }}>
          Bapatla Engineering College :: Bapatla
        </h1>
        <h3 style={{ fontFamily: '"Old Standard TT", serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: '#ffd700', textShadow: '1px 2px 6px rgba(0,0,0,0.9)', margin: 0, fontWeight: 400, letterSpacing: '2px' }}>
          (Autonomous)
        </h3>
        <h2 style={{ fontFamily: 'inherit', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: '#f8fafc', textShadow: '1px 2px 5px rgba(0,0,0,0.9)', fontWeight: 600, margin: '8px 0 0 0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Online Complaint Management System
        </h2>
      </div>
      <div className="card auth-card animate-fade-in" style={{ maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: '2.5rem', fontSize: '1.8rem', fontWeight: 600 }}>Admin Login</h2>

        {error && <div style={{ color: '#ef4444', background: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', color: '#4b5563' }} />
          </div>
          <div>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', color: '#4b5563' }} />
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '0.9rem', marginTop: '1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.3s' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '1.05rem' }}>
          <span style={{ color: '#111' }}>New Admin? </span>
          <Link to="/admin-register" style={{ color: '#3b82f6', textDecoration: 'none' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
