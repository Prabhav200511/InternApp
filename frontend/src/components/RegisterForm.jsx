import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { signup } = useContext(AuthContext);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    signup(formData); 
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label"><span className="label-text">Name</span></label>
          <input type="text" name="name" placeholder="Full Name" className="input input-bordered" required onChange={handleChange}/>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input type="email" name="email" placeholder="email@example.com" className="input input-bordered" required onChange={handleChange}/>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Password</span></label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required onChange={handleChange}/>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
        <p className="text-center text-sm mt-2">
          Already have an account? <Link to="/login" className="link link-primary">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;