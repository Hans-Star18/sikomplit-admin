import { DashboardLayout } from '@/components/layout/dashboard-layout';
import FeedbackIndex from '@/features/feedback';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/feedbacks/')({
    component: () => {
        return (
            <DashboardLayout>
                <FeedbackIndex />
            </DashboardLayout>
        );
    },
});
