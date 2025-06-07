"use client"

import {
    IconBarrierBlock,
    IconBrowserCheck,
    IconBug,
    IconChecklist,
    IconError404,
    IconHelp,
    IconLayoutDashboard,
    IconLock,
    IconLockAccess,
    IconMessages,
    IconNotification,
    IconPackages,
    IconPalette,
    IconServerOff,
    IconSettings,
    IconTool,
    IconUserCog,
    IconUserOff,
    IconUsers,
} from "@tabler/icons-react"
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
    // Tabler Icons
    IconBarrierBlock,
    IconBrowserCheck,
    IconBug,
    IconChecklist,
    IconError404,
    IconHelp,
    IconLayoutDashboard,
    IconLock,
    IconLockAccess,
    IconMessages,
    IconNotification,
    IconPackages,
    IconPalette,
    IconServerOff,
    IconSettings,
    IconTool,
    IconUserCog,
    IconUserOff,
    IconUsers,
    // Lucide Icons
    Command,
    GalleryVerticalEnd,
    AudioWaveform,
}

export function getIcon(name: string): React.ElementType | undefined {
    return iconMap[name]
}
