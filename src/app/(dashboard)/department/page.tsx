"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, Clock, ListTodo,
  Sparkles, Star, ShieldAlert, ArrowRight, Camera, ShieldCheck
} from 'lucide-react';

export default function DepartmentDashboard() {
  const [resolutionGps, setResolutionGps] = useState('');
  
  const handleGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setResolutionGps(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`));
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Public Works Command Center</h1>
          <p className="text-muted-foreground mt-1">Manage AI-prioritized tasks, SLAs, and cross-department workflows.</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
           <Avatar className="h-8 w-8">
             <AvatarFallback className="bg-blue-600">SJ</AvatarFallback>
           </Avatar>
           <div className="text-sm">
             <p className="font-semibold leading-none">Sarah Jenkins</p>
             <p className="text-zinc-500 text-xs">Duty Supervisor</p>
           </div>
        </div>
      </div>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-white/5 shadow-xl rounded-2xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Assigned Today</CardTitle>
            <ListTodo className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">24</div>
            <p className="text-[10px] uppercase text-zinc-500 mt-1">+4 from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-red-950/20 border-red-900/30 shadow-xl rounded-2xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-red-400">Critical SLAs</CardTitle>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500 tracking-tight">3</div>
            <p className="text-[10px] uppercase text-red-500/70 mt-1">Escalation imminent</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-950 border-white/5 shadow-xl rounded-2xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">SLA Compliance</CardTitle>
            <Clock className="w-4 h-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-400 tracking-tight">94%</div>
            <p className="text-[10px] uppercase text-zinc-500 mt-1">Target: 90%</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-950 border-white/5 shadow-xl rounded-2xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Dept Score</CardTitle>
            <Star className="w-4 h-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400 tracking-tight">92</div>
            <p className="text-[10px] uppercase text-emerald-400 mt-1">Top 3 Department</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Kanban Board Area */}
        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 tracking-tight">
            <ListTodo className="w-5 h-5 text-blue-400"/> Operational Queue
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Column 1: Queue */}
            <div className="bg-zinc-900/30 rounded-2xl p-4 border border-white/5 flex flex-col gap-4 min-h-[500px]">
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-xs uppercase tracking-widest text-zinc-500">Triage Queue</h3>
                 <Badge variant="outline" className="border-white/10 text-zinc-400">4</Badge>
               </div>
               
               <Card className="bg-zinc-950 border-white/10 shadow-lg cursor-grab hover:border-blue-500/50 transition-all rounded-xl">
                 <CardContent className="p-5">
                   <div className="flex justify-between items-start mb-3">
                     <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse">Critical SLA</Badge>
                     <span className="text-[10px] uppercase text-zinc-500 font-mono">Auth Score: 95</span>
                   </div>
                   <h4 className="font-bold mb-1 tracking-tight text-zinc-100">Major Water Main Break</h4>
                   <p className="text-xs text-zinc-400 mb-4 line-clamp-2">High pressure water erupting. Reported by 48 citizens.</p>
                   
                   <div className="mb-4 bg-black/50 p-2 rounded-lg border border-white/5">
                     <div className="text-[10px] uppercase text-zinc-500 mb-1 flex justify-between"><span>SLA Timer</span> <span className="text-red-400">00:45:12 left</span></div>
                     <Progress value={90} className="h-1.5 [&>div]:bg-red-500" />
                     <div className="text-[10px] text-zinc-500 mt-1">Escalated to: District Officer (Level 2)</div>
                   </div>

                   <div className="flex gap-2 w-full">
                     <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Accept Task</Button>
                   </div>
                 </CardContent>
               </Card>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-zinc-900/30 rounded-2xl p-4 border border-white/5 flex flex-col gap-4 min-h-[500px]">
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-xs uppercase tracking-widest text-blue-400">In Progress</h3>
                 <Badge className="bg-blue-600">1</Badge>
               </div>
               
               <Card className="bg-zinc-950 border-blue-500/30 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] relative overflow-hidden rounded-xl">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                 <CardContent className="p-5">
                   <div className="flex justify-between items-start mb-3">
                     <Badge variant="outline" className="text-orange-400 border-orange-400/30">High Priority</Badge>
                     <span className="text-[10px] text-zinc-500 font-mono">CIVI-388</span>
                   </div>
                   <h4 className="font-bold mb-1 tracking-tight text-zinc-100">Fallen Tree blocking Road</h4>
                   <p className="text-xs text-zinc-400 mb-4">Multi-department response required.</p>
                   
                   <div className="mb-4 p-3 bg-zinc-900 rounded-lg border border-white/5">
                     <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Workflow Status</div>
                     <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="flex items-center text-emerald-400"><CheckCircle2 className="w-3 h-3 mr-1"/> Forestry</span>
                        <ArrowRight className="w-3 h-3 text-zinc-600" />
                        <span className="flex items-center font-bold text-blue-400 animate-pulse"><Clock className="w-3 h-3 mr-1"/> Public Works (You)</span>
                     </div>
                   </div>
                   
                   <Dialog>
                     <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-3 w-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                       <ShieldCheck className="w-4 h-4 mr-2" /> Complete Officer Verification
                     </DialogTrigger>
                     <DialogContent className="sm:max-w-[450px] bg-zinc-950 border-white/10 rounded-2xl">
                       <DialogHeader>
                         <DialogTitle className="tracking-tight">Government Verification</DialogTitle>
                         <DialogDescription>Submit undeniable proof of task completion.</DialogDescription>
                       </DialogHeader>
                       <div className="grid gap-4 py-4">
                         <div className="grid gap-1.5">
                           <Label className="text-xs uppercase text-zinc-500">Completion Photo</Label>
                           <Button variant="outline" className="w-full border-white/10 bg-zinc-900"><Camera className="w-4 h-4 mr-2"/> Take Photo (Geotagged)</Button>
                         </div>
                         <div className="grid gap-1.5">
                           <Label className="text-xs uppercase text-zinc-500 flex justify-between">GPS Location <Button variant="link" className="p-0 h-auto text-[10px]" onClick={handleGps}>Fetch</Button></Label>
                           <Input readOnly value={resolutionGps} placeholder="Requires live GPS match" className="bg-zinc-900 border-white/10" />
                         </div>
                         <div className="grid gap-1.5">
                           <Label className="text-xs uppercase text-zinc-500">Closing Remarks</Label>
                           <Textarea placeholder="Tree cleared and road swept." className="bg-zinc-900 border-white/10" />
                         </div>
                       </div>
                       <DialogFooter>
                         <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl w-full">Verify & Close Task</Button>
                       </DialogFooter>
                     </DialogContent>
                   </Dialog>
                 </CardContent>
               </Card>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI */}
        <div className="space-y-6">
           <Card className="bg-blue-950/10 border-blue-900/30 shadow-[0_0_30px_rgba(59,130,246,0.05)] rounded-2xl">
             <CardHeader className="pb-4 border-b border-white/5">
               <CardTitle className="flex items-center text-blue-400 text-lg tracking-tight">
                 <Sparkles className="w-5 h-5 mr-2" /> AI Command Assistant
               </CardTitle>
             </CardHeader>
             <CardContent className="pt-5 space-y-4">
                <div className="bg-zinc-900/80 p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Suggested Action</div>
                  <p className="text-sm font-medium text-zinc-200">Deploy emergency fill and barricade immediately.</p>
                  
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 mb-1">Possible Cause</div>
                      <p className="text-xs text-zinc-400">Heavy rainfall combined with heavy vehicle traffic.</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 mb-1">Risk Level</div>
                      <Badge variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/20">Critical Hazard</Badge>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 mb-1">Officer Rec.</div>
                      <p className="text-xs text-emerald-400">Road Maintenance Team Alpha (2.1km away)</p>
                    </div>
                  </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
