import { useState } from 'react';
import api from '../axios.js';
import { useAuth } from '../context/AuthContext';

const InternDashboard = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phoneNumber: '',
    educationLevel: 'Undergraduate',
    courseAndCollege: '',
    skills: '',
    linkedIn: '',
    github: '',
    motivation: '',
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setFeedback({ message: 'Please upload your resume.', type: 'error' });
      return;
    }
    setSubmitting(true);
    setFeedback({ message: '', type: '' });

    const submissionData = new FormData();
    // Append all form fields to the FormData object
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
    submissionData.append('resume', resume); // Append the file

    try {
      await api.post('/submissions', submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFeedback({ message: 'Application submitted successfully!', type: 'success' });
      e.target.reset(); // Reset the form fields
    } catch (error) {
      setFeedback({ message: 'Submission failed. Please try again.', type: 'error' });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <h2 className="card-title text-3xl">Internship Application Form</h2>
        <p className="mb-6">Welcome, {user?.name}! Please fill out the details below.</p>

        {/* --- Form Sections --- */}
        <div className="divider">Personal Info</div>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name (required)" className="input input-bordered" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email (required)" className="input input-bordered" required />
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number (required)" className="input input-bordered" required />
        </div>

        <div className="divider">Education</div>
        <div className="grid md:grid-cols-2 gap-4">
            <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className="select select-bordered">
                <option>Undergraduate</option>
                <option>Diploma</option>
                <option>Postgraduate</option>
                <option>PhD</option>
            </select>
          <input name="courseAndCollege" value={formData.courseAndCollege} onChange={handleChange} placeholder="Course & College Name" className="input input-bordered" />
        </div>

        <div className="divider">Skills & Profile</div>
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Key Skills (comma-separated, e.g., React, Node.js)" className="input input-bordered" />
        <div className="form-control">
            <label className="label"><span className="label-text">Resume (PDF only)</span></label>
            <input type="file" name="resume" onChange={handleFileChange} className="file-input file-input-bordered" accept=".pdf" required />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="linkedIn" value={formData.linkedIn} onChange={handleChange} placeholder="LinkedIn Profile URL" className="input input-bordered" />
          <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Profile URL" className="input input-bordered" />
        </div>

        <div className="divider">Motivation</div>
        <textarea name="motivation" value={formData.motivation} onChange={handleChange} className="textarea textarea-bordered h-24" placeholder="Why do you want this internship?"></textarea>

        {feedback.message && (
          <div role="alert" className={`alert mt-4 ${feedback.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="card-actions justify-end mt-6">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? <span className="loading loading-spinner"></span> : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternDashboard;