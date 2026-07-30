"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, TrendingUp, Trophy, AlertCircle, BarChart3, 
  Activity, Star, ArrowUpRight, ArrowDownRight, Zap 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const performanceData = [
  { name: 'Water', resolved: 420, pending: 80, time: 24 },
  { name: 'Roads', resolved: 380, pending: 150, time: 48 },
  { name: 'Power', resolved: 550, pending: 40, time: 12 },
  { name: 'Health', resolved: 210, pending: 20, time: 8 },
  { name: 'Waste', resolved: 600, pending: 110, time: 36 },
];

const trendData = [
  { day: 'Mon', score: 82 },
  { day: 'Tue', score: 85 },
  { day: 'Wed', score: 84 },
  { day: 'Thu', score: 89 },
  { day: 'Fri', score: 92 },
  { day: 'Sat', score: 94 },
  { day: 'Sun', score: 96 },
];

export default function DistrictDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">District Intelligence</h1>
          <p className="text-muted-foreground mt-1">Cross-department analytics, spatial heatmaps, and performance indexing.</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
           <Avatar className="h-8 w-8">
             <AvatarFallback className="bg-purple-600">DO</AvatarFallback>
           </Avatar>
           <div className="text-sm">
             <p className="font-semibold leading-none text-zinc-100">Commander Robert Vance</p>
             <p className="text-zinc-500 text-xs">District Officer - North Zone</p>
           </div>
        </div>
      </div>
      
      {/* High Level Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Performance Index</CardTitle>
            <Activity className="w-4 h-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">94.2</div>
            <p className="text-[10px] uppercase text-emerald-400 flex items-center mt-1"><ArrowUpRight className="w-3 h-3 mr-1"/> 2.4% vs last week</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Avg Resolution Time</CardTitle>
            <BarChart3 className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">18h 45m</div>
            <p className="text-[10px] uppercase text-emerald-400 flex items-center mt-1"><ArrowDownRight className="w-3 h-3 mr-1"/> 4h faster vs last week</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Citizen Satisfaction</CardTitle>
            <Star className="w-4 h-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">4.82/5</div>
            <p className="text-[10px] uppercase text-emerald-400 flex items-center mt-1"><ArrowUpRight className="w-3 h-3 mr-1"/> 0.12 pts increase</p>
          </CardContent>
        </Card>
        <Card className="bg-red-950/20 border-red-900/30 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-red-400">Pending Critical</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500 tracking-tight">12</div>
            <p className="text-[10px] uppercase text-red-500/70 mt-1">Across 3 departments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col: Heatmap and AI Insights */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-zinc-950 border-white/5 rounded-2xl overflow-hidden relative min-h-[400px] flex flex-col shadow-xl">
            <CardHeader className="absolute top-0 left-0 z-10 w-full bg-gradient-to-b from-black to-transparent pb-10">
              <CardTitle className="flex items-center gap-2 text-xl tracking-tight"><MapPin className="w-5 h-5 text-purple-400"/> Live Complaint Heatmap</CardTitle>
              <CardDescription className="text-zinc-400">Real-time spatial distribution of critical issues.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-74.006,40.7128,12,0/800x400?access_token=dummy')] bg-cover bg-center">
               {/* Mock Heatmap Overlay */}
               <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
               
               {/* Heatmap Dots */}
               <div className="absolute top-[40%] left-[30%] w-32 h-32 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
               <div className="absolute top-[45%] left-[32%] w-4 h-4 bg-red-500 rounded-full border border-white/50 shadow-[0_0_15px_rgba(239,68,68,1)] z-20 flex items-center justify-center">
                 <span className="absolute w-8 h-8 bg-red-500/40 rounded-full animate-ping"></span>
               </div>

               <div className="absolute top-[20%] right-[25%] w-24 h-24 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
               <div className="absolute top-[22%] right-[28%] w-3 h-3 bg-orange-500 rounded-full border border-white/50 shadow-[0_0_10px_rgba(249,115,22,1)] z-20"></div>

               <div className="absolute bottom-[30%] left-[50%] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
               
               {/* Legend */}
               <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-xl p-3 rounded-xl border border-white/10 text-xs z-30 text-zinc-300">
                 <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div> Critical Density (Roads)</div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> High Density (Water)</div>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950/20 to-purple-950/20 border-white/5 rounded-2xl shadow-xl">
            <CardHeader className="pb-4 border-b border-white/5 p-6">
              <CardTitle className="flex items-center text-blue-400 text-lg tracking-tight">
                <Zap className="w-5 h-5 mr-2" /> Predictive AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="font-semibold text-xs uppercase tracking-widest mb-2 text-purple-400 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1"/> Volume Forecast
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">Historical data suggests a 45% spike in Power outages next Tuesday due to incoming storm fronts. Recommend pre-deploying maintenance crews.</p>
              </div>
              <div className="bg-zinc-900/50 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="font-semibold text-xs uppercase tracking-widest mb-2 text-emerald-400 flex items-center">
                  <Activity className="w-4 h-4 mr-1"/> Resource Allocation
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">The Roads Department is operating at 115% capacity. Reassigning 3 idle officers from the Waste Dept could reduce SLA breaches by 20%.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Leaderboards & Charts */}
        <div className="space-y-6">
          
          <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="flex items-center text-lg tracking-tight"><Trophy className="w-5 h-5 text-yellow-400 mr-2"/> Top Officers</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-4 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8"><AvatarFallback className="bg-emerald-600">MJ</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">Mark Johnson</p>
                    <p className="text-xs text-zinc-500">Power Dept</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">98.5 Score</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8"><AvatarFallback className="bg-blue-600">SL</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">Sarah Lee</p>
                    <p className="text-xs text-zinc-500">Water Dept</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">96.2 Score</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8"><AvatarFallback className="bg-purple-600">RT</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">Rajesh Thakur</p>
                    <p className="text-xs text-zinc-500">Health Dept</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">94.8 Score</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Department Rankings</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] p-6 pt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px'}} />
                  <Bar dataKey="resolved" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="pending" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-white/5 rounded-2xl shadow-xl">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-xs uppercase tracking-widest text-zinc-500">Performance Trend (7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="h-[150px] p-6 pt-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                  <Tooltip contentStyle={{backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px'}} />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
