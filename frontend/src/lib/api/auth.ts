import { AuthResponse, LoginCredentials } from '../types/auth';

import api from '@/lib/axios';
import { handleApiError } from '../utils/api-error-handler';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post(`${API_URL}/auth/login`, credentials);
      console.log('res', response)
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
}; 