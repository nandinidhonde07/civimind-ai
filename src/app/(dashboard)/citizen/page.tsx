"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, MapPin, Camera, CheckCircle2, Clock, Image as ImageIcon, 
  Send, AlertTriangle, ShieldCheck, Users, XCircle, ShieldAlert, BarChart3, Building2,
  ChevronRight, BrainCircuit
} from 'lucide-react';
import { analyzeComplaint, AIAnalysisResult } from '@/app/actions/analyzeComplaint';
import { Progress } from "@/components/ui/progress";

export default function CitizenDashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [gpsData, setGpsData] = useState<{lat: number, lng: number, acc: number} | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [authenticityScore, setAuthenticityScore] = useState(0);

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGpsData({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          acc: position.coords.accuracy
        });
        setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
      });
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setHasImage(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      console.log("Camera access denied or unavailable, fallback to upload");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleUpload = () => {
    setHasImage(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    stopCamera();
    
    try {
      const result = await analyzeComplaint(title, description, location, hasImage);
      setAiResult(result);
      
      let score = 50; 
      if (gpsData) score += 20;
      if (hasImage && result.imageVerification.validImage) score += 20;
      if (result.duplicateProbability > 50) score += 10;
      setAuthenticityScore(Math.min(100, score));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Citizen Command Portal</h1>
        <p className="text-slate-500 mt-2 font-medium">Submit secure, verifiable reports directly to the Government AI Engine.</p>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[500px] bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm h-12">
          <TabsTrigger value="submit" className="rounded-lg data-[state=active]:bg-[#DEEBF7] data-[state=active]:text-[#6BAED6] data-[state=active]:font-bold font-medium text-slate-500 transition-all">Submit Issue</TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-[#DEEBF7] data-[state=active]:text-[#6BAED6] data-[state=active]:font-bold font-medium text-slate-500 transition-all">Active Trackers</TabsTrigger>
          <TabsTrigger value="transparency" className="rounded-lg data-[state=active]:bg-[#DEEBF7] data-[state=active]:text-[#6BAED6] data-[state=active]:font-bold font-medium text-slate-500 transition-all">Public Transparency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          {!isSubmitted ? (
            <Card className="bg-white border-slate-200 shadow-md rounded-3xl">
              <CardHeader className="p-8 pb-6 border-b border-slate-100 bg-[#F7FBFF] rounded-t-3xl">
                <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">Report a New Incident</CardTitle>
                <CardDescription className="text-slate-500 font-medium mt-1">Provide clear, actionable intelligence. AI will automatically route to the correct municipal department.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Complaint Title</Label>
                    <Input required placeholder="e.g. Large pothole on 5th Avenue causing traffic hazards" value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 bg-white border-slate-200 text-slate-800 font-medium focus-visible:ring-[#6BAED6] shadow-sm rounded-xl" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Description</Label>
                    <Textarea required placeholder="Please describe the issue in detail..." className="h-32 bg-white border-slate-200 text-slate-800 focus-visible:ring-[#6BAED6] shadow-sm rounded-xl resize-none" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex justify-between">
                          Spatial Data
                          {gpsData && <span className="text-[#22C55E] flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Secured</span>}
                        </Label>
                        <div className="flex gap-2">
                          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Auto-capture recommended" className="bg-white border-slate-200 h-12 shadow-sm rounded-xl text-slate-800 font-mono text-sm" />
                          <Button type="button" variant="outline" size="icon" onClick={handleGPS} className="border-slate-200 bg-white hover:bg-slate-50 h-12 w-12 rounded-xl shadow-sm text-slate-500">
                            <MapPin className="w-5 h-5" />
                          </Button>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Photographic Evidence</Label>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" className="w-full border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold h-12 rounded-xl shadow-sm" onClick={startCamera}>
                            <Camera className="mr-2 w-4 h-4"/> Live Capture
                          </Button>
                          <Button type="button" variant="outline" className="w-full border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold h-12 rounded-xl shadow-sm" onClick={handleUpload}>
                            <ImageIcon className="mr-2 w-4 h-4"/> Upload Media
                          </Button>
                        </div>
                     </div>
                  </div>

                  <div className="bg-[#F7FBFF] p-6 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-400 text-sm min-h-[160px] overflow-hidden relative shadow-inner">
                    {stream ? (
                       <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                    ) : hasImage ? (
                       <div className="flex flex-col items-center text-[#22C55E]">
                          <ShieldCheck className="w-8 h-8 mb-2" />
                          <span className="font-bold">Cryptographically Secured Media</span>
                          <span className="text-xs text-[#22C55E]/70 mt-1">Ready for AI processing</span>
                       </div>
                    ) : (
                       <div className="flex flex-col items-center">
                          <ImageIcon className="w-10 h-10 text-slate-300 mb-3" />
                          <span className="font-medium">No visual evidence provided. Complaint will require manual field verification.</span>
                       </div>
                    )}
                  </div>

                  <Button type="submit" disabled={isSubmitting || !title || !description} className="w-full bg-[#6BAED6] hover:bg-[#5a9ac0] text-white h-14 text-lg font-bold rounded-xl transition-all shadow-md">
                    {isSubmitting ? (
                      <span className="flex items-center"><Sparkles className="mr-2 w-6 h-6 animate-pulse" /> Executing AI Diagnostics...</span>
                    ) : (
                      <span className="flex items-center"><Send className="mr-2 w-6 h-6" /> Submit to Government Grid</span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl shadow-sm">
                  <div className="flex items-center text-[#22C55E]">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mr-4">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">Intelligence Logged</h3>
                      <p className="text-sm font-medium opacity-80">Reference ID: CIVI-9482X</p>
                    </div>
                  </div>
                  {aiResult?.duplicateProbability && aiResult.duplicateProbability > 70 && (
                    <Badge variant="secondary" className="bg-white text-[#6BAED6] border-slate-200 shadow-sm px-4 py-2 font-bold text-sm">
                      <Users className="w-4 h-4 mr-2"/> Collated with 12 similar reports
                    </Badge>
                  )}
               </div>
               
               {aiResult && (
                 <Card className="bg-white border-slate-200 rounded-3xl overflow-hidden shadow-lg">
                   <CardHeader className="bg-[#F7FBFF] border-b border-slate-100 p-8">
                     <div className="flex items-center justify-between">
                       <CardTitle className="flex items-center text-[#6BAED6] text-2xl font-bold tracking-tight">
                         <BrainCircuit className="w-7 h-7 mr-3" />
                         AI Diagnostic Report
                       </CardTitle>
                       <div className="flex items-center gap-6">
                         <div className="flex flex-col items-end">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Authenticity Rating</span>
                           <span className={`text-3xl font-black tracking-tighter ${authenticityScore >= 80 ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>{authenticityScore}</span>
                         </div>
                       </div>
                     </div>
                   </CardHeader>
                   <CardContent className="p-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Classification</span>
                          <div className="font-bold text-slate-800 text-lg">{aiResult.category}</div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Assigned To</span>
                          <div className="font-bold text-slate-800 text-lg flex items-center">
                            <Building2 className="w-4 h-4 mr-1.5 text-slate-400"/>
                            {aiResult.suggestedDepartment}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Priority Level</span>
                          <div>
                            <Badge className={`px-3 py-1 font-bold ${aiResult.priority === 'Critical' ? 'bg-[#EF4444] text-white' : 'bg-slate-100 text-slate-600'}`}>
                              {aiResult.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Target SLA</span>
                          <div className="font-bold flex items-center text-[#6BAED6] text-lg"><Clock className="w-5 h-5 mr-1.5"/> {aiResult.estimatedResolution}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                         <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
                           <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center"><Camera className="w-4 h-4 mr-2"/> Vision AI Verification</h4>
                           {hasImage ? (
                             <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                               {aiResult.imageVerification.validImage ? <ShieldCheck className="w-6 h-6 text-[#22C55E] mt-0.5" /> : <AlertTriangle className="w-6 h-6 text-[#F59E0B] mt-0.5" />}
                               <div>
                                 <p className="text-base font-bold text-slate-800">{aiResult.imageVerification.detectedIssue}</p>
                                 <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">AI Confidence: {aiResult.imageVerification.confidence}%</p>
                               </div>
                             </div>
                           ) : (
                             <div className="flex items-center text-[#F59E0B] font-bold bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                               <ShieldAlert className="w-5 h-5 mr-2"/> Pending Manual Field Verification (No Image)
                             </div>
                           )}
                         </div>

                         <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
                           <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center"><Users className="w-4 h-4 mr-2"/> Execution Workflow</h4>
                           <div className="flex items-center gap-2 text-sm text-slate-600 flex-wrap bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                             {aiResult.departmentsRequired?.map((dept, i) => (
                               <div key={i} className="flex items-center font-bold">
                                 <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-700 px-3 py-1 shadow-sm">{dept}</Badge>
                                 {i < aiResult.departmentsRequired.length - 1 && <ChevronRight className="mx-1 text-slate-300 w-5 h-5" />}
                               </div>
                             ))}
                           </div>
                         </div>
                      </div>
                      
                      <Button onClick={() => { setIsSubmitted(false); setTitle(''); setDescription(''); setHasImage(false); setGpsData(null); }} variant="outline" className="w-full h-14 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-base shadow-sm">
                        File Another Intelligence Report
                      </Button>
                   </CardContent>
                 </Card>
               )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="bg-white border-slate-200 shadow-md rounded-3xl">
            <CardHeader className="p-8 pb-6 border-b border-slate-100 bg-[#F7FBFF] rounded-t-3xl">
              <CardTitle className="tracking-tight text-2xl font-bold text-slate-800">Operational Timeline</CardTitle>
              <CardDescription className="text-slate-500 font-medium mt-1">Track the exact lifecycle of your reports across government departments.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              
              {/* Professional Timeline Component */}
              <div className="max-w-2xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                 {/* Step 1: Submit */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#6BAED6] text-white shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                     <CheckCircle2 className="w-5 h-5" />
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left">
                     <div className="flex items-center justify-between mb-2">
                       <h4 className="font-bold text-slate-800 text-base">Complaint Received</h4>
                       <span className="text-xs font-bold text-slate-400">09:00 AM</span>
                     </div>
                     <p className="text-sm text-slate-500 font-medium">Encrypted payload delivered to the central grid.</p>
                   </div>
                 </div>

                 {/* Step 2: AI */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#6BAED6] text-white shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                     <BrainCircuit className="w-5 h-5" />
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left">
                     <div className="flex items-center justify-between mb-2">
                       <h4 className="font-bold text-slate-800 text-base">AI Classification</h4>
                       <span className="text-xs font-bold text-slate-400">09:01 AM</span>
                     </div>
                     <p className="text-sm text-slate-500 font-medium">Vision AI authenticated imagery. Priority raised to High.</p>
                   </div>
                 </div>

                 {/* Step 3: Current */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white text-[#F59E0B] shadow-[0_0_0_2px_#F59E0B] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                     <Clock className="w-5 h-5 animate-pulse" />
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-orange-50 border-orange-200 p-5 rounded-2xl border shadow-sm text-left relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-[#F59E0B]"></div>
                     <div className="flex items-center justify-between mb-2">
                       <h4 className="font-bold text-slate-800 text-base">In Progress</h4>
                       <Badge className="bg-[#F59E0B] text-white px-2 py-0.5 text-[10px]">Active</Badge>
                     </div>
                     <p className="text-sm text-slate-600 font-medium">Public Works Department dispatched. ETA: 2 hours.</p>
                   </div>
                 </div>
              </div>

              {/* Community Verification */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 text-center">Community Oversight</h4>
                <div className="flex items-center justify-center gap-4">
                  <Button size="lg" className="bg-[#22C55E] hover:bg-[#1ea850] text-white rounded-xl shadow-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 mr-2"/> Issue Persists (Verify)
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl shadow-sm font-bold">
                    <XCircle className="w-5 h-5 mr-2"/> Issue Resolved
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Public Transparency Dashboard */}
        <TabsContent value="transparency" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-slate-200 rounded-3xl shadow-md">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#DEEBF7] rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-[#6BAED6]" />
                </div>
                <h3 className="text-4xl font-black tracking-tighter text-slate-800">24<span className="text-2xl text-slate-400">h</span> 12<span className="text-2xl text-slate-400">m</span></h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Avg Resolution Time</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-slate-200 rounded-3xl shadow-md">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#DEEBF7] rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[#6BAED6]" />
                </div>
                <h3 className="text-4xl font-black tracking-tighter text-[#22C55E]">92%</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Citizen Satisfaction</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-slate-200 rounded-3xl col-span-1 md:col-span-3 p-8 shadow-md">
               <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight flex items-center"><Building2 className="w-5 h-5 mr-2 text-slate-400"/> Department Leaderboard</h3>
               <div className="space-y-6">
                 <div>
                   <div className="flex justify-between text-sm mb-2 font-bold"><span className="text-slate-700">Public Works</span><span className="text-[#22C55E]">98 Score</span></div>
                   <Progress value={98} className="h-3 bg-slate-100 rounded-full [&>div]:bg-[#22C55E]" />
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-2 font-bold"><span className="text-slate-700">Water Board</span><span className="text-[#6BAED6]">85 Score</span></div>
                   <Progress value={85} className="h-3 bg-slate-100 rounded-full [&>div]:bg-[#6BAED6]" />
                 </div>
               </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
