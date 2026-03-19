import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDocTitle, setNewDocTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data } = await API.get('/documents');
      setDocuments(data);
    } catch {
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async () => {
    if (!newDocTitle.trim()) return toast.error('Enter a title!');
    try {
      const { data } = await API.post('/documents', { title: newDocTitle });
      toast.success('Document created!');
      setNewDocTitle('');
      navigate(`/editor/${data._id}`);
    } catch {
      toast.error('Failed to create document');
    }
  };

  const deleteDocument = async (id) => {
    try {
      await API.delete(`/documents/${id}`);
      setDocuments(documents.filter((d) => d._id !== id));
      toast.success('Document deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>My Documents</h2>

        {/* Create new doc */}
        <div style={styles.createBox}>
          <input
            style={styles.input}
            placeholder="Enter document title..."
            value={newDocTitle}
            onChange={(e) => setNewDocTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createDocument()}
          />
          <button style={styles.createBtn} onClick={createDocument}>
            + New Document
          </button>
        </div>

        {/* Documents list */}
        {loading ? (
          <p style={styles.loading}>Loading documents...</p>
        ) : documents.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: '48px' }}></p>
            <p>No documents yet. Create your first one!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {documents.map((doc) => (
              <div key={doc._id} style={styles.card}>
                <div
                  style={styles.cardContent}
                  onClick={() => navigate(`/editor/${doc._id}`)}
                >
                  <span style={styles.docIcon}></span>
                  <div>
                    <p style={styles.docTitle}>{doc.title}</p>
                    <p style={styles.docDate}>
                      {new Date(doc.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
  style={styles.shareBtn}
  onClick={() => {
    navigator.clipboard.writeText(
      `http://localhost:3000/editor/${doc._id}`
    );
    toast.success('Link copied! Share karo ');
  }}
>
  🔗
</button>
<button
  style={styles.deleteBtn}
  onClick={() => deleteDocument(doc._id)}
>
  delete
</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#f8fafc' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '32px 24px' },
  heading: { fontSize: '28px', fontWeight: '700', color: '#1a1a2e', marginBottom: '24px' },
  createBox: { display: 'flex', gap: '12px', marginBottom: '32px' },
  input: {
    flex: 1, padding: '12px 16px', border: '2px solid #e2e8f0',
    borderRadius: '8px', fontSize: '14px', outline: 'none',
  },
  createBtn: {
    padding: '12px 24px', background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
  },
  loading: { textAlign: 'center', color: '#94a3b8', marginTop: '60px' },
  empty: { textAlign: 'center', color: '#94a3b8', marginTop: '60px' },
  grid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  card: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'white', padding: '16px 20px', borderRadius: '12px',
    border: '1px solid #e2e8f0', cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  cardContent: { display: 'flex', alignItems: 'center', gap: '16px', flex: 1 },
  docIcon: { fontSize: '28px' },
  docTitle: { fontWeight: '600', color: '#1e293b', margin: 0 },
  docDate: { fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' },
  shareBtn: {
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: '18px', padding: '4px 8px',
},
  deleteBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '18px', padding: '4px 8px',
  },
};

export default Dashboard;