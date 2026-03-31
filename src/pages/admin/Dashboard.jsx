import React from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { getComplaintsByCategory, updateComplaintStatus } = useComplaints();

  // "All" returns all complaints globally for full admin
  const relevantComplaints = getComplaintsByCategory(currentUser.category).sort((a,b) => new Date(b.datePushed) - new Date(a.datePushed));

  const handleResolve = async (id) => {
    if (window.confirm('Mark this complaint as resolved?')) {
      await updateComplaintStatus(id, 'Resolved');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Manage Complaints ({currentUser.category})</h1>
      
      {relevantComplaints.length === 0 ? (
        <div className="card text-center" style={{ padding: '4rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '1.1rem' }}>No complaints found for your department.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {relevantComplaints.map(comp => (
            <div key={comp.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '1.1rem' }}>{comp.category}</span>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '4px' }}>
                    Student: {comp.studentName} ({comp.registerNumber})
                  </div>
                </div>
                <span className={`badge badge-${comp.status.toLowerCase()}`}>{comp.status}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>{comp.description}</p>
              
              <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>Posted: {new Date(comp.datePushed).toLocaleString()}</span>
                  {comp.resolvedAt && <span style={{color: 'var(--success-color)'}}>Resolved: {new Date(comp.resolvedAt).toLocaleString()}</span>}
                </div>
                {comp.status === 'Pending' && (
                  <button onClick={() => handleResolve(comp.id)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    <CheckCircle size={16} /> Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
