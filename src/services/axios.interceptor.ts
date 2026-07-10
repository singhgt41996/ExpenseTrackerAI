import { baseURL } from '@/services/api.urls';
import { storageHelpers } from '@/utils/storage';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { config } from 'zod';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storageHelpers.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  },
);

// const refreshAccessToken = async (): Promise<string> => {
//     const refreshToken = storageHelpers.getRefreshToken();
//     // use BARE axios (not axiosInstance) so this call doesn't re-trigger the interceptor → infinite loop
//     const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
//     return res.data.accessToken;
//   };

//   axiosInstance.interceptors.response.use(
//     response => response, // success: pass through (or `return response.data` to auto-unwrap)
//     async (error: AxiosError) => {
//       const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

//       // 1) No response object = network failure / timeout (server unreachable)
//       if (!error.response) {
//         // show an "offline / try again" toast
//         return Promise.reject(error);
//       }

//       const status = error.response.status;

//       // 2) 401 = token expired → refresh once, then retry the original request
//       if (status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true; // guard so we don't loop forever
//         try {
//           const newToken = await refreshAccessToken();
//           storageHelpers.setAuthToken(newToken);
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return axiosInstance(originalRequest); // replay the original call with the new token
//         } catch (refreshErr) {
//           storageHelpers.clearAuth(); // refresh failed → force logout
//           // trigger navigation to Login here
//           return Promise.reject(refreshErr);
//         }
//       }

//       // 3) Other errors — central place for toasts/logging
//       // if (status >= 500) showToast('Server error');
//       return Promise.reject(error);
//     },
//   );

// The advanced bit interviewers love: concurrent 401s
// Problem: if 3 requests fire at once and all get 401, you'd trigger 3 refreshes. Fix: let one refresh run, queue the others, then replay them all with the new token.

// let isRefreshing = false;
// let queue: Array<(token: string | null) => void> = [];

// const flushQueue = (token: string | null) => {
//   queue.forEach(cb => cb(token));
//   queue = [];
// };

// // inside the 401 branch, before starting a refresh:
// if (isRefreshing) {
//   // a refresh is already happening — wait for it
//   return new Promise((resolve, reject) => {
//     queue.push(token => {
//       if (!token) return reject(error);
//       originalRequest.headers.Authorization = `Bearer ${token}`;
//       resolve(axiosInstance(originalRequest));
//     });
//   });
// }
// isRefreshing = true;
// try {
//   const newToken = await refreshAccessToken();
//   storageHelpers.setAuthToken(newToken);
//   flushQueue(newToken);              // release all queued requests
//   originalRequest.headers.Authorization = `Bearer ${newToken}`;
//   return axiosInstance(originalRequest);
// } catch (e) {
//   flushQueue(null);                  // reject all queued requests
//   storageHelpers.clearAuth();
//   return Promise.reject(e);
// } finally {
//   isRefreshing = false;
// }
