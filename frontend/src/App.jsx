import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Trainers from './pages/Trainers';
import CourseDetail from './pages/CourseDetail';

function App() {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="courses/:id" element={<CourseDetail />} />
                    <Route path="students" element={<Students />} />
                    <Route path="trainers" element={<Trainers />} />
                </Route>
            </Routes>
        </ConfigProvider>
    );
}

export default App;

