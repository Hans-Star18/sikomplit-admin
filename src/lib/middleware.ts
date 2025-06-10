import axiosInstance, { getAccessToken } from '@/lib/axios';
import { redirect } from '@tanstack/react-router';

interface AuthMiddlewareOptions {
    location: {
        pathname: string;
        search: { redirect?: string };
    };
}

export async function authMiddleware(opts: AuthMiddlewareOptions) {
    const { location } = opts;

    let token = getAccessToken();

    if (!token) {
        try {
            await axiosInstance.get('/user/auth/check');
            token = getAccessToken();
            if (!token) {
                throw redirect({
                    to: '/login',
                    search: { redirect: location.pathname },
                });
            }
        } catch (error: any) {
            throw redirect({
                to: '/login',
                search: { redirect: location.pathname },
            });
        }
    }
}
