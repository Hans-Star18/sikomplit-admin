import { DashboardLayout } from '@/components/layout/dashboard-layout';
import UserEdit from '@/features/user/$id.edit';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/users/$id/edit')({
    component: () => {
        const { id } = Route.useParams() as { id: string };
        return (
            <DashboardLayout>
                <UserEdit id={id} />
            </DashboardLayout>
        );
    },
});
