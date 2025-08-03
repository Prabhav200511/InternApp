import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero min-h-[80vh] bg-base-100 rounded-box shadow-xl">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Intern & Volunteer Hub</h1>
          <p className="py-6">
            Your journey starts here. Join our community by registering as an intern or volunteer. 
            View your application status and get ready to make an impact.
          </p>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;