import { Route as RootRoute } from "@/routes/__root";
import { Route as DashboardIndexRoute } from "@/routes/(dashboard)/index";

const dashboardIndexRoute = DashboardIndexRoute.update({
    id: "dashboard-index",
    path: "/",
    getParentRoute: () => RootRoute,
} as any);

// Build route tree
export const routeTree = RootRoute.addChildren([dashboardIndexRoute]);
