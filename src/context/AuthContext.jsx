import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preApprovedStudents, setPreApprovedStudents] = useState([]);

  // Load user and preapproved from local storage on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    const approved = JSON.parse(localStorage.getItem('preApprovedStudents')) || [];
    setPreApprovedStudents(approved);
    
    let adminsList = JSON.parse(localStorage.getItem('admins'));
    if (!adminsList || adminsList.length === 0) {
      adminsList = [
        { name: 'Transport Admin', email: 'transport@admin.com', phone: '123', category: 'Transport', password: 'admin' },
        { name: 'Hostel Admin', email: 'hostel@admin.com', phone: '123', category: 'Hostel', password: 'admin' },
        { name: 'Exam Admin', email: 'exam@admin.com', phone: '123', category: 'Exam', password: 'admin' },
        { name: 'Faculty Admin', email: 'faculty@admin.com', phone: '123', category: 'Faculty', password: 'admin' },
        { name: 'Electricity Admin', email: 'electricity@admin.com', phone: '123', category: 'Electricity', password: 'admin' },
        { name: 'General Admin', email: 'others@admin.com', phone: '123', category: 'Others', password: 'admin' }
      ];
      localStorage.setItem('admins', JSON.stringify(adminsList));
    }
    
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storageKey = role === 'admin' ? 'admins' : 'students';
        const users = JSON.parse(localStorage.getItem(storageKey)) || [];
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const loggedUser = { ...user, role };
          setCurrentUser(loggedUser);
          localStorage.setItem('currentUser', JSON.stringify(loggedUser));
          resolve(loggedUser);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 600);
    });
  };

  const addPreApprovedStudent = (studentRef) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const approved = JSON.parse(localStorage.getItem('preApprovedStudents')) || [];
        if (!approved.some(s => s.registerNumber === studentRef.registerNumber)) {
          approved.push(studentRef);
          localStorage.setItem('preApprovedStudents', JSON.stringify(approved));
          setPreApprovedStudents(approved);
        }
        resolve();
      }, 300);
    });
  };

  const removePreApprovedStudent = (regNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let approved = JSON.parse(localStorage.getItem('preApprovedStudents')) || [];
        approved = approved.filter(s => s.registerNumber !== regNumber);
        localStorage.setItem('preApprovedStudents', JSON.stringify(approved));
        setPreApprovedStudents(approved);
        resolve();
      }, 300);
    });
  };

  const registerStudent = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const approved = JSON.parse(localStorage.getItem('preApprovedStudents')) || [];
        const isApproved = approved.some(s => s.registerNumber === data.registerNumber && s.email === data.email);

        if (!isApproved) {
          reject(new Error('Registration Failed: Your Register Number & Email are not recognized by Administration. Ensure you are authorized.'));
          return;
        }

        const students = JSON.parse(localStorage.getItem('students')) || [];
        if (students.some(s => s.email === data.email || s.registerNumber === data.registerNumber)) {
          reject(new Error('Student with this Email or Register Number already exists.'));
          return;
        }
        students.push(data);
        localStorage.setItem('students', JSON.stringify(students));
        resolve(data);
      }, 600);
    });
  };

  const registerAdmin = (data, secretKey) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (secretKey !== 'ADMIN123') {
          reject(new Error('Invalid Admin Secret Key. Registration failed.'));
          return;
        }
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        if (admins.some(a => a.email === data.email)) {
          reject(new Error('Admin with this Email already exists.'));
          return;
        }
        admins.push(data);
        localStorage.setItem('admins', JSON.stringify(admins));
        resolve(data);
      }, 600);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    registerStudent,
    registerAdmin,
    logout,
    loading,
    preApprovedStudents,
    addPreApprovedStudent,
    removePreApprovedStudent
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
