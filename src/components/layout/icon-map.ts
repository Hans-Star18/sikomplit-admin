import {
    IconLayoutDashboard,
    IconChecklist,
    IconPackages,
    IconMessages,
    IconUsers,
    IconLockAccess,
    IconBug,
    IconLock,
    IconUserOff,
    IconError404,
    IconServerOff,
    IconBarrierBlock,
    IconSettings,
    IconUserCog,
    IconTool,
    IconPalette,
    IconNotification,
    IconBrowserCheck,
    IconHelp,
} from "@tabler/icons-react"

import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react"

export const iconMap = {
    IconLayoutDashboard,
    IconChecklist,
    IconPackages,
    IconMessages,
    IconUsers,
    IconLockAccess,
    IconBug,
    IconLock,
    IconUserOff,
    IconError404,
    IconServerOff,
    IconBarrierBlock,
    IconSettings,
    IconUserCog,
    IconTool,
    IconPalette,
    IconNotification,
    IconBrowserCheck,
    IconHelp,
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
}

export function getIcon(name: string): React.ElementType | undefined {
    return iconMap[name as keyof typeof iconMap]
}
