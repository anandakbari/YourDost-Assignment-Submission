import { ApiResponse } from '../types/User';

const BASE_URL = 'https://reqres.in/api';

export const fetchUsers = async (page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}`, {
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users. Please try again.');
  }
};