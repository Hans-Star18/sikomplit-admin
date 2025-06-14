import { NavGroup } from '@/components/partials/nav-group';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
    IconEye,
    IconFile,
    IconFileCheck,
    IconLayoutDashboard,
    IconMessageCircle,
    IconUsers,
} from '@tabler/icons-react';
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
        title: 'Menu Utama',
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
            {
                title: 'Pengguna',
                url: '/users' as const,
                icon: IconUsers,
            },
            {
                title: 'Ringkasan & Flyer',
                url: '/research' as const,
                icon: IconFile,
            },
            {
                title: 'Feedback',
                url: '/feedbacks' as const,
                icon: IconMessageCircle,
            },
            {
                title: 'Page View',
                url: '/page-views' as const,
                icon: IconEye,
            },
        ],
    },
];
