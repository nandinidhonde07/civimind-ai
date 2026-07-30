import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, FileText, BarChart3, Map, Bell, Search, Activity, Cpu, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F7FBFF] text-slate-800 font-sans">
        
        {/* SIDEBAR */}
        <Sidebar className="border-r border-slate-200 bg-white shadow-sm z-20">
          <SidebarContent>
            <div className="p-6 pb-6 border-b border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#6BAED6] flex items-center justify-center text-white font-bold shadow-md">
                C
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">CiviMind AI</h2>
            </div>
            
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-6 mb-2">Command Centers</SidebarGroupLabel>
              <SidebarGroupContent className="px-3">
                <SidebarMenu className="space-y-1">
                  <SidebarMenuItem>
                    <Link href="/citizen" className="w-full">
                      <SidebarMenuButton className="hover:bg-[#DEEBF7] hover:text-[#6BAED6] rounded-xl transition-all font-medium text-slate-600 py-5">
                        <Home className="mr-3 w-5 h-5" /> Citizen Portal
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/department" className="w-full">
                      <SidebarMenuButton className="hover:bg-[#DEEBF7] hover:text-[#6BAED6] rounded-xl transition-all font-medium text-slate-600 py-5">
                        <FileText className="mr-3 w-5 h-5" /> Department Desk
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/district" className="w-full">
                      <SidebarMenuButton className="hover:bg-[#DEEBF7] hover:text-[#6BAED6] rounded-xl transition-all font-medium text-slate-600 py-5">
                        <Map className="mr-3 w-5 h-5" /> District Command
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/admin" className="w-full">
                      <SidebarMenuButton className="hover:bg-[#DEEBF7] hover:text-[#6BAED6] rounded-xl transition-all font-medium text-slate-600 py-5">
                        <BarChart3 className="mr-3 w-5 h-5" /> Super Admin
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          
          {/* REAL-TIME COMMAND BAR */}
          <div className="bg-[#1E293B] text-white px-6 py-1.5 flex justify-between items-center text-xs font-medium tracking-wide z-10 shadow-md">
             <div className="flex items-center gap-6">
                <span className="flex items-center text-emerald-400"><Activity className="w-3.5 h-3.5 mr-1.5"/> System Online</span>
                <span className="flex items-center text-blue-300"><Cpu className="w-3.5 h-3.5 mr-1.5"/> AI Engine: Active</span>
             </div>
             <div className="flex items-center gap-6">
                <span className="flex items-center text-orange-400"><AlertCircle className="w-3.5 h-3.5 mr-1.5"/> 12 Critical Incidents</span>
                <span className="text-slate-400">Last Sync: Just now</span>
             </div>
          </div>

          {/* TOP NAVBAR */}
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-8 flex items-center justify-between sticky top-0 z-10">
             <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 border border-slate-200 focus-within:border-[#6BAED6] focus-within:bg-white transition-all shadow-inner">
               <Search className="w-4 h-4 text-slate-400 mr-2" />
               <input type="text" placeholder="Search complaints, IDs, or officers..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-800" />
             </div>

             <div className="flex items-center gap-6">
               <button className="relative text-slate-500 hover:text-[#6BAED6] transition-colors">
                 <Bell className="w-5 h-5" />
                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EF4444] rounded-full animate-ping"></span>
                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
               </button>
               <div className="h-8 w-px bg-slate-200"></div>
               <div className="flex items-center gap-3 cursor-pointer">
                 <div className="text-right">
                   <p className="text-sm font-bold text-slate-800 leading-none">Government User</p>
                   <p className="text-xs text-slate-500 font-medium">Authentication Pending</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-[#DEEBF7] border-2 border-white shadow-sm flex items-center justify-center text-[#6BAED6] font-bold">
                   GU
                 </div>
               </div>
             </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-8 relative">
            {children}
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}
