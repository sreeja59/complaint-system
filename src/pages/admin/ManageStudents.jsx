import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Plus, Trash2 } from 'lucide-react';

const ManageStudents = () => {
  const { preApprovedStudents, addPreApprovedStudent, removePreApprovedStudent, currentUser } = useAuth();
  const [regNum, setRegNum] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // If this page should only be fully usable by a specific role, we can intercept it,
  // but for now any admin can whitelist.

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!regNum || !email) return;
    setLoading(true);
    await addPreApprovedStudent({ registerNumber: regNum, email });
    setRegNum('');
    setEmail('');
    setLoading(false);
  };

  const handleRemove = async (r) => {
    if(window.confirm('Remove this student from approved list?')) {
       await removePreApprovedStudent(r);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Manage Student Access</h1>
      
      <div className="card mb-6" style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} color="var(--primary-color)" /> Pre-Approve Student
        </h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Database validation restriction: Students can <strong>only</strong> create an account if their Register Number and Email matches the data you insert below.
        </p>

        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label>Register Number</label>
            <input type="text" required value={regNum} onChange={(e) => setRegNum(e.target.value.toUpperCase())} placeholder="e.g. 19ABC001" />
          </div>
          <div>
            <label>Student Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: '42px', padding: '0 1.5rem' }}>
            {loading ? 'Adding...' : <><Plus size={18} /> Add Record</>}
          </button>
        </form>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Authorized Students Whitelist</h2>
        
        {!preApprovedStudents || preApprovedStudents.length === 0 ? (
          <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No students have been pre-approved yet. Registration is currently blocked for everyone.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Register Number</th>
                  <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Email Address</th>
                  <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600, width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {preApprovedStudents.map((s, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{s.registerNumber}</td>
                    <td style={{ padding: '1rem' }}>{s.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleRemove(s.registerNumber)} style={{ color: 'var(--danger-color)', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fee2e2' }} title="Revoke Access">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
