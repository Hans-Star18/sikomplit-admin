import axiosInstance from '@/lib/axios';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/logout')({
    loader: async ({ location }) => {
        await axiosInstance.post(
            '/admin/auth/logout',
            {},
            { withCredentials: true },
        );

        throw redirect({
            to: '/login',
            search: { redirect: location.pathname },
        });
    },
});
