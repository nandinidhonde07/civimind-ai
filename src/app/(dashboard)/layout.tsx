import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, FileText, BarChart3, Map } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border/50 bg-card">
          <SidebarContent>
            <div className="p-6 pb-2">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">CiviMind AI</h2>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/citizen" className="w-full">
                      <SidebarMenuButton>
                        <Home className="mr-2" /> Citizen
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/department" className="w-full">
                      <SidebarMenuButton>
                        <FileText className="mr-2" /> Department
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/district" className="w-full">
                      <SidebarMenuButton>
                        <Map className="mr-2" /> District
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/admin" className="w-full">
                      <SidebarMenuButton>
                        <BarChart3 className="mr-2" /> Admin
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
