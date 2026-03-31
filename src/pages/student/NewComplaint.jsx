import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { Send } from 'lucide-react';

const NewComplaint = () => {
  const [formData, setFormData] = useState({ category: 'Transport', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addComplaint } = useComplaints();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      return setError('Description cannot be empty');
    }
    
    setLoading(true);
    try {
      await addComplaint({
        registerNumber: currentUser.registerNumber,
        category: formData.category,
        description: formData.description,
        studentName: currentUser.name
      });
      navigate('/student/dashboard');
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Register New Complaint</h1>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        {error && <div style={{ color: 'var(--danger-color)', background: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
          <div>
            <label>Complaint Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="Transport">Transport (Bus timings, routes, delays)</option>
              <option value="Hostel">Hostel (Room maintenance, water, mess)</option>
              <option value="Exam">Exam (Hall tickets, results, schedule)</option>
              <option value="Faculty">Faculty (Teaching, subject doubts)</option>
              <option value="Electricity">Electricity (Power failure, lights)</option>
              <option value="Others">Others (General complaints)</option>
            </select>
            <p style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>Select the most appropriate category so it reaches the right authority.</p>
          </div>

          <div>
            <label>Detailed Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="6" 
              placeholder="Please describe your issue in detail..."
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Submitting...' : <><Send size={18} /> Submit Complaint</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewComplaint;
