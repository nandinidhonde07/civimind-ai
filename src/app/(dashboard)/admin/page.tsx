"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, Settings, Database, BrainCircuit, Activity, FileText, Search, Download, Trash2, Edit2
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useStore, ComplaintStatus } from '@/lib/store';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const complaints = useStore(state => state.complaints);
  const clearStore = useStore(state => state.clearStore);
  const updateStatus = useStore(state => state.updateStatus);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Dynamic mocked calculations
  const aiTokens = (complaints.length * 1500 + 2400000).toLocaleString();
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

  const handlePurge = () => {
    if (confirm("Are you sure you want to purge all global state? This will delete all complaints.")) {
       clearStore();
       toast.success("Database purged. Seed data will generate on next Citizen load.");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Super Admin Terminal</h1>
          <p className="text-slate-500 mt-2 font-medium">Global system health, AI node status, and platform configuration.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Complaints Table (Override capable) */}
        <div className="lg:col-span-2 space-y-6">
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
                    <tr><td colSpan={4} className="text-center py-6 text-slate-400">No records found.</td></tr>
                  )}
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
                  <span>Global State DB (Zustand)</span>
                  <span className="text-[#22C55E]">{Math.min(complaints.length, 100)}%</span>
                </div>
                <Progress value={Math.min(complaints.length, 100)} className="h-2 bg-slate-100 rounded-full [&>div]:bg-[#22C55E]" />
                <p className="text-xs text-slate-400 font-medium mt-2">{complaints.length} Records / Local Storage</p>
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
              <Button onClick={handlePurge} variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold h-12 rounded-xl mt-4">
                 <Trash2 className="w-4 h-4 mr-2"/> Purge Global State (Hackathon Reset)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
