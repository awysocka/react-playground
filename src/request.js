import axios from 'axios';
import { getToken } from './auth';

const axiosInstance = axios.create({
  baseURL: 'https://us-central1-simple-todolist-rest-api.cloudfunctions.net',
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = getToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getTasks = () => {
  return axiosInstance.get(`/tasks`);
};

export const getTask = (id) => {
    return axiosInstance.get(`/tasks/${id}`)
}

export const deleteTask = (id) => {
  return axiosInstance.delete(`/tasks/${id}`);
};

export const updateTask = (id, data) => {
  return axiosInstance.put(`/tasks/${id}`, data);
};

export const addTask = (data) => {
  return axiosInstance.post(`/tasks`, data);
};
