"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, ShieldAlert, Settings, Database, BrainCircuit, Activity, FileText, Search, Plus
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export default function AdminDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Super Admin Terminal</h1>
          <p className="text-slate-500 mt-2 font-medium">Global system health, AI node status, and platform configuration.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
           <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
           <span className="text-sm font-bold text-slate-700">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#6BAED6]"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Users</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">14,204</h3>
              </div>
              <div className="p-2.5 bg-[#DEEBF7] rounded-xl text-[#6BAED6]"><Users className="w-5 h-5"/></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#22C55E]"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">API Health</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">99.9%</h3>
              </div>
              <div className="p-2.5 bg-[#22C55E]/10 rounded-xl text-[#22C55E]"><Activity className="w-5 h-5"/></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#F59E0B]"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">AI Tokens Used</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">2.4M</h3>
              </div>
              <div className="p-2.5 bg-yellow-100 rounded-xl text-yellow-600"><BrainCircuit className="w-5 h-5"/></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#6BAED6]"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Active Departments</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">18</h3>
              </div>
              <div className="p-2.5 bg-[#DEEBF7] rounded-xl text-[#6BAED6]"><FileText className="w-5 h-5"/></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Users Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#F7FBFF]">
              <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Users className="w-5 h-5 mr-2 text-[#6BAED6]"/> Access Control</CardTitle>
              <div className="flex items-center gap-3 w-full md:w-auto">
                 <div className="relative w-full md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <Input placeholder="Search Users..." className="pl-9 h-10 bg-white border-slate-200 rounded-xl text-sm font-medium focus-visible:ring-[#6BAED6] shadow-sm" />
                 </div>
                 <Button className="h-10 rounded-xl bg-[#6BAED6] hover:bg-[#5a9ac0] text-white shadow-sm font-bold"><Plus className="w-4 h-4 mr-2"/> Add User</Button>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                  <tr className="hover:bg-[#F7FBFF] transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">admin@gov.in</td>
                    <td className="px-6 py-4"><Badge className="bg-[#EF4444]/10 text-[#EF4444] border-none shadow-none font-bold">Super Admin</Badge></td>
                    <td className="px-6 py-4 text-slate-400">All</td>
                    <td className="px-6 py-4"><span className="flex items-center text-[#22C55E]"><div className="w-2 h-2 rounded-full bg-[#22C55E] mr-2"></div>Active</span></td>
                  </tr>
                  <tr className="hover:bg-[#F7FBFF] transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">director@publicworks.gov.in</td>
                    <td className="px-6 py-4"><Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-none shadow-none font-bold">District Officer</Badge></td>
                    <td className="px-6 py-4">Public Works</td>
                    <td className="px-6 py-4"><span className="flex items-center text-[#22C55E]"><div className="w-2 h-2 rounded-full bg-[#22C55E] mr-2"></div>Active</span></td>
                  </tr>
                  <tr className="hover:bg-[#F7FBFF] transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">officer_84@gov.in</td>
                    <td className="px-6 py-4"><Badge className="bg-[#6BAED6]/10 text-[#6BAED6] border-none shadow-none font-bold">Field Officer</Badge></td>
                    <td className="px-6 py-4">Sanitation</td>
                    <td className="px-6 py-4"><span className="flex items-center text-slate-400"><div className="w-2 h-2 rounded-full bg-slate-400 mr-2"></div>Offline</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* System Settings & Storage */}
        <div className="space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6">
              <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Database className="w-5 h-5 mr-2 text-[#6BAED6]"/> Storage Capacity</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  <span>Image Blob Storage</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2 bg-slate-100 rounded-full [&>div]:bg-[#6BAED6]" />
                <p className="text-xs text-slate-400 font-medium mt-2">7.8 TB / 10 TB used</p>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  <span>PostgreSQL DB</span>
                  <span className="text-[#F59E0B]">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-slate-100 rounded-full [&>div]:bg-[#F59E0B]" />
                <p className="text-xs text-slate-400 font-medium mt-2">425 GB / 500 GB used</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6">
              <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Settings className="w-5 h-5 mr-2 text-[#6BAED6]"/> Global Preferences</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-lg shadow-sm text-slate-500"><BrainCircuit className="w-4 h-4"/></div>
                   <span className="text-sm font-bold text-slate-700">Auto-Routing AI</span>
                 </div>
                 <div className="w-10 h-6 bg-[#22C55E] rounded-full border-2 border-transparent relative transition-colors cursor-pointer">
                   <div className="absolute right-0 top-0 w-5 h-5 bg-white rounded-full shadow"></div>
                 </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-lg shadow-sm text-slate-500"><ShieldAlert className="w-4 h-4"/></div>
                   <span className="text-sm font-bold text-slate-700">Strict Image Verif.</span>
                 </div>
                 <div className="w-10 h-6 bg-[#22C55E] rounded-full border-2 border-transparent relative transition-colors cursor-pointer">
                   <div className="absolute right-0 top-0 w-5 h-5 bg-white rounded-full shadow"></div>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
