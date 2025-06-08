import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/features/dashboard";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export const Route = createFileRoute("/(dashboard)/")({
    component: () => {
        return (
            <DashboardLayout>
                <Dashboard />
            </DashboardLayout>
        );
    },
});
