"use client"

import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar"
import { NavGroup } from "@/components/layout/nav-group"
import { sidebarData } from "@/components/layout/data/sidebar-data"
import Image from "next/image"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon" variant="floating" {...props}>
            <div
                className={`flex w-full items-center justify-start gap-3 ${state === "expanded" ? "px-4" : "px-2"} pt-4 pb-2 md:py-3`}
            >
                <Image
                    src="/images/logo.png"
                    width={50}
                    height={50}
                    alt="Sikomplit Logo"
                />
                {state === "expanded" && (
                    <span className="hidden text-lg font-semibold md:inline">
                        Sikomplit
                    </span>
                )}
                <span className="text-lg font-semibold md:hidden">
                    Sikomplit
                </span>
            </div>
            <SidebarContent>
                {sidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
        </Sidebar>
    )
}
