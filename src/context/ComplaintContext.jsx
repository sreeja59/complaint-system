import { createContext, useState, useEffect, useContext } from 'react';

const ComplaintContext = createContext();

export const useComplaints = () => useContext(ComplaintContext);

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComplaints = () => {
    const data = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(data);
    setLoading(false);
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const addComplaint = (complaintData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComplaint = {
          ...complaintData,
          id: Date.now().toString(),
          status: 'Pending',
          datePushed: new Date().toISOString(),
          resolvedAt: null
        };
        const updated = [...complaints, newComplaint];
        setComplaints(updated);
        localStorage.setItem('complaints', JSON.stringify(updated));
        resolve(newComplaint);
      }, 500);
    });
  };

  const updateComplaintStatus = (id, newStatus) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updated = complaints.map(c => 
          c.id === id 
            ? { ...c, status: newStatus, resolvedAt: newStatus === 'Resolved' ? new Date().toISOString() : null } 
            : c
        );
        setComplaints(updated);
        localStorage.setItem('complaints', JSON.stringify(updated));
        resolve();
      }, 500);
    });
  };

  const getComplaintsByStudent = (registerNumber) => {
    return complaints.filter(c => c.registerNumber === registerNumber);
  };

  const getComplaintsByCategory = (category) => {
    if (category === 'All' || !category) return complaints;
    return complaints.filter(c => c.category === category);
  };

  const getAnalytics = (adminCategory) => {
    let relevant = getComplaintsByCategory(adminCategory);
    
    const categoryCounts = {
      Transport: relevant.filter(c => c.category === 'Transport').length,
      Hostel: relevant.filter(c => c.category === 'Hostel').length,
      Exam: relevant.filter(c => c.category === 'Exam').length,
      Faculty: relevant.filter(c => c.category === 'Faculty').length,
      Electricity: relevant.filter(c => c.category === 'Electricity').length,
      Others: relevant.filter(c => c.category === 'Others').length,
    };

    const total = relevant.length;
    const pending = relevant.filter(c => c.status === 'Pending').length;
    const resolved = relevant.filter(c => c.status === 'Resolved').length;

    return { total, pending, resolved, categoryCounts };
  };

  const value = {
    complaints,
    loading,
    addComplaint,
    updateComplaintStatus,
    getComplaintsByStudent,
    getComplaintsByCategory,
    getAnalytics,
    loadComplaints
  };

  return (
    <ComplaintContext.Provider value={value}>
      {children}
    </ComplaintContext.Provider>
  );
};
