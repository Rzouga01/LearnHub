import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Dashboard from './pages/Dashboard'; // Correct import as default import
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Trainers from './pages/Trainers';
import CourseDetail from './pages/CourseDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    console.log('App component rendering');
    return (
        <AuthProvider>
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="courses" element={<Courses />} />
                            <Route path="courses/:id" element={<CourseDetail />} />
                            <Route path="students" element={<Students />} />
                            <Route path="trainers" element={<Trainers />} />
                        </Route>
                    </Route>

                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </ConfigProvider>
        </AuthProvider>
    );
}

export default App;

