import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ShieldCheck, SearchCheck, Building2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7FBFF] text-slate-800 flex flex-col font-sans">
      
      {/* Government Header Bar */}
      <div className="bg-[#1E293B] text-white px-8 py-2 text-xs font-medium tracking-wide flex justify-between items-center z-10 relative">
         <div className="flex items-center gap-4">
           <span>National Informatics Centre (NIC)</span>
           <span className="opacity-50">|</span>
           <span>Government AI Operations Initiative</span>
         </div>
         <div className="flex items-center gap-4">
           <a href="#" className="hover:text-[#6BAED6] transition-colors">Skip to main content</a>
           <a href="#" className="hover:text-[#6BAED6] transition-colors">Accessibility</a>
         </div>
      </div>

      <header className="px-8 py-5 border-b border-slate-200 bg-white shadow-sm flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6BAED6] flex items-center justify-center text-white font-bold shadow-md">
            C
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">CiviMind AI</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Smart City Grid</p>
          </div>
        </div>
        <nav className="space-x-6 flex items-center">
          <Link href="/citizen" className="text-sm font-bold text-slate-600 hover:text-[#6BAED6] transition-colors">Citizen Portal</Link>
          <Link href="/department" className="text-sm font-bold text-slate-600 hover:text-[#6BAED6] transition-colors">Department Access</Link>
          <Link href="/district" className="text-sm font-bold text-slate-600 hover:text-[#6BAED6] transition-colors">District Matrix</Link>
          <Link href="/admin">
            <Button className="bg-[#1E293B] hover:bg-slate-800 text-white shadow-sm font-bold rounded-xl h-10 px-6">
              Admin Login
            </Button>
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="w-full bg-white border-b border-slate-200 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#DEEBF7]/30" style={{
             backgroundImage: `radial-gradient(circle at center, #6BAED6 1px, transparent 1px)`,
             backgroundSize: '48px 48px'
          }}></div>
          
          <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
             <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-none shadow-none font-bold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest text-xs flex items-center">
               <div className="w-2 h-2 rounded-full bg-[#22C55E] mr-2 animate-pulse"></div> Secure Government Node Active
             </Badge>
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
               Next-Generation <br/> <span className="text-[#6BAED6]">Municipal Operations.</span>
             </h2>
             <p className="text-xl text-slate-500 font-medium max-w-2xl mb-10 leading-relaxed">
               Securely report public infrastructure issues. Our national AI engine validates, categorizes, and automatically dispatches field officers in real-time.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <Link href="/citizen" className="w-full sm:w-auto">
                 <Button size="lg" className="w-full h-14 px-8 text-lg bg-[#6BAED6] hover:bg-[#5a9ac0] text-white font-bold rounded-xl shadow-md">
                   File a Report <ArrowRight className="ml-2 w-5 h-5" />
                 </Button>
               </Link>
               <Link href="/department" className="w-full sm:w-auto">
                 <Button size="lg" variant="outline" className="w-full h-14 px-8 text-lg bg-white border-slate-200 text-slate-600 font-bold rounded-xl shadow-sm hover:bg-slate-50">
                   Officer Login
                 </Button>
               </Link>
             </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full bg-[#F7FBFF] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#6BAED6] mb-2">Core Infrastructure</h3>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Enterprise-Grade Public Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#DEEBF7] rounded-2xl flex items-center justify-center mb-6">
                   <SearchCheck className="w-7 h-7 text-[#6BAED6]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-3">AI Vision Verification</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Images uploaded by citizens are cryptographically scanned and validated by AI to prevent fraudulent reporting and assess severity instantly.</p>
              </Card>
              
              <Card className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#22C55E]/5 rounded-bl-full"></div>
                <div className="w-14 h-14 bg-[#22C55E]/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                   <Building2 className="w-7 h-7 text-[#22C55E]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-3">Automated Dispatch</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Advanced language models understand the context of the issue and automatically route it to the exact required government department workflows.</p>
              </Card>

              <Card className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                   <ShieldCheck className="w-7 h-7 text-[#F59E0B]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-3">SLA Enforcement</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Strict timeline tracking ensures all municipal issues are resolved within government mandated Service Level Agreements.</p>
              </Card>
            </div>
          </div>
        </div>

      </main>

      {/* Government Footer */}
      <footer className="bg-[#1E293B] text-slate-400 py-12 text-center text-sm border-t border-slate-800">
         <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-slate-400" />
            </div>
            <p className="mb-4">Designed for the Ministry of Electronics & Information Technology (MeitY) and Smart Cities Mission.</p>
            <div className="flex gap-6 font-medium text-slate-500">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
         </div>
      </footer>
    </div>
  );
}

function Badge({ className, children }: { className?: string, children: React.ReactNode }) {
  return <span className={`inline-flex items-center ${className}`}>{children}</span>
}
