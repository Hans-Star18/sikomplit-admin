import axiosInstance, { getAccessToken } from '@/lib/axios';
import { redirect } from '@tanstack/react-router';

interface AuthMiddlewareOptions {
    location: {
        pathname: string;
        search: { redirect?: string };
    };
}

const checkAuthStatus = async () => {
    try {
        const response = await axiosInstance.get('/user/auth/check');
        return response.status === 200;
    } catch (error: any) {
        return false;
    }
};

export async function authMiddleware(opts: AuthMiddlewareOptions) {
    const { location } = opts;
    const token = getAccessToken();

    if (!token) {
        const isAuthenticated = await checkAuthStatus();

        if (!isAuthenticated) {
            throw redirect({
                to: '/login',
                search: { redirect: location.pathname },
            });
        }
    }

    return true;
}
