import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A wrapper component that checks for an authenticated user.
 * If the user is not logged in, it redirects them to the /login page.
 * Otherwise, it renders the child components.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If the authentication state is still loading, show a temporary message
  // to prevent a flicker or premature redirect.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If loading is finished and there is no user, redirect to the login page.
  // The 'replace' prop prevents the user from going back to the protected page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a user exists, render the component they were trying to access.
  return children;
};

export default ProtectedRoute;