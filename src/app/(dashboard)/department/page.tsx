"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, Clock, ListTodo, AlertTriangle, 
  ArrowRight, ShieldCheck, 
  TrendingUp, ArrowUpRight,
  Users, Building2, XCircle, ArrowLeftRight, MapPin
} from 'lucide-react';
import { useStore, ComplaintStatus } from '@/lib/store';
import { toast } from 'sonner';

const DEPARTMENTS = ['All', 'Public Works', 'Water Board', 'Electricity', 'Sanitation', 'Traffic', 'Forestry', 'Public Health'];

export default function DepartmentDashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const complaints = useStore(state => state.complaints);
  const updateStatus = useStore(state => state.updateStatus);

  const filteredComplaints = activeTab === 'All' 
    ? complaints 
    : complaints.filter(c => c.department === activeTab);

  const pending = filteredComplaints.filter(c => c.status === 'Pending Triage');
  const inProgress = filteredComplaints.filter(c => c.status === 'In Progress');
  const resolved = filteredComplaints.filter(c => c.status === 'Resolved');
  
  const slaCompliance = filteredComplaints.length ? Math.round((resolved.length / filteredComplaints.length) * 100) : 100;

  const handleAction = (id: string, newStatus: ComplaintStatus, actionName: string) => {
    updateStatus(id, newStatus);
    toast.success(`Complaint ${id} ${actionName} successfully!`);
  };

  const handleTransfer = (id: string) => {
    updateStatus(id, 'Transferred', 'District Authority');
    toast.info(`Complaint ${id} transferred to District Authority.`);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Department Desks</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage incoming tickets, dispatch field officers, and resolve citizen issues.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
           <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
           <span className="text-sm font-bold text-slate-700">Grid Online</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm h-12 flex flex-wrap h-auto gap-2 justify-start mb-6">
          {DEPARTMENTS.map(dept => (
            <TabsTrigger 
              key={dept} 
              value={dept} 
              className="rounded-lg data-[state=active]:bg-[#DEEBF7] data-[state=active]:text-[#6BAED6] data-[state=active]:font-bold font-medium text-slate-500 transition-all px-4"
            >
              {dept}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#EF4444]"></div>
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Critical Incidents</div>
              <div className="p-2 bg-[#EF4444]/10 text-[#EF4444] rounded-xl"><AlertTriangle className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">{filteredComplaints.filter(c => c.priority === 'Critical').length}</span>
              <div className="mt-2 text-sm font-semibold text-[#EF4444] flex items-center"><TrendingUp className="w-4 h-4 mr-1"/> Action Required</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#F59E0B]"></div>
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Pending Triage</div>
              <div className="p-2 bg-[#F59E0B]/10 text-[#F59E0B] rounded-xl"><Clock className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">{pending.length}</span>
              <div className="mt-2 text-sm font-semibold text-slate-500 flex items-center">Awaiting Officer</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#6BAED6]"></div>
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Active Field Ops</div>
              <div className="p-2 bg-[#DEEBF7] text-[#6BAED6] rounded-xl"><Users className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">{inProgress.length}</span>
              <div className="mt-2 text-sm font-semibold text-[#6BAED6] flex items-center"><ArrowUpRight className="w-4 h-4 mr-1"/> Units Deployed</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#22C55E]"></div>
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Resolved Today</div>
              <div className="p-2 bg-[#22C55E]/10 text-[#22C55E] rounded-xl"><ShieldCheck className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">{resolved.length}</span>
              <div className="mt-2 text-sm font-semibold text-[#22C55E] flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> {slaCompliance}% SLA</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6">
          <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><ListTodo className="w-5 h-5 mr-2 text-[#6BAED6]"/> Mission Control Kanban</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Pending Column */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-inner min-h-[500px]">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center justify-between">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-2"/> Pending Triage</span>
                <Badge className="bg-white text-slate-600 border-slate-200 shadow-sm px-3">{pending.length}</Badge>
              </h3>
              <div className="space-y-4">
                {pending.map(c => (
                  <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                     {c.priority === 'Critical' && <div className="absolute top-0 left-0 w-1 h-full bg-[#EF4444]"></div>}
                     <div className="flex justify-between items-start mb-3">
                       <Badge className={`${c.priority === 'Critical' ? 'bg-[#EF4444]' : c.priority === 'High' ? 'bg-[#F59E0B]' : 'bg-slate-500'} text-white shadow-sm font-bold px-2 py-0.5 text-[10px]`}>{c.priority}</Badge>
                       <span className="text-xs font-bold text-slate-400">{c.id}</span>
                     </div>
                     <h4 className="font-bold text-slate-800 text-base mb-1">{c.title}</h4>
                     <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-4">{c.description}</p>
                     
                     <div className="grid grid-cols-2 gap-2 mb-4">
                       <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Category</span>
                         <span className="text-xs font-bold text-slate-700">{c.category}</span>
                       </div>
                       <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Location</span>
                         <span className="text-xs font-bold text-slate-700 truncate block"><MapPin className="w-3 h-3 inline mr-1 text-slate-400"/> {c.location}</span>
                       </div>
                       <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 col-span-2 flex justify-between items-center">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">AI Authenticity Match</span>
                         <span className={`text-xs font-bold ${c.authenticityScore > 80 ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>{c.authenticityScore}% Confirmed</span>
                       </div>
                     </div>

                     <div className="flex gap-2 pt-3 border-t border-slate-100">
                        <Button onClick={() => handleAction(c.id, 'In Progress', 'Accepted')} className="w-full bg-[#6BAED6] hover:bg-[#5a9ac0] text-white shadow-sm font-bold h-10 rounded-xl text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5"/> Accept Assignment
                        </Button>
                        <Button onClick={() => handleTransfer(c.id)} variant="outline" size="icon" className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm font-bold h-10 w-10 shrink-0 rounded-xl">
                          <ArrowLeftRight className="w-3.5 h-3.5"/>
                        </Button>
                        <Button onClick={() => handleAction(c.id, 'Rejected', 'Rejected')} variant="outline" size="icon" className="bg-white border-red-200 text-red-600 hover:bg-red-50 shadow-sm font-bold h-10 w-10 shrink-0 rounded-xl">
                          <XCircle className="w-3.5 h-3.5"/>
                        </Button>
                     </div>
                  </div>
                ))}
                {pending.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white rounded-2xl border border-slate-200 border-dashed">No Pending Incidents</div>
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-inner min-h-[500px]">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center justify-between">
                <span className="flex items-center"><Users className="w-4 h-4 mr-2"/> Active Field Operations</span>
                <Badge className="bg-white text-slate-600 border-slate-200 shadow-sm px-3">{inProgress.length}</Badge>
              </h3>
              <div className="space-y-4">
                {inProgress.map(c => (
                  <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-[#6BAED6]"></div>
                     <div className="flex justify-between items-start mb-3">
                       <Badge className="bg-[#DEEBF7] text-[#6BAED6] shadow-sm font-bold px-2 py-0.5 text-[10px] border-none">Officer Deployed</Badge>
                       <span className="text-xs font-bold text-slate-400">{c.id}</span>
                     </div>
                     <h4 className="font-bold text-slate-800 text-base mb-1">{c.title}</h4>
                     
                     <div className="grid grid-cols-2 gap-2 my-4">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center">
                           <Building2 className="w-4 h-4 text-slate-400 mr-2 shrink-0"/>
                           <span className="text-xs font-bold text-slate-700 truncate">{c.department}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-end">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center">
                             SLA <ArrowRight className="w-3 h-3 mx-1"/> <span className="text-[#6BAED6]">{c.estimatedResolution}</span>
                           </span>
                        </div>
                     </div>

                     <div className="pt-3 border-t border-slate-100">
                       <Button onClick={() => handleAction(c.id, 'Resolved', 'Resolved')} className="w-full bg-[#22C55E] hover:bg-[#1ea850] text-white shadow-sm font-bold h-10 rounded-xl text-xs">
                         <ShieldCheck className="w-4 h-4 mr-2"/> Mark as Resolved
                       </Button>
                     </div>
                  </div>
                ))}
                {inProgress.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white rounded-2xl border border-slate-200 border-dashed">No Active Operations</div>
                )}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
