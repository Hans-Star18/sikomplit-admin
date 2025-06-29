import axiosInstance from '@/lib/axios';
import { clearUserCache } from '@/lib/user-service';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/logout')({
    loader: async ({ location }) => {
        await axiosInstance.post(
            '/admin/auth/logout',
            {},
            { withCredentials: true },
        );

        // Clear user cache saat logout
        clearUserCache();

        throw redirect({
            to: '/login',
            search: { redirect: location.pathname },
        });
    },
});
