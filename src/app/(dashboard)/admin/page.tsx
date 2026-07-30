"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, Database, BrainCircuit, Activity, FileText, Search, Download, Edit2, TrendingUp, ShieldCheck
} from 'lucide-react';
import { useStore, ComplaintStatus } from '@/lib/store';
import { toast } from 'sonner';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

export default function AdminDashboard() {
  const complaints = useStore(state => state.complaints);
  const updateStatus = useStore(state => state.updateStatus);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Dynamic mocked calculations for header
  const aiTokens = (complaints.length * 1500 + 24000).toLocaleString();
  const activeDepartments = new Set(complaints.map(c => c.department)).size || 1;

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [complaints, searchQuery]);

  const handleExportCSV = () => {
    if (filteredComplaints.length === 0) {
      toast.error("No data to export.");
      return;
    }
    const headers = ['ID', 'Title', 'Department', 'Priority', 'Status', 'Submitted At', 'Resolved At'];
    const rows = filteredComplaints.map(c => [
      c.id, `"${c.title.replace(/"/g, '""')}"`, c.department, c.priority, c.status, c.submittedAt, c.resolvedAt || 'N/A'
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `admin_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Export generated successfully!");
  };

  const handleStatusOverride = (id: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ComplaintStatus;
    updateStatus(id, newStatus);
    toast.success(`Complaint ${id} forced to ${newStatus}`);
    setEditingId(null);
  };

  // Analytics Data
  const departmentStats = useMemo(() => {
    const deps = Array.from(new Set(complaints.map(c => c.department)));
    return deps.map(dep => {
      const depComplaints = complaints.filter(c => c.department === dep);
      return {
        name: dep,
        resolved: depComplaints.filter(c => c.status === 'Resolved').length,
        active: depComplaints.filter(c => c.status !== 'Resolved' && c.status !== 'Rejected').length
      }
    });
  }, [complaints]);

  // Mocked trend data combined with real counts
  const mockTrend = [
    { day: 'Mon', volume: 12 + complaints.length }, { day: 'Tue', volume: 15 + complaints.length }, { day: 'Wed', volume: 18 + complaints.length },
    { day: 'Thu', volume: 14 + complaints.length }, { day: 'Fri', volume: 20 + complaints.length }, { day: 'Sat', volume: 9 + complaints.length }, { day: 'Sun', volume: 8 + complaints.length }
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Super Admin Terminal</h1>
          <p className="text-slate-500 mt-2 font-medium">Global system health, AI node status, and platform analytics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleExportCSV} variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-xl h-11 px-5 shadow-sm font-bold"><Download className="w-4 h-4 mr-2"/> Export Global Data</Button>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
             <span className="text-sm font-bold text-slate-700">All Systems Operational</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#6BAED6]"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total System Entries</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{complaints.length}</h3>
              </div>
              <div className="p-2.5 bg-[#DEEBF7] rounded-xl text-[#6BAED6]"><FileText className="w-5 h-5"/></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#22C55E]"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">System Uptime</p>
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
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">AI Tokens Consumed</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{aiTokens}</h3>
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
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{activeDepartments}</h3>
              </div>
              <div className="p-2.5 bg-[#DEEBF7] rounded-xl text-[#6BAED6]"><Users className="w-5 h-5"/></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section replacing Storage/Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
          <CardHeader className="border-b border-slate-100 p-6 pb-4">
            <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Activity className="w-5 h-5 mr-2 text-[#6BAED6]"/> Department Efficacy (Live)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 'bold', color: '#64748B'}}/>
                <Bar dataKey="resolved" name="Resolved" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="active" name="Active" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
          <CardHeader className="p-6 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center tracking-tight"><TrendingUp className="w-5 h-5 mr-2 text-[#6BAED6]"/> 7-Day Complaint Volume</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={mockTrend}>
                 <defs>
                   <linearGradient id="colorVolumeAdmin" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#6BAED6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#6BAED6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10, fontWeight: 'bold'}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Area type="monotone" dataKey="volume" stroke="#6BAED6" strokeWidth={3} fillOpacity={1} fill="url(#colorVolumeAdmin)" />
               </AreaChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Complaints Table (Override capable) */}
      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#F7FBFF]">
          <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><Database className="w-5 h-5 mr-2 text-[#6BAED6]"/> Global Incident Records</CardTitle>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search ID, Dept, Status..." className="pl-9 h-10 bg-white border-slate-200 rounded-xl text-sm font-medium focus-visible:ring-[#6BAED6] shadow-sm" />
             </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">AI Verification</th>
                <th className="px-6 py-4">Status Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {filteredComplaints.map(c => (
                <tr key={c.id} className="hover:bg-[#F7FBFF] transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{c.id}</td>
                  <td className="px-6 py-4">{c.department}</td>
                  <td className="px-6 py-4">
                    <Badge className={`${c.priority === 'Critical' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'} border-none shadow-none font-bold`}>{c.priority}</Badge>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`text-xs font-bold flex items-center ${c.authenticityScore >= 80 ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>
                       {c.authenticityScore >= 80 ? <ShieldCheck className="w-4 h-4 mr-1"/> : <Activity className="w-4 h-4 mr-1"/>}
                       {c.authenticityScore}%
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === c.id ? (
                       <select 
                         autoFocus
                         defaultValue={c.status}
                         onChange={(e) => handleStatusOverride(c.id, e)}
                         onBlur={() => setEditingId(null)}
                         className="bg-white border border-[#6BAED6] rounded px-2 py-1 text-sm outline-none w-full shadow-sm"
                       >
                         <option value="Pending Triage">Pending Triage</option>
                         <option value="In Progress">In Progress</option>
                         <option value="Resolved">Resolved</option>
                         <option value="Rejected">Rejected</option>
                       </select>
                    ) : (
                       <div 
                         className="flex items-center justify-between cursor-pointer hover:bg-slate-100 p-1.5 -ml-1.5 rounded-lg transition-colors group"
                         onClick={() => setEditingId(c.id)}
                       >
                         <Badge className={`${c.status === 'Resolved' ? 'bg-[#22C55E]/10 text-[#22C55E]' : c.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-[#DEEBF7] text-[#6BAED6]'} border-none shadow-none font-bold`}>
                           {c.status}
                         </Badge>
                         <Edit2 className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredComplaints.length === 0 && (
                <tr><td colSpan={5} className="text-center py-6 text-slate-400">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  );
}
