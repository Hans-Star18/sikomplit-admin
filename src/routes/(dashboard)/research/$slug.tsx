import { DashboardLayout } from '@/components/layout/dashboard-layout';
import ResearchDetail from '@/features/research/$slug';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/research/$slug')({
    component: () => {
        const { slug } = Route.useParams() as { slug: string };

        return (
            <DashboardLayout>
                <ResearchDetail slug={slug} />
            </DashboardLayout>
        );
    },
});
