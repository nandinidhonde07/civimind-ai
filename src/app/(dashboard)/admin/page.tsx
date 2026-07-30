"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, Activity, TrendingUp, AlertTriangle, Download, Database, Users, BrainCircuit, FileText, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const MOCK_TREND = [
  { day: '1', volume: 15 }, { day: '5', volume: 18 }, { day: '10', volume: 14 }, 
  { day: '15', volume: 22 }, { day: '20', volume: 16 }, { day: '25', volume: 28 }, 
  { day: '30', volume: 24 }
];

const DEPARTMENTS = [
  { name: 'Roads', assigned: 45, completed: 38, pending: 7, avg: '2h 10m', perf: 84 },
  { name: 'Water', assigned: 32, completed: 30, pending: 2, avg: '1h 45m', perf: 93 },
  { name: 'Electricity', assigned: 28, completed: 25, pending: 3, avg: '2h 30m', perf: 89 },
  { name: 'Sanitation', assigned: 55, completed: 50, pending: 5, avg: '4h 15m', perf: 90 },
  { name: 'Traffic', assigned: 18, completed: 16, pending: 2, avg: '1h 20m', perf: 88 },
  { name: 'Public Health', assigned: 22, completed: 21, pending: 1, avg: '2h 00m', perf: 95 }
];

const OFFICERS = [
  { name: 'Rahul Patil', dept: 'Roads', assigned: 15, completed: 12, avg: '1h 50m', rating: '4.8/5' },
  { name: 'Priya Sharma', dept: 'Water', assigned: 10, completed: 10, avg: '1h 20m', rating: '5.0/5' },
  { name: 'Amit Deshmukh', dept: 'Electricity', assigned: 12, completed: 9, avg: '2h 10m', rating: '4.5/5' },
  { name: 'Sneha Kulkarni', dept: 'Sanitation', assigned: 20, completed: 19, avg: '3h 30m', rating: '4.7/5' },
  { name: 'Rohit Jadhav', dept: 'Traffic', assigned: 8, completed: 7, avg: '1h 00m', rating: '4.9/5' },
  { name: 'Neha Joshi', dept: 'Public Health', assigned: 11, completed: 11, avg: '1h 45m', rating: '5.0/5' }
];

const RECENT_ACTIVITY = [
  { msg: "Roads Department resolved CMP-2050", time: "15 mins ago" },
  { msg: "AI rerouted complaint to Water Department", time: "30 mins ago" },
  { msg: "Officer Priya Sharma completed inspection", time: "1 hour ago" },
  { msg: "Citizen rated service 5/5", time: "2 hours ago" }
];

export default function AdminDashboard() {
  const handleExportCSV = () => {
    toast.success("CSV Export generated successfully!");
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Super Admin Terminal</h1>
          <p className="text-slate-500 mt-2 font-medium">City-wide monitoring, executive analytics, and department oversight.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleExportCSV} variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-xl h-11 px-5 shadow-sm font-bold"><Download className="w-4 h-4 mr-2"/> Export Data</Button>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
             <span className="text-sm font-bold text-slate-700">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* 1. City Health KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#6BAED6]"></div>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Complaints</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">324</h3>
              <FileText className="w-4 h-4 text-[#6BAED6] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#F59E0B]"></div>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Pending</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">24</h3>
              <Database className="w-4 h-4 text-[#F59E0B] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#22C55E]"></div>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Resolved Today</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">9</h3>
              <CheckCircle2 className="w-4 h-4 text-[#22C55E] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#6BAED6]"></div>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Active Depts</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">6</h3>
              <Building2 className="w-4 h-4 text-[#6BAED6] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#22C55E]"></div>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Citizen Satisfaction</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-[#22C55E] tracking-tighter">92%</h3>
              <Users className="w-4 h-4 text-[#22C55E] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#6BAED6]"></div>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">AI Accuracy</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-[#6BAED6] tracking-tighter">96%</h3>
              <BrainCircuit className="w-4 h-4 text-[#6BAED6] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Department Performance Cards */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><Building2 className="w-5 h-5 mr-2 text-[#6BAED6]"/> Department Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map(dept => (
            <Card key={dept.name} className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-shadow">
              <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-4 pb-3 flex flex-row justify-between items-center">
                <CardTitle className="text-base font-bold text-slate-800 tracking-tight">{dept.name}</CardTitle>
                <Badge className={`${dept.perf >= 90 ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#6BAED6]/10 text-[#6BAED6]'} shadow-none border-none`}>{dept.perf}% Perf</Badge>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Assigned</span>
                    <span className="text-sm font-bold text-slate-700">{dept.assigned}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Completed</span>
                    <span className="text-sm font-bold text-[#22C55E]">{dept.completed}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Pending</span>
                    <span className="text-sm font-bold text-[#F59E0B]">{dept.pending}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Avg Res.</span>
                    <span className="text-sm font-bold text-slate-700">{dept.avg}</span>
                  </div>
                </div>
                <Progress value={dept.perf} className="h-1.5 bg-slate-100 rounded-full [&>div]:bg-[#6BAED6] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Officer Performance Table & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Officer Performance */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl lg:col-span-2 overflow-hidden">
          <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6 flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Users className="w-5 h-5 mr-2 text-[#6BAED6]"/> Officer Performance</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto p-2">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Officer Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Assigned</th>
                  <th className="px-6 py-4">Completed</th>
                  <th className="px-6 py-4">Avg Res.</th>
                  <th className="px-6 py-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                {OFFICERS.map((officer, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{officer.name}</td>
                    <td className="px-6 py-4 text-slate-500">{officer.dept}</td>
                    <td className="px-6 py-4">{officer.assigned}</td>
                    <td className="px-6 py-4 text-[#22C55E]">{officer.completed}</td>
                    <td className="px-6 py-4">{officer.avg}</td>
                    <td className="px-6 py-4 text-[#6BAED6] font-bold">{officer.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Analytics Grid: AI Insights & Alerts */}
        <div className="space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-5 rounded-t-3xl">
              <CardTitle className="text-base font-bold text-slate-800 tracking-tight flex items-center"><BrainCircuit className="w-4 h-4 mr-2 text-[#6BAED6]"/> AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">AI Classification Accuracy</span>
                <span className="text-sm font-bold text-[#22C55E]">96%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">Most Reported Issue</span>
                <span className="text-sm font-bold text-slate-800">Road Damage</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">Highest Complaint Zone</span>
                <Badge variant="outline" className="text-[#EF4444] border-[#EF4444]/20 bg-[#EF4444]/10">Ward 5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Avg Detection Confidence</span>
                <span className="text-sm font-bold text-[#6BAED6]">95%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-5 rounded-t-3xl">
              <CardTitle className="text-base font-bold text-slate-800 tracking-tight flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-[#EF4444]"/> Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#EF4444]"></div>
                <p className="text-xs font-bold text-slate-800 mb-1">Water Leakage reported in Ward 2</p>
                <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider">Action Required</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#EF4444]"></div>
                <p className="text-xs font-bold text-slate-800 mb-1">Transformer Failure pending for 3 hours</p>
                <p className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider">Breaching SLA</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4. Complaint Trends (Single Chart) */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
          <CardHeader className="p-6 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center tracking-tight">
              <TrendingUp className="w-5 h-5 mr-2 text-[#6BAED6]"/> Complaint Volume Trend (30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#6BAED6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#6BAED6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10, fontWeight: 'bold'}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Area type="monotone" dataKey="volume" name="Total Complaints" stroke="#6BAED6" strokeWidth={3} fill="url(#colorAdmin)" />
               </AreaChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 5. Recent Activities */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
          <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6 rounded-t-3xl">
            <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Activity className="w-5 h-5 mr-2 text-[#6BAED6]"/> Recent System Events</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {RECENT_ACTIVITY.map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] ring-4 ring-[#22C55E]/10"></div>
                  <div className="flex-1 flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-sm font-bold text-slate-700">{activity.msg}</span>
                    <span className="text-xs font-bold text-slate-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}
