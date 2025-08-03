// frontend/src/pages/SignupPage.jsx

import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Or your useAuth hook

const SignupPage = () => {
  const { signup } = useContext(AuthContext); // Or useAuth()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isAdminSignup, setIsAdminSignup] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine form data with admin code if necessary
    const submissionData = {
      ...formData,
      ...(isAdminSignup && { adminCode }), // Only add adminCode if the checkbox is ticked
    };

    console.log("Data being sent to backend:", submissionData); 
    
    signup(submissionData);
  };

  return (
    <div className="hero min-h-fit bg-base-200 py-10">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title">Create an Account</h2>
          
          {/* Standard Fields */}
          <div className="form-control">
            <label className="label"><span className="label-text">Full Name</span></label>
            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required onChange={handleChange} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" placeholder="email@example.com" className="input input-bordered" required onChange={handleChange} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" placeholder="password" className="input input-bordered" required onChange={handleChange} />
          </div>

          {/* Admin Signup Section */}
          <div className="form-control mt-4">
            <label className="label cursor-pointer justify-start gap-4">
              <input type="checkbox" className="checkbox checkbox-primary" checked={isAdminSignup} onChange={(e) => setIsAdminSignup(e.target.checked)} />
              <span className="label-text">Sign up as an Admin</span>
            </label>
          </div>
          
          {/* Conditional Admin Code Field */}
          {isAdminSignup && (
            <div className="form-control transition-all duration-300">
              <label className="label"><span className="label-text">Admin Secret Code</span></label>
              <input type="password" name="adminCode" placeholder="Enter secret code" className="input input-bordered" required={isAdminSignup} value={adminCode} onChange={(e) => setAdminCode(e.target.value)} />
            </div>
          )}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;