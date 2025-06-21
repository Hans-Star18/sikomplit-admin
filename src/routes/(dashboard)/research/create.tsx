import { DashboardLayout } from '@/components/layout/dashboard-layout';
import ResearchCreate from '@/features/research/create';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/research/create')({
    component: () => {
        return (
            <DashboardLayout>
                <ResearchCreate />
            </DashboardLayout>
        );
    },
});
