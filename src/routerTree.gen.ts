import { authMiddleware } from '@/lib/middleware';
import { Route as LoginIndexRoute } from '@/routes/(auth)/login';
import { Route as LogoutRoute } from '@/routes/(auth)/logout';
import { Route as DashboardIndexRoute } from '@/routes/(dashboard)/index';
import { Route as RecommendationIndexRoute } from '@/routes/(dashboard)/recommendations';
import { Route as RootRoute } from '@/routes/__root';
import { type LoaderFnContext } from '@tanstack/react-router';

const loginIndexRoute = LoginIndexRoute.update({
    id: 'login-index',
    path: '/login',
    getParentRoute: () => RootRoute,
} as any);

const logoutRoute = LogoutRoute.update({
    id: 'logout',
    path: '/logout',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location });
    },
} as any);

const dashboardIndexRoute = DashboardIndexRoute.update({
    id: 'dashboard-index',
    path: '/',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location });
    },
} as any);

const recommendationIndexRoute = RecommendationIndexRoute.update({
    id: 'recommendation-index',
    path: '/recommendations',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location });
    },
} as any);

// Build route tree
export const routeTree = RootRoute.addChildren([
    dashboardIndexRoute,
    loginIndexRoute,
    logoutRoute,
    recommendationIndexRoute,
]);
