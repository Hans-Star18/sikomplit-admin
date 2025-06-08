import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    component: () => {
        return (
            <>
                {/* <NavigationProgress /> */}
                <Outlet />
                {/* <Toaster duration={50000} /> */}
                {/* {import.meta.env.MODE === "development" && (
                    <>
                        <ReactQueryDevtools buttonPosition="bottom-left" />
                        <TanStackRouterDevtools position="bottom-right" />
                    </>
                )} */}
            </>
        );
    },
    // notFoundComponent: NotFoundError,
    // errorComponent: GeneralError,
});
