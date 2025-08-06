import { DashboardLayout } from '@/components/layout/dashboard-layout';
import PosterIndex from '@/features/poster';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/posters/')({
    component: () => {
        return (
            <DashboardLayout>
                <PosterIndex />
            </DashboardLayout>
        );
    },
});
