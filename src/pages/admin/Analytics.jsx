import React from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Activity, CheckCircle, Clock } from 'lucide-react';

const Analytics = () => {
  const { currentUser } = useAuth();
  const { getAnalytics } = useComplaints();

  const stats = getAnalytics(currentUser.category);

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Analytics & Reports</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ background: '#eff6ff', color: '#3b82f6', padding: '1rem', borderRadius: '50%' }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Total Complaints</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.total}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ background: '#fef3c7', color: '#d97706', padding: '1rem', borderRadius: '50%' }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Pending</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.pending}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ background: '#d1fae5', color: '#059669', padding: '1rem', borderRadius: '50%' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Resolved</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.resolved}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart size={20} color="var(--primary-color)" /> Complaints by Category
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(stats.categoryCounts).map(([cat, count]) => {
            const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
            return (
              <div key={cat}>
                <div className="flex justify-between" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <span>{cat}</span>
                  <span style={{ fontWeight: 600 }}>{count}</span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'var(--border-color)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, backgroundColor: 'var(--primary-color)', height: '100%', transition: 'width 1s ease-in-out' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
