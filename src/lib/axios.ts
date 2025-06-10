import { config } from '@/lib/config';
import axios from 'axios';

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

const axiosInstance = axios.create({
    baseURL: config.api.base_url,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (
            accessToken &&
            tokenExpirationTime &&
            Date.now() < tokenExpirationTime &&
            config.headers
        ) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/admin/auth/login') &&
            !originalRequest.url.includes('/admin/auth/refresh')
        ) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axiosInstance.post(
                    '/admin/auth/refresh',
                    {},
                    { withCredentials: true },
                );

                const {
                    access_token: newAccessToken,
                    expires_in: newExpiresIn,
                } = refreshResponse.data.data;

                setAccessToken(newAccessToken, newExpiresIn);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshError: any) {
                clearAccessToken();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export const setAccessToken = (
    token: string | null,
    expiresInSeconds: number | null,
) => {
    accessToken = token;
    if (expiresInSeconds) {
        tokenExpirationTime = Date.now() + expiresInSeconds * 1000;
    } else {
        tokenExpirationTime = null;
    }
};

export const getAccessToken = (): string | null => {
    return accessToken;
};

export const clearAccessToken = () => {
    accessToken = null;
    tokenExpirationTime = null;
};

export default axiosInstance;
