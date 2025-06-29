import { authMiddleware } from '@/lib/middleware';
import { Route as LoginIndexRoute } from '@/routes/(auth)/login';
import { Route as LogoutRoute } from '@/routes/(auth)/logout';
import { Route as FeedbackIndexRoute } from '@/routes/(dashboard)/feedbacks/index';
import { Route as DashboardIndexRoute } from '@/routes/(dashboard)/index';
import { Route as PageViewIndexRoute } from '@/routes/(dashboard)/page-views/index';
import { Route as RecommendationDetailRoute } from '@/routes/(dashboard)/recommendations/$id';
import { Route as RecommendationEditRoute } from '@/routes/(dashboard)/recommendations/$id.edit';
import { Route as RecommendationIndexRoute } from '@/routes/(dashboard)/recommendations/index';
import { Route as ResearchDetailRoute } from '@/routes/(dashboard)/research/$slug';
import { Route as ResearchEditRoute } from '@/routes/(dashboard)/research/$slug.edit';
import { Route as ResearchCreateRoute } from '@/routes/(dashboard)/research/create';
import { Route as ResearchIndexRoute } from '@/routes/(dashboard)/research/index';
import { Route as SurveyIndexRoute } from '@/routes/(dashboard)/surveys/index';
import { Route as UserDetailRoute } from '@/routes/(dashboard)/users/$id';
import { Route as UserEditRoute } from '@/routes/(dashboard)/users/$id.edit';
import { Route as UserIndexRoute } from '@/routes/(dashboard)/users/index';
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
        await authMiddleware({ location }, ['admin', 'staff']);
    },
} as any);

const recommendationIndexRoute = RecommendationIndexRoute.update({
    id: 'recommendation-index',
    path: '/recommendations',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin', 'staff']);
    },
} as any);

const recommendationDetailRoute = RecommendationDetailRoute.update({
    id: 'recommendation-detail',
    path: '/recommendations/$id',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin', 'staff']);
    },
} as any);

const recommendationEditRoute = RecommendationEditRoute.update({
    id: 'recommendation-edit',
    path: '/recommendations/$id/edit',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin', 'staff']);
    },
} as any);

const userIndexRoute = UserIndexRoute.update({
    id: 'user-index',
    path: '/users',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const userDetailRoute = UserDetailRoute.update({
    id: 'user-detail',
    path: '/users/$id',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const userEditRoute = UserEditRoute.update({
    id: 'user-edit',
    path: '/users/$id/edit',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const researchIndexRoute = ResearchIndexRoute.update({
    id: 'research-index',
    path: '/research',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const researchDetailRoute = ResearchDetailRoute.update({
    id: 'research-detail',
    path: '/research/$slug',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const researchCreateRoute = ResearchCreateRoute.update({
    id: 'research-create',
    path: '/research/create',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const researchEditRoute = ResearchEditRoute.update({
    id: 'research-edit',
    path: '/research/$slug/edit',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const feedbackIndexRoute = FeedbackIndexRoute.update({
    id: 'feedback-index',
    path: '/feedbacks',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const pageViewIndexRoute = PageViewIndexRoute.update({
    id: 'page-view-index',
    path: '/page-views',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

const surveyIndexRoute = SurveyIndexRoute.update({
    id: 'survey-index',
    path: '/surveys',
    getParentRoute: () => RootRoute,
    beforeLoad: async ({ location }: LoaderFnContext) => {
        await authMiddleware({ location }, ['admin']);
    },
} as any);

// Build route tree
export const routeTree = RootRoute.addChildren([
    dashboardIndexRoute,
    loginIndexRoute,
    logoutRoute,
    recommendationIndexRoute,
    recommendationDetailRoute,
    recommendationEditRoute,
    userIndexRoute,
    userDetailRoute,
    userEditRoute,
    researchIndexRoute,
    researchDetailRoute,
    researchEditRoute,
    feedbackIndexRoute,
    pageViewIndexRoute,
    researchCreateRoute,
    surveyIndexRoute,
]);
