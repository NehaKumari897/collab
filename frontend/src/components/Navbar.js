import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/dashboard" style={styles.logo}> CollabDocs</Link>
      <div style={styles.right}>
        {user && <span style={styles.name}>Hi, {user.name} </span>}
        <button style={styles.btn} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 32px', background: 'white',
    borderBottom: '2px solid #e8e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  logo: { fontSize: '22px', fontWeight: '800', color: '#667eea', textDecoration: 'none' },
  right: { display: 'flex', alignItems: 'center', gap: '16px' },
  name: { color: '#475569', fontSize: '14px', fontWeight: '500' },
  btn: {
    padding: '8px 18px', background: '#fee2e2', color: '#ef4444',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
  },
};

export default Navbar;