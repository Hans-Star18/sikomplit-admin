// import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    // CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import TopNav from "@/components/layout/top-nav"
import { ProfileDropdown } from "@/components/profile-dropdown"
import Header from "@/components/layout/header"
import Main from "@/components/layout/main"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <div className="flex flex-1 flex-col">
                <Header>
                    {/* <TopNav links={topNav} /> */}
                    <div className="ml-auto flex items-center space-x-4">
                        <ProfileDropdown />
                    </div>
                </Header>

                <Main>
                    <div className="mb-2 flex items-center justify-between space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Dashboard
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Revenue
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="text-muted-foreground h-4 w-4"
                                >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    $45,231.89
                                </div>
                                <p className="text-muted-foreground text-xs">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </Main>
            </div>
        </SidebarProvider>
    )
}
