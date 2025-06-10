import { DashboardLayout } from '@/components/layout/dashboard-layout';
import RecommendationEdit from '@/features/recommendation/$id.edit';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/recommendations/$id/edit')({
    component: () => {
        const { id } = Route.useParams() as { id: string };
        return (
            <DashboardLayout>
                <RecommendationEdit id={id} />
            </DashboardLayout>
        );
    },
});
