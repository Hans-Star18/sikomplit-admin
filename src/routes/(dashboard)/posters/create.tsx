import { DashboardLayout } from '@/components/layout/dashboard-layout';
import PosterCreate from '@/features/poster/create';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/posters/create')({
    component: () => {
        return (
            <DashboardLayout>
                <PosterCreate />
            </DashboardLayout>
        );
    },
});
