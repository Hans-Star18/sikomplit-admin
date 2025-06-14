import { DashboardLayout } from '@/components/layout/dashboard-layout';
import PageViewIndex from '@/features/page-view';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/page-views/')({
    component: () => {
        return (
            <DashboardLayout>
                <PageViewIndex />
            </DashboardLayout>
        );
    },
});
