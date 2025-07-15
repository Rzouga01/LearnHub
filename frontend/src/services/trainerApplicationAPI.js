// API service for trainer applications
const API_BASE_URL = 'http://localhost:8000/api'; // Adjust to your Laravel backend URL

export const trainerApplicationAPI = {
    // Submit trainer application
    submitApplication: async (formData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/trainer-application`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit application');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // For file uploads (if needed later)
    submitApplicationWithFiles: async (formData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/trainer-application`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData // FormData object for file uploads
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit application');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};
