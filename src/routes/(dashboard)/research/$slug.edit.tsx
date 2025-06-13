import { DashboardLayout } from '@/components/layout/dashboard-layout';
import ResearchEdit from '@/features/research/$slug.edit';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/research/$slug/edit')({
    component: () => {
        const { slug } = Route.useParams() as { slug: string };

        return (
            <DashboardLayout>
                <ResearchEdit slug={slug} />
            </DashboardLayout>
        );
    },
});
