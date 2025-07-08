import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    // Show loading indicator while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render the protected route content
    return <Outlet />;
};

export default ProtectedRoute;
