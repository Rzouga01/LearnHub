import axios from 'axios';

// Create an Axios instance with custom configuration
const api = axios.create({
    // Direct connection to Laravel backend
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Add a request interceptor to add the CSRF token and Auth token
api.interceptors.request.use(config => {
    // Add authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Add a response interceptor for handling common errors
api.interceptors.response.use(
    response => response,
    error => {
        // Handle authentication errors (401)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API route shortcuts
const apiRoutes = {
    // Auth routes
    auth: {
        register: (userData) => api.post('/api/register', userData),
        login: (credentials) => api.post('/api/login', credentials),
        logout: () => api.post('/api/logout'),
        getUser: () => api.get('/api/user'),
    },

    // Training routes
    trainings: {
        getAll: () => api.get('/api/trainings'),
        get: (id) => api.get(`/api/trainings/${id}`),
        create: (data) => api.post('/api/trainings', data),
        update: (id, data) => api.put(`/api/trainings/${id}`, data),
        delete: (id) => api.delete(`/api/trainings/${id}`),
    },

    // Enrollment routes
    enrollments: {
        getAll: () => api.get('/api/enrollments'),
        get: (id) => api.get(`/api/enrollments/${id}`),
        create: (data) => api.post('/api/enrollments', data),
        update: (id, data) => api.put(`/api/enrollments/${id}`, data),
        delete: (id) => api.delete(`/api/enrollments/${id}`),
    },

    // Feedback routes
    feedback: {
        getAll: () => api.get('/api/feedback'),
        get: (id) => api.get(`/api/feedback/${id}`),
        create: (data) => api.post('/api/feedback', data),
        update: (id, data) => api.put(`/api/feedback/${id}`, data),
        delete: (id) => api.delete(`/api/feedback/${id}`),
    },

    // Attendance routes
    attendance: {
        getAll: () => api.get('/api/attendance'),
        get: (id) => api.get(`/api/attendance/${id}`),
        create: (data) => api.post('/api/attendance', data),
        update: (id, data) => api.put(`/api/attendance/${id}`, data),
        delete: (id) => api.delete(`/api/attendance/${id}`),
    },
};


export default {
    ...api,
    routes: apiRoutes
};
