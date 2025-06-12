import { DashboardLayout } from '@/components/layout/dashboard-layout';
import UserDetail from '@/features/user/$id';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/users/$id')({
    component: () => {
        const { id } = Route.useParams() as { id: string };
        return (
            <DashboardLayout>
                <UserDetail id={id} />
            </DashboardLayout>
        );
    },
});
