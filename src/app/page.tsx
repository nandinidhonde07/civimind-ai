
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Activity, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-8 py-6 border-b border-border/40 backdrop-blur-md flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          CiviMind AI
        </div>
        <nav className="space-x-4">
          <Link href="/citizen"><Button variant="ghost">Citizen Portal</Button></Link>
          <Link href="/department"><Button variant="ghost">Officers</Button></Link>
          <Link href="/admin"><Button variant="outline">Admin</Button></Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          AI-Powered <br/> Public Service Automation
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Submit complaints, let AI understand them, prioritize them, and automatically route them to the correct department.
        </p>
        <div className="flex gap-4">
          <Link href="/citizen">
            <Button size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              Report Issue <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/admin">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-lg rounded-full">
              View Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 text-left">
            <Zap className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Routing</h3>
            <p className="text-muted-foreground">Automatically classifies and routes complaints to the correct department instantly.</p>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 text-left">
            <Shield className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Duplicate Detection</h3>
            <p className="text-muted-foreground">Identifies similar complaints to prevent duplicate work and group issues effectively.</p>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 text-left">
            <Activity className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
            <p className="text-muted-foreground">Forecasts upcoming hotspots and workload to allocate resources proactively.</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
