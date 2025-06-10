import { DashboardLayout } from '@/components/layout/dashboard-layout';
import RecommendationIndex from '@/features/recommendation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/recommendations')({
    component: () => {
        return (
            <DashboardLayout>
                <RecommendationIndex />
            </DashboardLayout>
        );
    },
});
