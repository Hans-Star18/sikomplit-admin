// import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react"
import { type SidebarData } from "@/components/layout/types"

export const sidebarData: SidebarData = {
    navGroups: [
        {
            title: "Menu",
            items: [
                {
                    title: "Dashboard",
                    url: "/",
                    icon: "IconLayoutDashboard",
                },
                {
                    title: "Tasks",
                    url: "/tasks",
                    icon: "IconChecklist",
                },
                {
                    title: "Apps",
                    url: "/apps",
                    icon: "IconPackages",
                },
                {
                    title: "Chats",
                    url: "/chats",
                    badge: "3",
                    icon: "IconMessages",
                },
                {
                    title: "Users",
                    url: "/users",
                    icon: "IconUsers",
                },
                {
                    title: "Secured by Clerk",
                    items: [
                        {
                            title: "Sign In",
                            url: "/clerk/sign-in",
                        },
                        {
                            title: "Sign Up",
                            url: "/clerk/sign-up",
                        },
                        {
                            title: "User Management",
                            url: "/clerk/user-management",
                        },
                    ],
                },
            ],
        },
    ],
}
