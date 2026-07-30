"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, Clock, ListTodo, AlertTriangle, 
  ArrowRight, ShieldCheck, 
  TrendingUp, ArrowUpRight,
  BrainCircuit, Users, Building2
} from 'lucide-react';
import { useStore, Complaint } from '@/lib/store';

export default function DepartmentDashboard() {
  const [selectedIncident, setSelectedIncident] = useState<Complaint | null>(null);

  const complaints = useStore(state => state.complaints);
  const updateStatus = useStore(state => state.updateStatus);

  const pending = complaints.filter(c => c.status === 'Pending Triage');
  const inProgress = complaints.filter(c => c.status === 'In Progress');
  const resolved = complaints.filter(c => c.status === 'Resolved');
  
  const slaCompliance = complaints.length ? Math.round((resolved.length / complaints.length) * 100) : 100;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Public Works Command</h1>
          <p className="text-slate-500 mt-2 font-medium">Real-time infrastructure operations and AI task routing.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
           <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
           <span className="text-sm font-bold text-slate-700">Grid Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#EF4444]"></div>
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Critical Incidents</div>
              <div className="p-2 bg-[#EF4444]/10 text-[#EF4444] rounded-xl"><AlertTriangle className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">{complaints.filter(c => c.priority === 'Critical').length}</span>
              <div className="mt-2 text-sm font-semibold text-[#EF4444] flex items-center"><TrendingUp className="w-4 h-4 mr-1"/> Immediate Action Required</div>
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
              <div className="mt-2 text-sm font-semibold text-slate-500 flex items-center">Awaiting Officer Assign</div>
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
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">SLA Compliance</div>
              <div className="p-2 bg-[#22C55E]/10 text-[#22C55E] rounded-xl"><ShieldCheck className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">{slaCompliance}%</span>
              <div className="mt-2 text-sm font-semibold text-[#22C55E] flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> Within Target Metrics</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden h-full">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6">
              <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><ListTodo className="w-5 h-5 mr-2 text-[#6BAED6]"/> Active Operations Grid</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Pending Column */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner min-h-[500px]">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center justify-between">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-2"/> Pending Dispatch</span>
                    <Badge className="bg-white text-slate-600 border-slate-200 shadow-sm">{pending.length}</Badge>
                  </h3>
                  <div className="space-y-4">
                    {pending.map(c => (
                      <div key={c.id} onClick={() => setSelectedIncident(c)} className={`bg-white p-4 rounded-xl border ${selectedIncident?.id === c.id ? 'border-[#6BAED6] ring-2 ring-[#6BAED6]/20' : 'border-slate-200'} shadow-sm cursor-pointer hover:shadow-md transition-all group`}>
                         <div className="flex justify-between items-start mb-2">
                           <Badge className={`${c.priority === 'Critical' ? 'bg-[#EF4444]' : 'bg-[#F59E0B]'} text-white shadow-sm font-bold px-2 py-0.5 text-[10px]`}>{c.priority}</Badge>
                           <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#6BAED6] transition-colors">{c.id}</span>
                         </div>
                         <h4 className="font-bold text-slate-800 text-sm mb-1">{c.title}</h4>
                         <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-3">{c.description}</p>
                         <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                           <span><Clock className="w-3 h-3 inline mr-1"/> SLA: {c.estimatedResolution}</span>
                           <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                         </div>
                      </div>
                    ))}
                    {pending.length === 0 && (
                      <div className="text-center py-8 text-slate-400 text-xs font-bold uppercase tracking-widest">No Pending Incidents</div>
                    )}
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner min-h-[500px]">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center justify-between">
                    <span className="flex items-center"><Users className="w-4 h-4 mr-2"/> Field Units Active</span>
                    <Badge className="bg-white text-slate-600 border-slate-200 shadow-sm">{inProgress.length}</Badge>
                  </h3>
                  <div className="space-y-4">
                    {inProgress.map(c => (
                      <div key={c.id} onClick={() => setSelectedIncident(c)} className={`bg-white p-4 rounded-xl border ${selectedIncident?.id === c.id ? 'border-[#6BAED6] ring-2 ring-[#6BAED6]/20' : 'border-slate-200'} shadow-sm cursor-pointer hover:shadow-md transition-all group relative overflow-hidden`}>
                         <div className="absolute top-0 left-0 w-1 h-full bg-[#6BAED6]"></div>
                         <div className="flex justify-between items-start mb-2 pl-2">
                           <Badge className="bg-[#DEEBF7] text-[#6BAED6] shadow-sm font-bold px-2 py-0.5 text-[10px] border-none">Officer Deployed</Badge>
                           <span className="text-[10px] font-bold text-slate-400">{c.id}</span>
                         </div>
                         <h4 className="font-bold text-slate-800 text-sm mb-1 pl-2">{c.title}</h4>
                         <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-2 mt-3">
                           <span><Building2 className="w-3 h-3 inline mr-1"/> {c.department}</span>
                           <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                         </div>
                      </div>
                    ))}
                    {inProgress.length === 0 && (
                      <div className="text-center py-8 text-slate-400 text-xs font-bold uppercase tracking-widest">No Active Operations</div>
                    )}
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - AI Details */}
        <div className="space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden h-full">
            <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6">
              <CardTitle className="text-lg font-bold text-slate-800 tracking-tight flex items-center"><BrainCircuit className="w-5 h-5 mr-2 text-[#6BAED6]"/> Intelligence Briefing</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!selectedIncident ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <BrainCircuit className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-medium text-sm text-center">Select an incident from the grid to view AI diagnostics and authorize field actions.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-slate-100 text-slate-600 border-none font-bold text-[10px]">{selectedIncident.id}</Badge>
                      <Badge className={`${selectedIncident.priority === 'Critical' ? 'bg-[#EF4444]' : 'bg-[#F59E0B]'} text-white border-none font-bold text-[10px]`}>{selectedIncident.priority}</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{selectedIncident.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-2">{selectedIncident.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-inner">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Authenticity</span>
                      <span className={`text-xl font-black ${selectedIncident.authenticityScore >= 80 ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>{selectedIncident.authenticityScore}%</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-inner">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Risk Profile</span>
                      <span className="text-xl font-black text-[#EF4444]">High</span>
                    </div>
                  </div>
                  
                  {selectedIncident.hasImage && (
                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Cryptographic Vision Match</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">AI Confidence: 99.9%</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Command Directives</span>
                    
                    {selectedIncident.status === 'Pending Triage' && (
                      <>
                        <Button onClick={() => updateStatus(selectedIncident.id, 'In Progress')} className="w-full bg-[#6BAED6] hover:bg-[#5a9ac0] text-white shadow-sm font-bold h-12 rounded-xl">
                          Authorize Dispatch
                        </Button>
                        <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm font-bold h-12 rounded-xl">
                          Transfer Department
                        </Button>
                      </>
                    )}

                    {selectedIncident.status === 'In Progress' && (
                      <Button onClick={() => updateStatus(selectedIncident.id, 'Resolved')} className="w-full bg-[#22C55E] hover:bg-[#1ea850] text-white shadow-sm font-bold h-12 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 mr-2"/> Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
