import React from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { getComplaintsByStudent } = useComplaints();

  const myComplaints = getComplaintsByStudent(currentUser.registerNumber).sort((a,b) => new Date(b.datePushed) - new Date(a.datePushed));

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 700 }}>My Complaints Activity</h1>
      
      {myComplaints.length === 0 ? (
        <div className="card text-center" style={{ padding: '4rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.5 }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <p style={{ fontSize: '1.1rem' }}>You haven't registered any complaints.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {myComplaints.map(comp => (
            <div key={comp.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="flex justify-between items-start mb-3">
                <span style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '1.1rem' }}>{comp.category}</span>
                <span className={`badge badge-${comp.status.toLowerCase()}`}>{comp.status}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>{comp.description}</p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                  <strong>Registered on:</strong> {new Date(comp.datePushed).toLocaleString()}
                </div>
                {comp.resolvedAt && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--success-color)' }}>
                    <strong>Resolved on:</strong> {new Date(comp.resolvedAt).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
