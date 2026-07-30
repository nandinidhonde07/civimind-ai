"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, AlertTriangle, TrendingUp, TrendingDown, Clock, Map, Star, ShieldCheck, ArrowUpRight, Search, Filter, Download, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const mockPerformance = [
  { name: 'Public Works', score: 98, pending: 45, resolved: 1250 },
  { name: 'Water Board', score: 85, pending: 120, resolved: 850 },
  { name: 'Electricity', score: 92, pending: 25, resolved: 2100 },
  { name: 'Sanitation', score: 78, pending: 210, resolved: 540 },
  { name: 'Forestry', score: 95, pending: 15, resolved: 320 }
];

const mockTrend = [
  { day: 'Mon', volume: 120 }, { day: 'Tue', volume: 150 }, { day: 'Wed', volume: 180 },
  { day: 'Thu', volume: 140 }, { day: 'Fri', volume: 200 }, { day: 'Sat', volume: 90 }, { day: 'Sun', volume: 80 }
];

export default function DistrictDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">District Command Matrix</h1>
          <p className="text-slate-500 mt-2 font-medium">Cross-department analytics and real-time performance indexing.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-xl h-11 px-5 shadow-sm font-bold"><Download className="w-4 h-4 mr-2"/> Export Report</Button>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="w-2 h-2 bg-[#6BAED6] rounded-full animate-ping" />
             <span className="text-sm font-bold text-[#6BAED6]">Live Grid</span>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Total Active Cases</div>
              <div className="p-2 bg-[#DEEBF7] text-[#6BAED6] rounded-xl"><AlertTriangle className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">415</span>
              <div className="mt-2 text-sm font-semibold text-[#EF4444] flex items-center"><TrendingUp className="w-4 h-4 mr-1"/> 12% vs last week</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Avg Resolution Time</div>
              <div className="p-2 bg-[#DEEBF7] text-[#6BAED6] rounded-xl"><Clock className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">24h 12m</span>
              <div className="mt-2 text-sm font-semibold text-[#22C55E] flex items-center"><TrendingDown className="w-4 h-4 mr-1"/> 4h faster</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Citizen Auth Rate</div>
              <div className="p-2 bg-[#DEEBF7] text-[#6BAED6] rounded-xl"><ShieldCheck className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">98.2%</span>
              <div className="mt-2 text-sm font-semibold text-[#22C55E] flex items-center"><ArrowUpRight className="w-4 h-4 mr-1"/> Highly Secure</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Performance Index</div>
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-xl"><Star className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">A+</span>
              <div className="mt-2 text-sm font-semibold text-slate-500">Across 5 departments</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
            <CardHeader className="border-b border-slate-100 p-6 pb-4">
              <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Building2 className="w-5 h-5 mr-2 text-[#6BAED6]"/> Department Efficacy (Power BI Integration)</CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 'bold'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 'bold', color: '#64748B'}}/>
                  <Bar dataKey="resolved" name="Resolved Issues" fill="#6BAED6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="Pending SLAs" fill="#DEEBF7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enterprise Data Grid */}
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#F7FBFF]">
              <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Map className="w-5 h-5 mr-2 text-[#6BAED6]"/> Active Field Operations</CardTitle>
              <div className="flex items-center gap-3 w-full md:w-auto">
                 <div className="relative w-full md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <Input placeholder="Search Grid..." className="pl-9 h-10 bg-white border-slate-200 rounded-xl text-sm font-medium focus-visible:ring-[#6BAED6] shadow-sm" />
                 </div>
                 <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white border-slate-200 shadow-sm text-slate-500 hover:text-[#6BAED6]"><Filter className="w-4 h-4"/></Button>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Issue</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                  <tr className="hover:bg-[#F7FBFF] transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">C-902</td>
                    <td className="px-6 py-4 flex items-center"><Building2 className="w-4 h-4 mr-2 text-slate-400"/> Public Works</td>
                    <td className="px-6 py-4">Water Main Break</td>
                    <td className="px-6 py-4"><Badge className="bg-[#EF4444]/10 text-[#EF4444] border-none shadow-none font-bold">Critical</Badge></td>
                    <td className="px-6 py-4"><Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-none shadow-none font-bold"><Clock className="w-3 h-3 mr-1"/> In Progress</Badge></td>
                  </tr>
                  <tr className="hover:bg-[#F7FBFF] transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">C-903</td>
                    <td className="px-6 py-4 flex items-center"><Building2 className="w-4 h-4 mr-2 text-slate-400"/> Sanitation</td>
                    <td className="px-6 py-4">Missed Collection</td>
                    <td className="px-6 py-4"><Badge className="bg-slate-100 text-slate-600 border-none shadow-none font-bold">Normal</Badge></td>
                    <td className="px-6 py-4"><Badge className="bg-[#DEEBF7] text-[#6BAED6] border-none shadow-none font-bold">Pending</Badge></td>
                  </tr>
                  <tr className="hover:bg-[#F7FBFF] transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">C-904</td>
                    <td className="px-6 py-4 flex items-center"><Building2 className="w-4 h-4 mr-2 text-slate-400"/> Forestry</td>
                    <td className="px-6 py-4">Fallen Tree</td>
                    <td className="px-6 py-4"><Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-none shadow-none font-bold">High</Badge></td>
                    <td className="px-6 py-4"><Badge className="bg-[#22C55E]/10 text-[#22C55E] border-none shadow-none font-bold"><CheckCircle2 className="w-3 h-3 mr-1"/> Resolved</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
               <span>Showing 1-3 of 415 entries</span>
               <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="h-8 border-slate-200 bg-white">Prev</Button>
                 <Button variant="outline" size="sm" className="h-8 border-slate-200 bg-white">Next</Button>
               </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Maps & AI Insights */}
        <div className="space-y-8">
          
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center tracking-tight"><Map className="w-5 h-5 mr-2 text-[#6BAED6]"/> Live Incident Heatmap</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[300px] relative">
               <div className="absolute inset-0 bg-[#DEEBF7]/30 flex items-center justify-center border-b border-slate-100">
                 <div className="w-full h-full relative overflow-hidden" style={{
                   backgroundImage: `radial-gradient(circle at center, #6BAED6 1px, transparent 1px)`,
                   backgroundSize: '24px 24px'
                 }}>
                    {/* Simulated Heatmap Blips */}
                    <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-[#EF4444] rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#F59E0B] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-[#6BAED6] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
                 </div>
               </div>
               <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white shadow-lg text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-[#EF4444]"></div> Critical Density</div>
                  <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div> High Density</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#6BAED6]"></div> Normal Operations</div>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
            <CardHeader className="p-6 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center tracking-tight"><TrendingUp className="w-5 h-5 mr-2 text-[#6BAED6]"/> Volume Forecast</CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={mockTrend}>
                   <defs>
                     <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6BAED6" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#6BAED6" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10, fontWeight: 'bold'}} />
                   <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                   <Area type="monotone" dataKey="volume" stroke="#6BAED6" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                 </AreaChart>
               </ResponsiveContainer>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
}
