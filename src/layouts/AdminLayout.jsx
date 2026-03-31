import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, PieChart, ShieldCheck, LogOut, Users } from 'lucide-react';

const AdminLayout = () => {
  const { currentUser, logout, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex items-center justify-center p-4">Loading...</div>;
  
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <div className="flex" style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--surface-color)', padding: '2rem 1rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div className="mb-4 px-2">
          <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-color)', fontWeight: 700 }}>Admin Portal</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '4px' }}>{currentUser.name}<br/><span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Dept: {currentUser.category}</span></p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1 mt-4">
          <Link to="/admin/dashboard" className={`btn ${isActive('/admin/dashboard')}`} style={{ justifyContent: 'flex-start', background: isActive('/admin/dashboard') ? '#f1f5f9' : 'transparent', color: isActive('/admin/dashboard') ? 'var(--primary-color)' : 'var(--text-dark)' }}>
            <LayoutDashboard size={18} /> Complaints
          </Link>
          <Link to="/admin/analytics" className={`btn ${isActive('/admin/analytics')}`} style={{ justifyContent: 'flex-start', background: isActive('/admin/analytics') ? '#f1f5f9' : 'transparent', color: isActive('/admin/analytics') ? 'var(--primary-color)' : 'var(--text-dark)' }}>
            <PieChart size={18} /> Analytics & Reports
          </Link>
          <Link to="/admin/students" className={`btn ${isActive('/admin/students')}`} style={{ justifyContent: 'flex-start', background: isActive('/admin/students') ? '#f1f5f9' : 'transparent', color: isActive('/admin/students') ? 'var(--primary-color)' : 'var(--text-dark)' }}>
            <Users size={18} /> Manage Students
          </Link>
        </nav>

        <button onClick={logout} className="btn" style={{ justifyContent: 'flex-start', color: 'var(--danger-color)', marginTop: 'auto' }}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
