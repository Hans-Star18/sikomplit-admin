import { DashboardLayout } from '@/components/layout/dashboard-layout';
import RecommendationDetail from '@/features/recommendation/$id';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/recommendations/$id')({
    component: () => {
        const { id } = Route.useParams() as { id: string };
        return (
            <DashboardLayout>
                <RecommendationDetail id={id} />
            </DashboardLayout>
        );
    },
});
