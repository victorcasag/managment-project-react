import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response) {
      
      console.error('Erro de resposta:', error.response.data);
      return Promise.reject({
        message: error.response.data.message || 'Erro ao processar requisição',
        status: error.response.status,
      });
    } else if (error.request) {
      
      console.error('Erro de rede:', error.request);
      return Promise.reject({
        message: 'Erro de conexão com o servidor',
        status: 0,
      });
    } else {
      
      console.error('Erro:', error.message);
      return Promise.reject({
        message: error.message,
        status: -1,
      });
    }
  }
);

export const usersApi = {
  
  getAll: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const postsApi = {
  
  getAll: async () => {
    try {
      const response = await apiClient.get('/posts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByUser: async (userId) => {
    try {
      const response = await apiClient.get(`/posts?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (postData) => {
    try {
      const response = await apiClient.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, postData) => {
    try {
      const response = await apiClient.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const commentsApi = {
  
  getByPost: async (postId) => {
    try {
      const response = await apiClient.get(`/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (commentData) => {
    try {
      const response = await apiClient.post('/comments', commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient;