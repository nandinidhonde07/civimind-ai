"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, Clock, ListTodo, AlertTriangle, 
  Star, ArrowRight, Camera, ShieldCheck, 
  TrendingUp, ArrowUpRight,
  BrainCircuit, Users, Building2
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const sparklineDataGood = [{v: 10},{v: 15},{v: 12},{v: 20},{v: 18},{v: 25}];
const sparklineDataBad = [{v: 25},{v: 20},{v: 22},{v: 15},{v: 18},{v: 10}];

export default function DepartmentDashboard() {
  const [resolutionGps, setResolutionGps] = useState('');
  
  const handleGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setResolutionGps(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`));
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Public Works Command Center</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage AI-prioritized operations, SLAs, and multi-department execution.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
           <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
           <span className="text-sm font-semibold text-slate-700">Live AI Routing Active</span>
        </div>
      </div>
      
      {/* Executive KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Resolved Today</p>
                <h3 className="text-4xl font-black text-slate-800 tracking-tighter">1,248</h3>
              </div>
              <div className="p-2.5 bg-[#DEEBF7] rounded-xl text-[#6BAED6]"><CheckCircle2 className="w-5 h-5"/></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm font-semibold text-[#22C55E]">
                <ArrowUpRight className="w-4 h-4 mr-1"/> 18%
              </div>
              <div className="h-8 w-24">
                <ResponsiveContainer width="100%" height="100%"><LineChart data={sparklineDataGood}><Line type="monotone" dataKey="v" stroke="#22C55E" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium uppercase mt-2">Compared to yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Critical SLA Risk</p>
                <h3 className="text-4xl font-black text-slate-800 tracking-tighter">12</h3>
              </div>
              <div className="p-2.5 bg-orange-100 rounded-xl text-[#F59E0B]"><AlertTriangle className="w-5 h-5"/></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm font-semibold text-[#F59E0B]">
                <TrendingUp className="w-4 h-4 mr-1"/> +4
              </div>
              <div className="h-8 w-24">
                <ResponsiveContainer width="100%" height="100%"><LineChart data={sparklineDataBad}><Line type="monotone" dataKey="v" stroke="#F59E0B" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium uppercase mt-2">Requires immediate escalation</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">SLA Compliance</p>
                <h3 className="text-4xl font-black text-slate-800 tracking-tighter">94.2%</h3>
              </div>
              <div className="p-2.5 bg-[#DEEBF7] rounded-xl text-[#6BAED6]"><Clock className="w-5 h-5"/></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm font-semibold text-[#22C55E]">
                <ArrowUpRight className="w-4 h-4 mr-1"/> 2.1%
              </div>
              <div className="h-8 w-24">
                <ResponsiveContainer width="100%" height="100%"><LineChart data={sparklineDataGood}><Line type="monotone" dataKey="v" stroke="#22C55E" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium uppercase mt-2">Target benchmark: 90%</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Citizen Rating</p>
                <h3 className="text-4xl font-black text-slate-800 tracking-tighter">4.8</h3>
              </div>
              <div className="p-2.5 bg-yellow-100 rounded-xl text-yellow-600"><Star className="w-5 h-5 fill-current"/></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm font-semibold text-[#6BAED6]">
                <TrendingUp className="w-4 h-4 mr-1"/> Stable
              </div>
              <div className="h-8 w-24">
                <ResponsiveContainer width="100%" height="100%"><LineChart data={sparklineDataGood}><Line type="monotone" dataKey="v" stroke="#6BAED6" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium uppercase mt-2">Based on 842 verified reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Kanban Board Area */}
        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight text-slate-800">
            <ListTodo className="w-5 h-5 text-[#6BAED6]"/> Active Operations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Column 1: Triage */}
            <div className="bg-[#F7FBFF] rounded-3xl p-5 border border-slate-200 flex flex-col gap-5 min-h-[500px]">
               <div className="flex items-center justify-between">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-slate-600">Pending Triage</h3>
                 <Badge className="bg-white text-slate-600 border-slate-200 shadow-sm px-3 py-1">4</Badge>
               </div>
               
               <Card className="bg-white border-slate-200 shadow-sm cursor-grab hover:shadow-md hover:border-[#9ECAE1] transition-all rounded-2xl group">
                 <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                     <Badge className="bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20 hover:bg-[#EF4444]/20 font-bold px-3 py-1 flex items-center">
                       <AlertTriangle className="w-3.5 h-3.5 mr-1.5"/> Critical SLA
                     </Badge>
                     <span className="text-[11px] uppercase text-slate-400 font-bold tracking-wider bg-slate-100 px-2 py-1 rounded-md">CIVI-382</span>
                   </div>
                   <h4 className="font-bold text-lg mb-2 tracking-tight text-slate-800">Major Water Main Break</h4>
                   <p className="text-sm text-slate-500 mb-5 leading-relaxed font-medium">High pressure water erupting. Reported by 48 verified citizens in sector 4.</p>
                   
                   <div className="mb-5 bg-[#F7FBFF] p-4 rounded-xl border border-slate-100">
                     <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2 flex justify-between">
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5"/> Target SLA</span> 
                        <span className="text-[#EF4444]">00:45:12 left</span>
                     </div>
                     <Progress value={90} className="h-2 bg-slate-100 [&>div]:bg-[#EF4444]" />
                     <div className="text-[11px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Status: <span className="text-[#F59E0B]">Escalated to L2</span></div>
                   </div>

                   <Button className="w-full bg-[#6BAED6] hover:bg-[#5a9ac0] text-white rounded-xl h-11 shadow-sm font-bold tracking-wide">
                     Accept Assignment
                   </Button>
                 </CardContent>
               </Card>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-[#F7FBFF] rounded-3xl p-5 border border-slate-200 flex flex-col gap-5 min-h-[500px]">
               <div className="flex items-center justify-between">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#6BAED6]">In Progress</h3>
                 <Badge className="bg-[#6BAED6] text-white shadow-sm px-3 py-1">1</Badge>
               </div>
               
               <Card className="bg-white border-l-4 border-l-[#6BAED6] border-slate-200 shadow-md rounded-2xl overflow-hidden relative">
                 <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                     <Badge variant="outline" className="text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/5 font-bold px-3 py-1 flex items-center">
                       <TrendingUp className="w-3.5 h-3.5 mr-1.5"/> High Priority
                     </Badge>
                     <span className="text-[11px] uppercase text-slate-400 font-bold tracking-wider bg-slate-100 px-2 py-1 rounded-md">CIVI-388</span>
                   </div>
                   <h4 className="font-bold text-lg mb-2 tracking-tight text-slate-800">Fallen Tree blocking Road</h4>
                   <p className="text-sm text-slate-500 mb-5 leading-relaxed font-medium">Cross-department coordination required for safe removal.</p>
                   
                   <div className="mb-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3">Active Workflow</div>
                     <div className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-white p-2 rounded-lg border border-slate-200">
                        <span className="flex items-center text-[#22C55E]"><CheckCircle2 className="w-4 h-4 mr-1.5"/> Forestry</span>
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                        <span className="flex items-center font-bold text-[#6BAED6]"><div className="w-2 h-2 rounded-full bg-[#6BAED6] mr-2 animate-pulse"/> Public Works</span>
                     </div>
                   </div>
                   
                   <Dialog>
                     <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none disabled:opacity-50 h-11 px-4 w-full bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20 border border-[#22C55E]/20 rounded-xl shadow-sm">
                       <ShieldCheck className="w-5 h-5 mr-2" /> Government Verification
                     </DialogTrigger>
                     <DialogContent className="sm:max-w-[500px] bg-white border-slate-200 rounded-3xl p-8 shadow-2xl">
                       <DialogHeader>
                         <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800 flex items-center"><ShieldCheck className="w-6 h-6 mr-2 text-[#22C55E]"/> Completion Protocol</DialogTitle>
                         <DialogDescription className="text-slate-500 font-medium mt-2">
                           Submit verified proof of task completion to update national records.
                         </DialogDescription>
                       </DialogHeader>
                       <div className="grid gap-6 py-6">
                         <div className="grid gap-2">
                           <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Photographic Evidence</Label>
                           <Button variant="outline" className="w-full border-slate-200 bg-slate-50 hover:bg-slate-100 h-14 text-slate-600 rounded-xl font-medium"><Camera className="w-5 h-5 mr-3 text-slate-400"/> Capture Geotagged Photo</Button>
                         </div>
                         <div className="grid gap-2">
                           <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex justify-between">
                             GPS Validation <Button variant="link" className="p-0 h-auto text-[11px] font-bold text-[#6BAED6]" onClick={handleGps}>Capture Coordinates</Button>
                           </Label>
                           <Input readOnly value={resolutionGps} placeholder="Live GPS match required" className="bg-slate-50 border-slate-200 h-12 rounded-xl text-slate-800 font-mono text-sm" />
                         </div>
                         <div className="grid gap-2">
                           <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Official Remarks</Label>
                           <Textarea placeholder="Enter resolution details..." className="bg-slate-50 border-slate-200 min-h-[100px] rounded-xl text-slate-800" />
                         </div>
                       </div>
                       <DialogFooter>
                         <Button type="submit" className="bg-[#22C55E] hover:bg-[#1ea850] text-white rounded-xl w-full h-12 font-bold text-base shadow-sm">Submit Verification</Button>
                       </DialogFooter>
                     </DialogContent>
                   </Dialog>
                 </CardContent>
               </Card>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Command Panel */}
        <div className="space-y-6">
           <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
             <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-6">
               <CardTitle className="flex items-center text-[#6BAED6] text-xl font-bold tracking-tight">
                 <BrainCircuit className="w-6 h-6 mr-3" /> AI Operations Engine
               </CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Recommended Action</div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 shadow-sm leading-relaxed">
                    Deploy emergency fill and barricade immediately to prevent structural damage.
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">AI Confidence</div>
                    <div className="text-xl font-black text-slate-700 tracking-tight">98.2%</div>
                  </div>
                  <div className="bg-[#EF4444]/5 p-3 rounded-xl border border-[#EF4444]/10">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#EF4444] mb-1">Risk Level</div>
                    <div className="text-sm font-black text-[#EF4444] tracking-tight flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/> Critical</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-5">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center"><BrainCircuit className="w-3.5 h-3.5 mr-1.5"/> Causal Analysis</div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                      Heavy rainfall combined with prolonged heavy vehicle traffic causing foundation erosion.
                    </p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center"><Users className="w-3.5 h-3.5 mr-1.5"/> Optimal Resource</div>
                    <p className="text-sm font-bold text-[#6BAED6] flex items-center bg-[#DEEBF7]/30 p-3 rounded-lg">
                      <Building2 className="w-4 h-4 mr-2"/> Road Maint. Team Alpha
                      <Badge className="ml-auto bg-white text-slate-500 shadow-sm">2.1km</Badge>
                    </p>
                  </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
