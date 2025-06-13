import { DashboardLayout } from '@/components/layout/dashboard-layout';
import ResearchIndex from '@/features/research';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/research/')({
    component: () => {
        return (
            <DashboardLayout>
                <ResearchIndex />
            </DashboardLayout>
        );
    },
});
