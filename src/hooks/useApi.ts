import axios from "axios";

interface IUser {

    user: {
        email: string;
        password: string;
    };
    token: string;
}

const api = axios.create({
    baseURL: "http://localhost:3000"
});

export const useApi = () => ({
    login: async (user: object): Promise<IUser> => {
        const response = await api.post('/login', user);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },
    get: async (endpoint: string, token?: string) => {
        try {
            const headers: HeadersInit = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await api.get(endpoint, { headers });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação GET:', error);
            throw error;
        }
    },

    post: async (endpoint: string, body: object, token?: string) => {
        try {
            const headers: Record<string, string> = {}; 
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
    
            const response = await api.post(endpoint, body, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação POST:', error);
            throw error;
        }
    }
    
    
});
