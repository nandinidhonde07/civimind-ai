"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { 
  BarChart3, Users, Building2, Server, MoreHorizontal, 
  ShieldCheck, ArrowUpRight, Cpu 
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

const complaintTrend = [
  { name: 'Week 1', total: 400, resolved: 300 },
  { name: 'Week 2', total: 450, resolved: 380 },
  { name: 'Week 3', total: 320, resolved: 350 },
  { name: 'Week 4', total: 500, resolved: 420 },
];

const systemHealth = [
  { name: 'API Latency', value: '45ms', status: 'Healthy' },
  { name: 'Database Load', value: '32%', status: 'Healthy' },
  { name: 'AI Service', value: '99.9%', status: 'Warning' },
  { name: 'Storage', value: '1.2 TB', status: 'Healthy' },
];

const officersList = [
  { id: 'OFF-01', name: 'Sarah Jenkins', dept: 'Public Works', role: 'Supervisor', status: 'Active' },
  { id: 'OFF-02', name: 'Michael Chen', dept: 'Water Board', role: 'Field Agent', status: 'Active' },
  { id: 'OFF-03', name: 'David Rossi', dept: 'Electricity', role: 'Field Agent', status: 'On Leave' },
  { id: 'OFF-04', name: 'Elena Smith', dept: 'Sanitation', role: 'Supervisor', status: 'Active' },
  { id: 'OFF-05', name: 'James Wilson', dept: 'Police (Traffic)', role: 'Field Agent', status: 'Inactive' },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Portal</h1>
          <p className="text-muted-foreground mt-1">Global oversight, performance indexing, and entity management.</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
           <Avatar className="h-8 w-8">
             <AvatarFallback className="bg-red-600 text-white">SA</AvatarFallback>
           </Avatar>
           <div className="text-sm">
             <p className="font-semibold leading-none">System Admin</p>
             <p className="text-zinc-500 text-xs">Root Access</p>
           </div>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-zinc-900/50 border border-white/5 p-1 rounded-xl">
          <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-zinc-800"><BarChart3 className="w-4 h-4 mr-2"/> Analytics</TabsTrigger>
          <TabsTrigger value="management" className="rounded-lg data-[state=active]:bg-zinc-800"><Users className="w-4 h-4 mr-2"/> Entity Management</TabsTrigger>
        </TabsList>
        
        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="mt-8 space-y-8">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Total Complaints (MTD)</CardTitle>
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">1,670</div>
                <p className="text-[10px] uppercase text-emerald-400 flex items-center mt-1"><ArrowUpRight className="w-3 h-3 mr-1"/> 14% vs last month</p>
              </CardContent>
            </Card>
             <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">AI Routing Accuracy</CardTitle>
                <Cpu className="w-4 h-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400 tracking-tight">98.2%</div>
                <p className="text-[10px] uppercase text-zinc-500 mt-1">Based on 1,600 automated decisions</p>
              </CardContent>
            </Card>
             <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Duplicates Prevented</CardTitle>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400 tracking-tight">342</div>
                <p className="text-[10px] uppercase text-zinc-500 mt-1">Approx 850 labor hours saved</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">System Health</CardTitle>
                <Server className="w-4 h-4 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-400 tracking-tight">Optimal</div>
                <p className="text-[10px] uppercase text-zinc-500 mt-1">All core services operational</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Department Performance Index */}
            <Card className="lg:col-span-3 bg-zinc-950 border-white/5 rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="tracking-tight text-xl">Department Performance Index</CardTitle>
                <CardDescription>Live composite score tracking SLA compliance, critical handling, and citizen rating.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-4">
                     <div className="flex justify-between items-center text-sm"><span className="font-semibold">1. Public Works</span><span className="text-emerald-400 font-mono">98.2</span></div>
                     <Progress value={98} className="h-2 bg-zinc-800 [&>div]:bg-emerald-500" />
                     <div className="flex justify-between text-xs text-zinc-500"><span>Resolution Rate: 99%</span><span>SLA: 97%</span></div>
                   </div>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center text-sm"><span className="font-semibold">2. Water Board</span><span className="text-blue-400 font-mono">92.4</span></div>
                     <Progress value={92} className="h-2 bg-zinc-800 [&>div]:bg-blue-500" />
                     <div className="flex justify-between text-xs text-zinc-500"><span>Resolution Rate: 94%</span><span>SLA: 91%</span></div>
                   </div>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center text-sm"><span className="font-semibold">3. Traffic Police</span><span className="text-orange-400 font-mono">76.8</span></div>
                     <Progress value={76} className="h-2 bg-zinc-800 [&>div]:bg-orange-500" />
                     <div className="flex justify-between text-xs text-zinc-500"><span>Resolution Rate: 82%</span><span>SLA: 65% (Warning)</span></div>
                   </div>
                 </div>
              </CardContent>
            </Card>

            {/* Main Area Chart */}
            <Card className="lg:col-span-2 bg-zinc-950 border-white/5 rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="tracking-tight">Complaint Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={complaintTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px'}} />
                    <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" />
                    <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* System Health Breakdown */}
            <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="tracking-tight">Infrastructure Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                      <div>
                        <p className="font-semibold text-sm tracking-tight text-zinc-200">{item.name}</p>
                        <p className="text-xs font-mono text-zinc-500 mt-1">{item.value}</p>
                      </div>
                      <Badge variant="outline" className={item.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* MANAGEMENT TAB */}
        <TabsContent value="management" className="mt-8">
          <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between p-8">
              <div>
                <CardTitle className="tracking-tight text-2xl">Officer Directory</CardTitle>
                <CardDescription>Manage user roles, access, and department assignments.</CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6">Add New Officer</Button>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="rounded-xl border border-white/5 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-zinc-900/50 border-white/5 hover:bg-zinc-900/50">
                      <TableHead className="text-zinc-500 uppercase text-[10px] tracking-widest">Officer ID</TableHead>
                      <TableHead className="text-zinc-500 uppercase text-[10px] tracking-widest">Name</TableHead>
                      <TableHead className="text-zinc-500 uppercase text-[10px] tracking-widest">Department</TableHead>
                      <TableHead className="text-zinc-500 uppercase text-[10px] tracking-widest">Role</TableHead>
                      <TableHead className="text-zinc-500 uppercase text-[10px] tracking-widest">Status</TableHead>
                      <TableHead className="text-right text-zinc-500 uppercase text-[10px] tracking-widest">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {officersList.map((officer) => (
                      <TableRow key={officer.id} className="border-white/5 hover:bg-zinc-900/30 transition-colors">
                        <TableCell className="font-mono text-xs text-zinc-400">{officer.id}</TableCell>
                        <TableCell className="font-semibold text-zinc-200">{officer.name}</TableCell>
                        <TableCell className="text-zinc-400">{officer.dept}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            {officer.role === 'Supervisor' ? <Building2 className="w-3 h-3 text-blue-400"/> : <Users className="w-3 h-3"/>}
                            {officer.role}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" 
                                 className={officer.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : officer.status === 'On Leave' ? 'bg-zinc-800 text-zinc-400 border-white/10' : 'bg-red-500/10 text-red-400 border-red-500/20'}>
                            {officer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10 rounded-xl">
                              <DropdownMenuItem className="focus:bg-zinc-900 cursor-pointer">Edit Officer</DropdownMenuItem>
                              <DropdownMenuItem className="focus:bg-zinc-900 cursor-pointer">Change Department</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer">Revoke Access</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
