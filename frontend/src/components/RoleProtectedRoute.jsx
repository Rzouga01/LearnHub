import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Result, Button } from 'antd';

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user's role is allowed to access this route
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8f9fa, #ffffff)'
            }}>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={
                        <Button type="primary" onClick={() => window.history.back()}>
                            Go Back
                        </Button>
                    }
                />
            </div>
        );
    }

    return children;
};

export default RoleProtectedRoute;