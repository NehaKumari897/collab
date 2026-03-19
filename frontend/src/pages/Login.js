import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', form);
      login(data.user, data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}></h2>
        <p style={styles.subtitle}>Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.link}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.linkText}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
   minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: '#f0f4f8',
  },
  card: {
    background: 'white', padding: '40px',
    borderRadius: '16px', width: '100%',
    maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },
  title: { margin: '0 0 8px', fontSize: '28px', color: '#1a1a2e' },
  subtitle: { margin: '0 0 28px', color: '#666', fontSize: '14px' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '600', color: '#333', fontSize: '14px' },
  input: {
    width: '100%', padding: '12px 16px', border: '2px solid #e8e8e8',
    borderRadius: '8px', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', transition: 'border 0.2s',
  },
  button: {
    width: '100%', padding: '14px', background: '#4f46e5',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px',
  },
  link: { textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' },
  linkText: { color: '#667eea', fontWeight: '600', textDecoration: 'none' },
};

export default Login;