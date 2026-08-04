import { axiosInstance } from '@/services/axios.interceptor';

export const apiService = {
  get: (url: string, config?: any) => axiosInstance.get(url, config),
  post: (url: string, payload: any, config?: any) =>
    axiosInstance.post(url, payload, config),
  put: (url: string, payload: any, config?: any) =>
    axiosInstance.put(url, payload, config),
  delete: (url: string, config?: any) => axiosInstance.delete(url, config),
};
