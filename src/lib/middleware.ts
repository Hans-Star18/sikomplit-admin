import axiosInstance, { getAccessToken } from '@/lib/axios';
import { getUserData } from '@/lib/user-service';
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

export async function authMiddleware(
    opts: AuthMiddlewareOptions,
    guard: Array<string> = [],
) {
    const { location } = opts;
    const token = getAccessToken();

    if (guard.length > 0) {
        const user = await getUserData();
        if (!user || !guard.includes(user.role.slug)) {
            throw redirect({
                to: '/login',
                search: { redirect: location.pathname },
            });
        }
    }

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
