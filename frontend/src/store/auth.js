import { create } from 'zustand';

const initialState = {
    user: localStorage.getItem('userData') 
        ? JSON.parse(localStorage.getItem('userData'))
        : null,
    token: localStorage.getItem('userToken') || null,
};

export const useAuthStore = create((set) => ({
    user: initialState.user,
    token: initialState.token,

    login: async (credentials) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            
            const { success, data, message } = await res.json();
            
            if (!success) {
                throw new Error(message || 'Login failed');
            }

            // Store user data and token
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify({
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            }));

            set({ 
                user: {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                },
                token: data.token 
            });

            return { success: true, data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    logout: async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                },
            });
            
            const { success, message } = await res.json();
            
            // Clear storage and state regardless of server response
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');
            set({ user: null, token: null });

            return { success: true, message };
        } catch (error) {
            // Still clear storage and state even if server request fails
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');
            set({ user: null, token: null });
            
            return { success: false, message: error.message };
        }
    },

    register: async (userData) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            const { success, data, message } = await res.json();
            
            if (!success) {
                throw new Error(message || 'Registration failed');
            }

            // Store user data and token
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify({
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                isAdmin: data.isAdmin
            }));

            set({ 
                user: {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    isAdmin: data.isAdmin
                },
                token: data.token 
            });

            return { success: true, data: {
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                isAdmin: data.isAdmin
            }};
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
})); 