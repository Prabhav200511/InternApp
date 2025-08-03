import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="hero min-h-fit bg-base-200 py-12">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title">Login</h2>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;