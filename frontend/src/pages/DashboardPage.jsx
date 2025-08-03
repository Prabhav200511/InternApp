import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import InternDashboard from './InternDashboard';

const DashboardPage = () => {
  const { user } = useAuth();

  // If user data is still loading, show a loading indicator
  if (!user) {
    return <div className="text-center p-10"><span className="loading loading-spinner"></span></div>;
  }

  // Check the user's role and render the correct dashboard
  return user.role === 'admin' ? <AdminDashboard /> : <InternDashboard />;
};

export default DashboardPage;