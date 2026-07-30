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
  Send, AlertTriangle, ShieldCheck, Users, XCircle, ShieldAlert, BarChart3
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

  // Capture GPS
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

  // Capture Camera
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
    // Mock image upload
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    stopCamera();
    
    try {
      const result = await analyzeComplaint(title, description, location, hasImage);
      setAiResult(result);
      
      // Calculate Authenticity
      let score = 50; // Base
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
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Citizen Portal</h1>
        <p className="text-muted-foreground mt-1">Report issues, verify community reports, and track resolutions transparently.</p>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[500px]">
          <TabsTrigger value="submit">Report Issue</TabsTrigger>
          <TabsTrigger value="history">Timeline</TabsTrigger>
          <TabsTrigger value="transparency">Public Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          {!isSubmitted ? (
            <Card className="bg-card border-white/5 shadow-2xl backdrop-blur rounded-2xl">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl tracking-tight">Report a New Issue</CardTitle>
                <CardDescription>Details are analyzed instantly. Attach an image and GPS for higher priority.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-zinc-500">Complaint Title</Label>
                    <Input required placeholder="e.g. Large pothole on 5th Avenue causing traffic hazards" value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 bg-zinc-900/50 border-white/10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-zinc-500">Description</Label>
                    <Textarea required placeholder="Please describe the issue in detail..." className="h-32 bg-zinc-900/50 border-white/10" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-widest text-zinc-500 flex justify-between">
                          Location
                          {gpsData && <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> GPS Verified</span>}
                        </Label>
                        <div className="flex gap-2">
                          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter manually or use GPS" className="bg-zinc-900/50 border-white/10 h-10" />
                          <Button type="button" variant="outline" size="icon" onClick={handleGPS} className="border-white/10 hover:bg-zinc-800">
                            <MapPin className="w-4 h-4" />
                          </Button>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-widest text-zinc-500">Evidence (Optional)</Label>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" className="w-full border-white/10 hover:bg-zinc-800" onClick={startCamera}>
                            <Camera className="mr-2 w-4 h-4"/> Live Camera
                          </Button>
                          <Button type="button" variant="outline" className="w-full border-white/10 hover:bg-zinc-800" onClick={handleUpload}>
                            <ImageIcon className="mr-2 w-4 h-4"/> Upload EXIF
                          </Button>
                        </div>
                     </div>
                  </div>

                  {/* Camera / Image Preview Area */}
                  <div className="bg-zinc-900/30 p-4 rounded-xl border border-white/10 border-dashed flex items-center justify-center text-muted-foreground text-sm min-h-[100px] overflow-hidden relative">
                    {stream ? (
                       <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                    ) : hasImage ? (
                       <span className="flex items-center text-emerald-400"><ShieldCheck className="w-4 h-4 mr-2"/> Geotagged Media Attached</span>
                    ) : (
                       <span>No image provided. Will be marked &quot;Pending Verification&quot;.</span>
                    )}
                  </div>

                  <Button type="submit" disabled={isSubmitting || !title || !description} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)]">
                    {isSubmitting ? (
                      <span className="flex items-center"><Sparkles className="mr-2 w-5 h-5 animate-pulse" /> AI Verification in Progress...</span>
                    ) : (
                      <span className="flex items-center"><Send className="mr-2 w-5 h-5" /> Submit & Verify</span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <div className="flex items-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6 mr-3" />
                    <span className="text-lg font-medium tracking-tight">Complaint Submitted & Verified</span>
                  </div>
                  {aiResult?.duplicateProbability && aiResult.duplicateProbability > 70 && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      <Users className="w-3 h-3 mr-1"/> Merged with 12 similar reports
                    </Badge>
                  )}
               </div>
               
               {aiResult && (
                 <Card className="bg-zinc-950 border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                   <CardHeader className="bg-gradient-to-r from-blue-900/20 to-transparent border-b border-white/5 p-6">
                     <div className="flex items-center justify-between">
                       <CardTitle className="flex items-center text-blue-400 text-xl tracking-tight">
                         <Sparkles className="w-5 h-5 mr-2" />
                         AI Diagnostic Report
                       </CardTitle>
                       <div className="flex items-center gap-4">
                         <div className="flex items-center flex-col items-end">
                           <span className="text-[10px] uppercase tracking-widest text-zinc-500">Authenticity</span>
                           <span className={`font-mono font-bold ${authenticityScore >= 80 ? 'text-emerald-400' : 'text-orange-400'}`}>{authenticityScore}/100</span>
                         </div>
                         <Badge variant="outline" className="bg-zinc-900 font-mono border-white/10">CIVI-9482X</Badge>
                       </div>
                     </div>
                   </CardHeader>
                   <CardContent className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Category</span>
                          <div className="font-medium text-zinc-200">{aiResult.category}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Route To</span>
                          <div className="font-medium text-zinc-200">{aiResult.suggestedDepartment}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Priority</span>
                          <div>
                            <Badge className={aiResult.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-zinc-800'}>
                              {aiResult.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-zinc-500">SLA</span>
                          <div className="font-medium flex items-center text-blue-400"><Clock className="w-4 h-4 mr-1"/> {aiResult.estimatedResolution}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                         <div className="bg-zinc-900/50 p-5 rounded-xl border border-white/5">
                           <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Image Verification</h4>
                           {hasImage ? (
                             <div className="flex items-start gap-3">
                               {aiResult.imageVerification.validImage ? <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />}
                               <div>
                                 <p className="text-sm font-medium text-zinc-200">{aiResult.imageVerification.detectedIssue}</p>
                                 <p className="text-xs text-zinc-500 mt-1">AI Confidence: {aiResult.imageVerification.confidence}%</p>
                               </div>
                             </div>
                           ) : (
                             <div className="flex items-center text-orange-400 text-sm">
                               <ShieldAlert className="w-4 h-4 mr-2"/> Pending Field Verification (No Image)
                             </div>
                           )}
                         </div>

                         <div className="bg-zinc-900/50 p-5 rounded-xl border border-white/5">
                           <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Multi-Dept Workflow</h4>
                           <div className="flex items-center gap-2 text-sm text-zinc-300 flex-wrap">
                             {aiResult.departmentsRequired?.map((dept, i) => (
                               <div key={i} className="flex items-center">
                                 <Badge variant="outline" className="border-white/10 bg-black">{dept}</Badge>
                                 {i < aiResult.departmentsRequired.length - 1 && <span className="mx-1 text-zinc-600">→</span>}
                               </div>
                             ))}
                           </div>
                         </div>
                      </div>
                      
                      <Button onClick={() => { setIsSubmitted(false); setTitle(''); setDescription(''); setHasImage(false); setGpsData(null); }} variant="outline" className="w-full h-12 rounded-xl border-white/10 hover:bg-zinc-900">
                        Submit Another Complaint
                      </Button>
                   </CardContent>
                 </Card>
               )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="bg-card border-white/5 rounded-2xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="tracking-tight">Complaint Timeline</CardTitle>
              <CardDescription>Track status and verify community reports.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-8">
                {/* Active Complaint */}
                <div className="relative pl-8 border-l border-white/10 pb-4">
                   <div className="absolute -left-[9px] top-0 bg-blue-500 rounded-full p-1 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                     <Clock className="w-2.5 h-2.5 text-white" />
                   </div>
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="font-semibold text-lg tracking-tight text-zinc-100">{title || "Large pothole on 5th Avenue"}</h4>
                     <Badge className="bg-blue-500/20 text-blue-400">In Progress</Badge>
                   </div>
                   <p className="text-xs text-zinc-500 mb-4">ID: CIVI-9482X • Auth Score: 85/100</p>
                   
                   <div className="bg-zinc-900/50 rounded-xl p-5 space-y-4 border border-white/5">
                      <div className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3" />
                        <span className="text-zinc-500 mr-2">10:15 AM:</span> <span className="text-zinc-300">AI verified and merged with 12 duplicates.</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 mr-3 animate-pulse" />
                        <span className="text-blue-400 mr-2 font-medium">Current:</span> <span className="text-zinc-300">Water Dept task completed. Awaiting Roads Dept.</span>
                      </div>
                   </div>

                   {/* Community Verification */}
                   <div className="mt-4 flex items-center gap-3">
                     <span className="text-xs uppercase tracking-widest text-zinc-500 mr-2">Community Verify:</span>
                     <Button size="sm" variant="outline" className="h-8 border-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30">
                       <CheckCircle2 className="w-3 h-3 mr-1"/> Still Exists
                     </Button>
                     <Button size="sm" variant="outline" className="h-8 border-white/10 hover:bg-zinc-800">
                       <XCircle className="w-3 h-3 mr-1"/> Resolved
                     </Button>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Public Transparency Dashboard */}
        <TabsContent value="transparency" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-zinc-900 border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <BarChart3 className="w-6 h-6 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold tracking-tight">24h 12m</h3>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Avg Resolution Time</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <Users className="w-6 h-6 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold tracking-tight">92%</h3>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Citizen Satisfaction</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-white/5 rounded-2xl col-span-1 md:col-span-3 p-6">
               <h3 className="text-sm font-semibold mb-4 tracking-tight">Department Leaderboard</h3>
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm mb-1"><span className="text-zinc-300">Public Works</span><span className="text-emerald-400">98 Score</span></div>
                   <Progress value={98} className="h-1 bg-zinc-800" />
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1"><span className="text-zinc-300">Water Board</span><span className="text-blue-400">85 Score</span></div>
                   <Progress value={85} className="h-1 bg-zinc-800" />
                 </div>
               </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
