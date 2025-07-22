import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (user?.role === 'admin' && !location.pathname.startsWith('/admin')) {
        return <Navigate to="/admin" replace />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
