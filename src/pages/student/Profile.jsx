import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Hash, BookOpen } from 'lucide-react';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 700 }}>My Profile</h1>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="flex items-center gap-4 mb-6" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ background: 'var(--primary-color)', color: 'white', padding: '1rem', borderRadius: '50%', display: 'flex' }}>
            <User size={40} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{currentUser.name}</h2>
            <span className="badge badge-resolved mt-2" style={{ display: 'inline-block' }}>Student Account</span>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
           <div>
             <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Full Name</div>
             <div className="flex items-center gap-2 font-medium" style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>
               {currentUser.name}
             </div>
           </div>
           <div>
             <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Register Number</div>
             <div className="flex items-center gap-2 font-medium" style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>
               <Hash size={16} /> {currentUser.registerNumber}
             </div>
           </div>
           <div>
             <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Email Address</div>
             <div className="flex items-center gap-2 font-medium" style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>
               <Mail size={16} /> {currentUser.email}
             </div>
           </div>
           <div>
             <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Phone Number</div>
             <div className="flex items-center gap-2 font-medium" style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>
               {currentUser.phone}
             </div>
           </div>
           <div style={{ gridColumn: '1 / -1', padding: '1rem', background: 'var(--background-color)', borderRadius: '8px' }}>
             <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-hover)' }}><BookOpen size={18} /> Academic Details</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Department</div>
                  <div style={{ fontWeight: 500 }}>{currentUser.department}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Year</div>
                  <div style={{ fontWeight: 500 }}>{currentUser.year}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Section</div>
                  <div style={{ fontWeight: 500 }}>{currentUser.section}</div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
