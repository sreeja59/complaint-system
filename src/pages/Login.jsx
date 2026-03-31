import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User } from 'lucide-react';

const Login = () => {
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
      await login(email, password, 'student');
      navigate('/student');
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
      <div className="card auth-card animate-fade-in" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem' }}>
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center justify-center mb-2" style={{ background: 'var(--primary-color)', color: 'white', padding: '12px', borderRadius: '50%' }}>
            <User size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#1e293b' }}>Student Login</h2>
          <p style={{ color: 'var(--text-light)', marginTop: '4px' }}>Welcome back to the Complaint System</p>
        </div>

        {error && <div style={{ color: 'var(--danger-color)', background: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Student Email" 
              style={{ padding: '0.9rem', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              style={{ padding: '0.9rem', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', marginTop: '8px', justifyContent: 'center', fontSize: '1.1rem' }} disabled={loading}>
            {loading ? 'Signing in...' : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>

        <div className="flex flex-col items-center mt-6">
          <p style={{ fontSize: '0.95rem' }}>
            New Student? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Register here</Link>
          </p>
          <div style={{ marginTop: '1.5rem', width: '100%', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.95rem' }}>
              Are you an Admin? <Link to="/admin-login" style={{ color: 'var(--text-dark)', fontWeight: '600', textDecoration: 'underline' }}>Go to Admin Portal</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
