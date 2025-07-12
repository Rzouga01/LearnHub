import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    console.log('AuthProvider rendering');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('AuthProvider useEffect running');
        // Check if user is logged in on component mount
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            console.log('Found stored user:', storedUser);
            setUser(JSON.parse(storedUser));
            // Set default authorization header for all requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            console.log('No stored user found');
        }

        setLoading(false);
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    const logout = async () => {
        try {
            // Call logout API endpoint
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await axios.post('/api/logout');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage and state regardless of API success
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    const updateProfile = async (profileData) => {
        try {
            // In a real app, this would make an API call to update the profile
            // For now, we'll just update the local state
            const updatedUser = { ...user, ...profileData };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error('Profile update failed:', error);
            throw error;
        }
    };

    const isAuthenticated = !!user;

    const value = {
        user,
        loading,
        login,
        logout,
        updateProfile,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
