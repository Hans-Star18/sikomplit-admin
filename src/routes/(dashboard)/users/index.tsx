import { DashboardLayout } from '@/components/layout/dashboard-layout';
import UserIndex from '@/features/user';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/users/')({
    component: () => {
        return (
            <DashboardLayout>
                <UserIndex />
            </DashboardLayout>
        );
    },
});
