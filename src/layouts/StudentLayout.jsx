import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FileText, User, LogOut } from 'lucide-react';

const StudentLayout = () => {
  const { currentUser, logout, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex items-center justify-center p-4">Loading...</div>;
  
  if (!currentUser || currentUser.role !== 'student') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <div className="flex" style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--surface-color)', padding: '2rem 1rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div className="mb-4 px-2">
          <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-color)', fontWeight: 700 }}>Student Portal</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '4px' }}>Welcome, {currentUser.name}</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1 mt-4">
          <Link to="/student/dashboard" className={`btn ${isActive('/student/dashboard')}`} style={{ justifyContent: 'flex-start', background: isActive('/student/dashboard') ? '#f1f5f9' : 'transparent', color: isActive('/student/dashboard') ? 'var(--primary-color)' : 'var(--text-dark)' }}>
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link to="/student/new-complaint" className={`btn ${isActive('/student/new-complaint')}`} style={{ justifyContent: 'flex-start', background: isActive('/student/new-complaint') ? '#f1f5f9' : 'transparent', color: isActive('/student/new-complaint') ? 'var(--primary-color)' : 'var(--text-dark)' }}>
            <FileText size={18} /> Register Complaint
          </Link>
          <Link to="/student/profile" className={`btn ${isActive('/student/profile')}`} style={{ justifyContent: 'flex-start', background: isActive('/student/profile') ? '#f1f5f9' : 'transparent', color: isActive('/student/profile') ? 'var(--primary-color)' : 'var(--text-dark)' }}>
            <User size={18} /> My Profile
          </Link>
        </nav>

        <button onClick={logout} className="btn" style={{ justifyContent: 'flex-start', color: 'var(--danger-color)', marginTop: 'auto' }}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
