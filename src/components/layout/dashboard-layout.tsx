import { AppSidebar } from '@/components/partials/app-sidebar';
import { Header } from '@/components/partials/header';
import { ProfileDropdown } from '@/components/partials/profile-dropdown';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Outlet } from '@tanstack/react-router';
import Cookies from 'js-cookie';

interface Props {
    children?: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
    const defaultOpen = Cookies.get('sidebar_state') !== 'false';

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div
                id="content"
                className={cn(
                    'ml-auto w-full max-w-full',
                    'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                    'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                    'sm:transition-[width] sm:duration-200 sm:ease-linear',
                    'flex h-svh flex-col',
                    'group-data-[scroll-locked=1]/body:h-full',
                    'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh',
                )}
            >
                <Header fixed>
                    <div className="ml-auto flex items-center space-x-4">
                        <ProfileDropdown />
                    </div>
                </Header>
                <div className="pt-18 pb-8 px-6">
                    {children ? children : <Outlet />}
                </div>
            </div>
        </SidebarProvider>
    );
}
