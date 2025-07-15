import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import Profile from './pages/Profile';
import MainLayout from './layouts/MainLayout';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Trainers from './pages/Trainers';
import CourseDetail from './pages/CourseDetail';
import Settings from './pages/Settings';
import BecomeTrainer from './pages/BecomeTrainer';
import TrainerApplications from './pages/TrainerApplications';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

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
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/become-trainer" element={<BecomeTrainer />} />

                            {/* Protected routes */}                            <Route element={<ProtectedRoute />}>
                                <Route path="/dashboard" element={<MainLayout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path="courses" element={<Courses />} />
                                    <Route path="courses/:id" element={<CourseDetail />} />
                                    <Route path="students" element={<Students />} />
                                    <Route path="trainers" element={<Trainers />} />
                                    <Route path="trainer-applications" element={<TrainerApplications />} />
                                    <Route path="profile" element={<ProfilePage />} />
                                    <Route path="settings" element={<Settings />} />
                                </Route>
                            </Route>

                            {/* Standalone Profile Route */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/profile" element={<Profile />} />
                            </Route>

                            {/* Fallback route */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </ConfigProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;

