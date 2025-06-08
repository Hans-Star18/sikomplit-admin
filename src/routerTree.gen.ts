import { Route as LoginIndexRoute } from '@/routes/(auth)/login';
import { Route as DashboardIndexRoute } from '@/routes/(dashboard)/index';
import { Route as RootRoute } from '@/routes/__root';

const loginIndexRoute = LoginIndexRoute.update({
    id: 'login-index',
    path: '/login',
    getParentRoute: () => RootRoute,
} as any);

const dashboardIndexRoute = DashboardIndexRoute.update({
    id: 'dashboard-index',
    path: '/',
    getParentRoute: () => RootRoute,
    beforeLoad: async () => {
        console.log('dashboard-index');
    },
} as any);

// Build route tree
export const routeTree = RootRoute.addChildren([
    dashboardIndexRoute,
    loginIndexRoute,
]);
