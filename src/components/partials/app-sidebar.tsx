import { NavGroup } from '@/components/partials/nav-group';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { IconFileCheck, IconLayoutDashboard } from '@tabler/icons-react';
import { Hexagon } from 'lucide-react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { state } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="floating" {...props}>
            <SidebarHeader
                className={cn(
                    'p-4 transition-all duration-200 ease-in-out',
                    state === 'collapsed' && 'p-3',
                )}
            >
                <Hexagon
                    className={cn(
                        'size-8 transition-all duration-200 ease-in-out',
                        state === 'collapsed' && 'size-6',
                    )}
                />
            </SidebarHeader>
            <SidebarContent>
                {navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

const navGroups = [
    {
        title: 'General',
        items: [
            {
                title: 'Dashboard',
                url: '/' as const,
                icon: IconLayoutDashboard,
            },
            {
                title: 'Permohonan Surat',
                url: '/recommendations' as const,
                icon: IconFileCheck,
            },
            // {
            //     title: "Secured by Clerk",
            //     icon: IconUsers,
            //     items: [
            //         {
            //             title: "Sign In",
            //             url: "/" as const,
            //         },
            //         {
            //             title: "Sign Up",
            //             url: "/" as const,
            //         },
            //         {
            //             title: "User Management",
            //             url: "/" as const,
            //         },
            //     ],
            // },
        ],
    },
];
