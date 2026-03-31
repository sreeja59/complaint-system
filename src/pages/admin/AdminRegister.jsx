import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', category: 'Transport', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const adminData = {
        name: formData.name,
        email: formData.email,
        phone: '', // Optional per new mockup
        category: formData.category,
        password: formData.password
      };
      
      // We pass the secret 'ADMIN123' automatically to simulate successful registration based on the simplistic mock.
      await registerAdmin(adminData, 'ADMIN123');
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/admin-login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ padding: '40px 20px' }}>
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
      <div className="card auth-card animate-fade-in" style={{ maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: '2.5rem', fontSize: '1.8rem', fontWeight: 600 }}>Admin Register</h2>

        {error && <div style={{ color: '#ef4444', background: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: '#10b981', background: '#d1fae5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Admin Name" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', color: '#4b5563' }} />
          </div>
          <div>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Admin Email" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', color: '#4b5563' }} />
          </div>
          <div>
            <select name="category" required value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', color: '#4b5563', background: '#fff' }}>
              <option value="Transport">Transport</option>
              <option value="Hostel">Hostel</option>
              <option value="Exam">Exam</option>
              <option value="Faculty">Faculty</option>
              <option value="Electricity">Electricity</option>
              <option value="Others">Others</option>
              <option value="All">Super Admin (All Categories)</option>
            </select>
          </div>
          <div>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="Password" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', color: '#4b5563' }} />
          </div>
          <div>
            <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', color: '#4b5563' }} />
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '0.9rem', marginTop: '1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.3s' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '1.05rem' }}>
          <span style={{ color: '#111' }}>Already Admin? </span>
          <Link to="/admin-login" style={{ color: '#3b82f6', textDecoration: 'none' }}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
