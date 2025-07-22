import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BecomeTrainer from './pages/BecomeTrainer';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Students from './pages/Students';
import Trainers from './pages/Trainers';
import TrainerApplications from './pages/TrainerApplications';
import ProfilePage from './pages/ProfilePage';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { ConfigProvider } from 'antd';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-react';
import { ReactPlugin } from '@21st-extension/react';
function AppRoutes() {
    const { user } = useAuth();
    return (
        <Routes>
            {/* Public routes - redirect admin to /admin */}
            <Route path="/" element={user?.role === 'admin' ? <Navigate to="/admin" replace /> : <LandingPage />} />
            <Route path="/login" element={user?.role === 'admin' ? <Navigate to="/admin" replace /> : <Login />} />
            <Route path="/register" element={user?.role === 'admin' ? <Navigate to="/admin" replace /> : <Register />} />
            <Route path="/become-trainer" element={user?.role === 'admin' ? <Navigate to="/admin" replace /> : <BecomeTrainer />} />

            {/* Admin dashboard route (protected) */}
            <Route element={<ProtectedRoute role="admin" />}>
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Protected routes for all authenticated users */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    
                    {/* Courses - All roles can access but with different views */}
                    <Route path="courses" element={<Courses />} />
                    <Route path="courses/:id" element={<CourseDetail />} />
                    
                    {/* Students - Only trainers and admins */}
                    <Route path="students" element={
                        <RoleProtectedRoute allowedRoles={['trainer', 'admin']}>
                            <Students />
                        </RoleProtectedRoute>
                    } />
                    
                    {/* Trainers - Only coordinators and admins */}
                    <Route path="trainers" element={
                        <RoleProtectedRoute allowedRoles={['coordinator', 'admin']}>
                            <Trainers />
                        </RoleProtectedRoute>
                    } />
                    
                    {/* Trainer Applications - Only coordinators and admins */}
                    <Route path="trainer-applications" element={
                        <RoleProtectedRoute allowedRoles={['coordinator', 'admin']}>
                            <TrainerApplications />
                        </RoleProtectedRoute>
                    } />
                    
                    {/* Profile and Settings - All authenticated users */}
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    console.log('App component rendering');
    return (
        <ThemeProvider>
            <AuthProvider>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#E76F51',
                            borderRadius: 8,
                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                        }
                    }}
                >
                    <div className="theme-container">
                        <AppRoutes />
                        <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
                    </div>
                </ConfigProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;

