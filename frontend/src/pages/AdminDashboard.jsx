import { useState, useEffect } from 'react';
import api from '../axios.js';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      try {
        const { data } = await api.get('/submissions');
        setSubmissions(data);
      } catch (err) {
        setError('Failed to fetch submissions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSubmissions();
  }, []);

  if (loading) return <div className="text-center p-10"><span className="loading loading-dots loading-lg"></span></div>;
  if (error) return <div role="alert" className="alert alert-error">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard: Applications</h1>
      {submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub._id} tabIndex={0} className="card bg-base-100 shadow-lg collapse collapse-arrow">
              <div className="collapse-title text-xl font-medium grid grid-cols-3">
                <span>{sub.fullName}</span>
                <span className="text-sm text-gray-500 justify-self-center">{sub.email}</span>
                <span className="text-sm text-gray-500 justify-self-end">{new Date(sub.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="collapse-content bg-base-200">
                <div className="p-4 space-y-2">
                  <p><strong>Phone:</strong> {sub.phoneNumber}</p>
                  <p><strong>Education:</strong> {sub.educationLevel} - {sub.courseAndCollege}</p>
                  <p><strong>Skills:</strong> {(sub.skills || []).join(', ')}</p>
                  <p><strong>Motivation:</strong> {sub.motivation}</p>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between items-center">
                    <div>
                      {sub.linkedIn && <a href={sub.linkedIn} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-info mr-2">LinkedIn</a>}
                      {sub.github && <a href={sub.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-neutral">GitHub</a>}
                    </div>
                    <a href={sub.resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                      Download Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No applications have been submitted yet.</p>
      )}
    </div>
  );
};

export default AdminDashboard;