import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', registerNumber: '', email: '', phone: '', department: '', year: '1st', section: 'A', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerStudent } = useAuth();
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
      await registerStudent(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
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
      <div className="card auth-card animate-fade-in" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center justify-center mb-2" style={{ background: 'var(--primary-color)', color: 'white', padding: '12px', borderRadius: '50%' }}>
            <UserPlus size={28} />
          </div>
          <h2>Student Registration</h2>
          <p style={{ color: 'var(--text-light)', marginTop: '4px' }}>Create an account to register complaints</p>
        </div>

        {error && <div style={{ color: 'var(--danger-color)', background: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        {success && <div style={{ color: 'var(--success-color)', background: '#d1fae5', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '16px' }}>
            <div>
              <label>Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
            </div>
            <div>
              <label>Register Number</label>
              <input type="text" name="registerNumber" required value={formData.registerNumber} onChange={handleChange} placeholder="19ABC001" />
            </div>
            
            <div>
              <label>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+1234567890" />
            </div>

            <div>
              <label>Department</label>
              <input type="text" name="department" required value={formData.department} onChange={handleChange} placeholder="Computer Science" />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label>Year</label>
                <select name="year" value={formData.year} onChange={handleChange}>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label>Section</label>
                <input type="text" name="section" required value={formData.section} onChange={handleChange} placeholder="A" />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label>Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="Create a password" />
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Registering...' : <><UserPlus size={18} /> Complete Registration</>}
          </button>
        </form>

        <div className="flex flex-col items-center mt-4">
          <p style={{ fontSize: '0.875rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Sign in here</Link>
          </p>
          <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
            Looking for Admin Portal? <Link to="/admin-login" style={{ color: 'var(--text-dark)', fontWeight: '600', textDecoration: 'underline' }}>Admin Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
