"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { 
  Building2, TrendingUp, AlertTriangle, CheckCircle2, 
  MapPin, BrainCircuit, Activity, Download, ListTodo, Users, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid
} from 'recharts';

const MOCK_TREND = [
  { day: '1', new: 12, resolved: 8 }, { day: '5', new: 15, resolved: 12 }, 
  { day: '10', new: 8, resolved: 14 }, { day: '15', new: 22, resolved: 18 }, 
  { day: '20', new: 14, resolved: 16 }, { day: '25', new: 28, resolved: 20 }, 
  { day: '30', new: 18, resolved: 24 }
];

const WARD_DATA = [
  { ward: 'Ward 1', count: 42 },
  { ward: 'Ward 2', count: 68 },
  { ward: 'Ward 3', count: 35 },
  { ward: 'Ward 4', count: 89 },
  { ward: 'Ward 5', count: 112 }
];

const DEPARTMENTS = [
  { name: 'Roads', assigned: 45, completed: 38, pending: 7, perf: 84 },
  { name: 'Water', assigned: 32, completed: 30, pending: 2, perf: 93 },
  { name: 'Electricity', assigned: 28, completed: 25, pending: 3, perf: 89 },
  { name: 'Sanitation', assigned: 55, completed: 50, pending: 5, perf: 90 },
  { name: 'Traffic', assigned: 18, completed: 16, pending: 2, perf: 88 },
  { name: 'Public Health', assigned: 22, completed: 21, pending: 1, perf: 95 }
];

const RECENT_ACTIVITY = [
  { msg: "Complaint CMP-2051 assigned to Roads Department", time: "10 mins ago" },
  { msg: "Officer Rahul Patil resolved CMP-2044", time: "25 mins ago" },
  { msg: "AI detected Water Leakage (97%)", time: "1 hour ago" },
  { msg: "Citizen provided positive feedback", time: "2 hours ago" },
  { msg: "Officer Priya Sharma completed inspection", time: "3 hours ago" }
];

export default function DistrictDashboard() {
  const handleExportCSV = () => {
    toast.success("CSV Export generated successfully!");
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">District Analytics</h1>
          <p className="text-slate-500 mt-2 font-medium">City-wide performance, AI insights, and ward distribution.</p>
        </div>
        <Button onClick={handleExportCSV} variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-xl h-11 px-5 shadow-sm font-bold"><Download className="w-4 h-4 mr-2"/> Export Report</Button>
      </div>

      {/* 1. KPI Overview (4-6 realistic metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Pending Complaints</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">24</h3>
              <ListTodo className="w-4 h-4 text-[#F59E0B] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Active Cases</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">13</h3>
              <Activity className="w-4 h-4 text-[#6BAED6] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Resolved Today</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">9</h3>
              <CheckCircle2 className="w-4 h-4 text-[#22C55E] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Avg Resolution</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">2h 18m</h3>
              <Clock className="w-4 h-4 text-slate-400 mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Citizen Satisfaction</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-[#22C55E] tracking-tighter">92%</h3>
              <Users className="w-4 h-4 text-[#22C55E] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">AI Accuracy</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-[#6BAED6] tracking-tighter">96%</h3>
              <BrainCircuit className="w-4 h-4 text-[#6BAED6] mb-1.5"/>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. Complaint Trends (One clean chart) */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl lg:col-span-2">
          <CardHeader className="p-6 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center tracking-tight">
              <TrendingUp className="w-5 h-5 mr-2 text-[#6BAED6]"/> Last 30 Days Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10, fontWeight: 'bold'}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Area type="monotone" dataKey="new" name="New Complaints" stroke="#F59E0B" strokeWidth={3} fill="url(#colorNew)" />
                 <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#22C55E" strokeWidth={3} fill="url(#colorRes)" />
               </AreaChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 4. Ward Distribution (One visualization) */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
          <CardHeader className="p-6 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center tracking-tight">
              <MapPin className="w-5 h-5 mr-2 text-[#6BAED6]"/> Ward Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={WARD_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                 <XAxis type="number" hide />
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                 <XAxis type="number" hide />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Bar dataKey="count" name="Complaints" fill="#6BAED6" radius={[0, 4, 4, 0]} barSize={24} />
               </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. Department Performance (Compact, 6 specific) */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl lg:col-span-2">
          <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6 rounded-t-3xl">
            <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Building2 className="w-5 h-5 mr-2 text-[#6BAED6]"/> Department Performance</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto p-2">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Completed</th>
                  <th className="px-6 py-4">Pending</th>
                  <th className="px-6 py-4 w-48">Performance %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                {DEPARTMENTS.map(dept => (
                  <tr key={dept.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{dept.name}</td>
                    <td className="px-6 py-4 text-[#22C55E]">{dept.completed}</td>
                    <td className="px-6 py-4 text-[#F59E0B]">{dept.pending}</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center justify-between gap-3">
                         <Progress value={dept.perf} className="h-2 bg-slate-100 rounded-full [&>div]:bg-[#6BAED6] w-full" />
                         <span className="text-xs font-bold w-8 text-right">{dept.perf}%</span>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          {/* 5. AI Insights */}
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-5 rounded-t-3xl">
              <CardTitle className="text-base font-bold text-slate-800 tracking-tight flex items-center"><BrainCircuit className="w-4 h-4 mr-2 text-[#6BAED6]"/> AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">Most Common Complaint</span>
                <span className="text-sm font-bold text-slate-800">Road Damage</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">High Risk Zone</span>
                <Badge variant="outline" className="text-[#EF4444] border-[#EF4444]/20 bg-[#EF4444]/10">Ward 5</Badge>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">Peak Reporting Time</span>
                <span className="text-sm font-bold text-slate-800">6 PM - 8 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Avg AI Confidence</span>
                <span className="text-sm font-bold text-[#22C55E]">96%</span>
              </div>
            </CardContent>
          </Card>

          {/* 5b. Escalated Complaints (Compact, realistic) */}
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-5 rounded-t-3xl">
              <CardTitle className="text-base font-bold text-slate-800 tracking-tight flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-[#EF4444]"/> Escalated Complaints</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#EF4444]"></div>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-800 text-sm">CMP-2048</span>
                  <Badge className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0">High Priority</Badge>
                </div>
                <p className="text-xs font-bold text-slate-500">Road Damage • Ward 5</p>
                <p className="text-xs font-bold text-[#F59E0B] mt-2">Pending 4 Hours</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#EF4444]"></div>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-800 text-sm">CMP-2055</span>
                  <Badge className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0">High Priority</Badge>
                </div>
                <p className="text-xs font-bold text-slate-500">Water Leakage • Ward 2</p>
                <p className="text-xs font-bold text-[#F59E0B] mt-2">Pending 2.5 Hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 6. Recent Activity (Realistic feed) */}
      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
        <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6 rounded-t-3xl">
          <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Activity className="w-5 h-5 mr-2 text-[#6BAED6]"/> Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#6BAED6] ring-4 ring-[#DEEBF7]"></div>
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
  );
}
