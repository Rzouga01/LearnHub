import axios from 'axios';

// Create an Axios instance with custom configuration
const api = axios.create({
    // Direct connection to Laravel backend
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Important for Laravel to recognize AJAX requests
    },
    withCredentials: true // Ensure cookies (CSRF/session) are sent
});

// Utility to ensure CSRF cookie is set
async function ensureCsrfCookie() {
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await api.get('/sanctum/csrf-cookie');
    }
}

// Add a request interceptor to add Auth token
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
        register: async (userData) => {
            await ensureCsrfCookie();
            return api.post('/api/register', userData);
        },
        login: async (credentials) => {
            await ensureCsrfCookie();
            return api.post('/api/login', credentials);
        },
        logout: async () => {
            await ensureCsrfCookie();
            return api.post('/api/logout');
        },
        getUser: () => api.get('/api/user'),
    },

    // Training routes
    trainings: {
        getAll: () => api.get('/api/trainings'),
        get: (id) => api.get(`/api/trainings/${id}`),
        create: async (data) => {
            await ensureCsrfCookie();
            return api.post('/api/trainings', data);
        },
        update: async (id, data) => {
            await ensureCsrfCookie();
            return api.put(`/api/trainings/${id}`, data);
        },
        delete: async (id) => {
            await ensureCsrfCookie();
            return api.delete(`/api/trainings/${id}`);
        },
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

    // Session routes
    sessions: {
        getAll: () => api.get('/api/sessions'),
        get: (id) => api.get(`/api/sessions/${id}`),
        create: (data) => api.post('/api/sessions', data),
        update: (id, data) => api.put(`/api/sessions/${id}`, data),
        delete: (id) => api.delete(`/api/sessions/${id}`),
        getByTraining: (trainingId) => api.get(`/api/sessions/by-training/${trainingId}`),
        getUpcoming: () => api.get('/api/sessions/upcoming'),
        startSession: (id) => api.post(`/api/sessions/${id}/start`),
        endSession: (id) => api.post(`/api/sessions/${id}/end`),
    },

    // Resource routes
    resources: {
        getAll: () => api.get('/api/resources'),
        get: (id) => api.get(`/api/resources/${id}`),
        create: async (data) => {
            await ensureCsrfCookie();
            return api.post('/api/resources', data);
        },
        update: async (id, data) => {
            await ensureCsrfCookie();
            return api.put(`/api/resources/${id}`, data);
        },
        delete: async (id) => {
            await ensureCsrfCookie();
            return api.delete(`/api/resources/${id}`);
        },
        getByTraining: (trainingId) => api.get(`/api/resources/by-training/${trainingId}`),
        getByType: (type) => api.get(`/api/resources/by-type/${type}`),
        download: (id) => api.get(`/api/resources/download/${id}`, { responseType: 'blob' }),
        upload: async (formData) => {
            await ensureCsrfCookie();
            return api.post('/api/resources/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
    },

    // User management routes
    users: {
        getAll: () => api.get('/api/users'),
        get: (id) => api.get(`/api/users/${id}`),
        create: (data) => api.post('/api/users', data),
        update: (id, data) => api.put(`/api/users/${id}`, data),
        delete: (id) => api.delete(`/api/users/${id}`),
        getByRole: (role) => api.get(`/api/users/by-role/${role}`),
        getProfile: () => api.get('/api/profile'),
        updateProfile: (data) => api.put('/api/profile', data),
        updatePassword: (data) => api.put('/api/profile/password', data),
    },

    // Dashboard routes
    dashboard: {
        getStats: () => api.get('/api/dashboard/stats'),
        getRecentActivity: () => api.get('/api/dashboard/recent-activity'),
        getUpcoming: () => api.get('/api/dashboard/upcoming'),
        getAdminDashboard: () => api.get('/api/dashboard/admin'),
        getTrainerDashboard: () => api.get('/api/dashboard/trainer'),
        getStudentDashboard: () => api.get('/api/dashboard/student'),
        getCoordinatorDashboard: () => api.get('/api/dashboard/coordinator'),
    },

    // Report routes
    reports: {
        getEnrollmentReport: (params) => api.get('/api/reports/enrollment', { params }),
        getAttendanceReport: (params) => api.get('/api/reports/attendance', { params }),
        getFeedbackReport: (params) => api.get('/api/reports/feedback', { params }),
        getPerformanceReport: (params) => api.get('/api/reports/performance', { params }),
        generateCustomReport: (data) => api.post('/api/reports/custom', data),
        exportEnrollment: (params) => api.get('/api/reports/export/enrollment', {
            params,
            responseType: 'blob'
        }),
        exportAttendance: (params) => api.get('/api/reports/export/attendance', {
            params,
            responseType: 'blob'
        }),
        exportFeedback: (params) => api.get('/api/reports/export/feedback', {
            params,
            responseType: 'blob'
        }),
    }
};


export default {
    ...api,
    routes: apiRoutes
};
