import api from '@/lib/axios';
import { User } from '@/types/user';
import { handleApiError } from '../utils/api-error-handler';

export interface UserPaginationDto {
  page?: number;
  limit?: number;
}


export const usersApi = {
  findAll: async (paginationDto: UserPaginationDto): Promise<User[]> => {
    try {
      const response = await api.get('/api/users', {
        params: paginationDto,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
}; 