/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Minimize2, Send, Bot, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const getRoleContext = (pathname: string | null) => {
  if (!pathname) return 'citizen';
  if (pathname.includes('department')) return 'department';
  if (pathname.includes('district')) return 'district';
  if (pathname.includes('admin')) return 'admin';
  return 'citizen';
};

const getRoleDetails = (role: string) => {
  switch(role) {
    case 'department': return {
      title: "Department Ops Assistant",
      initialMessage: "👋 Welcome Commander. I am your Department AI. I can assist with ticket triaging, field officer dispatch, and SLA compliance. How can we optimize operations today?",
      quickReplies: ["Pending Tickets", "SLA Status", "Dispatch Officer", "Clear Kanban"]
    };
    case 'district': return {
      title: "District Analytics AI",
      initialMessage: "👋 Hello District Official. I am your Analytics AI. I can generate reports, analyze department performance, and export global CSV data. What insights do you need?",
      quickReplies: ["Export CSV", "Best Department", "Weekly Volume", "Critical Issues"]
    };
    case 'admin': return {
      title: "Super Admin AI",
      initialMessage: "👋 System Admin recognized. I monitor global database health, API tokens, and allow status overrides. How can I assist with platform maintenance?",
      quickReplies: ["System Health", "Override Status", "Purge Database", "Active Nodes"]
    };
    default: return {
      title: "Citizen Assistant",
      initialMessage: "👋 Hello! I'm your CiviMind AI Assistant.\n\nI can help you:\n• Report civic issues\n• Track complaint status\n• Explain departments\n• Guide you through the portal",
      quickReplies: ["Report a Pothole", "Water Leakage", "Check Complaint Status", "Emergency"]
    };
  }
};

const getAIResponse = (input: string, contextMemory: string[], role: string): string => {
  const lower = input.toLowerCase();

  // Greetings
  if (lower.match(/^(hi|hello|hey|good morning|good evening)/)) {
    return "Hello! How can I assist you in the " + role + " portal today?";
  }

  // Common Citizen / Generic queries
  if (lower.includes("how do i report") || lower.includes("how to report")) return "To report a complaint: 1. Capture a photo. 2. AI Detection analyzes it. 3. Automatic Assignment.";
  if (lower.includes("status") || lower.includes("track") || lower.includes("cmp")) return "Complaint ID: CMP-2048\n\nStatus: In Progress\nAssigned Officer: Rahul Patil\nExpected Resolution: Today before 6:00 PM";
  if (lower.includes("ai detection") || lower.includes("camera") || lower.includes("detect")) return "CiviMind AI analyzes images using object detection, estimates confidence, and predicts severity to route complaints.";

  // Role-specific smart routing
  if (role === 'department') {
    if (lower.includes("pending") || lower.includes("ticket")) return "You have several tickets in Pending Triage. Review the critical ones highlighted in red and click 'Accept Assignment' to deploy field officers.";
    if (lower.includes("dispatch") || lower.includes("officer")) return "Once you accept a ticket, an automated dispatch protocol alerts the nearest available field unit.";
    if (lower.includes("sla")) return "Your current SLA compliance is calculated based on tickets resolved within their target 4 to 12 hour windows.";
  } else if (role === 'district') {
    if (lower.includes("export") || lower.includes("csv")) return "You can export the entire data grid by clicking the 'Export Global Data' button at the top right of your dashboard.";
    if (lower.includes("best") || lower.includes("performance")) return "The Live Department Efficacy chart shows Public Works currently has the highest resolution rate.";
    if (lower.includes("volume") || lower.includes("trend")) return "Complaint volumes typically peak on Mondays. Check the 7-Day Complaint Volume chart for precise metrics.";
  } else if (role === 'admin') {
    if (lower.includes("health") || lower.includes("system") || lower.includes("uptime")) return "All systems are operational. Uptime is 99.9%. Database latency is < 20ms.";
    if (lower.includes("override") || lower.includes("status")) return "You can click on any status badge in the Global Incident Records table to force an override without department approval.";
    if (lower.includes("purge") || lower.includes("delete")) return "Warning: Purging the database will wipe all Zustand global state. Seed data will regenerate on the next citizen login.";
  }

  // Advanced Dynamic Fallback (Generative Fake)
  // Extracts key words to formulate a smart-sounding answer
  const words = lower.split(' ').filter(w => w.length > 4 && !['about', 'would', 'could', 'should', 'there', 'their'].includes(w));
  if (words.length > 0) {
    const topic = words[0];
    return `Regarding "${topic}", our CiviMind AI handles this by analyzing the context and routing data through our real-time state engine. As a ${role}, you can monitor or manage ${topic}-related metrics directly through your active dashboard panels. Do you need specific analytics on this?`;
  }

  return "I am processing your request. CiviMind's architecture ensures all operations are securely logged. Can you provide more specific details so I can assist you better?";
};

export function Chatbot() {
  const pathname = usePathname();
  const role = getRoleContext(pathname);
  const { title, initialMessage, quickReplies } = getRoleDetails(role);

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [memoryContext, setMemoryContext] = useState<string[]>([]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize role-specific chat
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-' + role,
        sender: 'ai',
        text: initialMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [role, initialMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const newContext = text.toLowerCase().split(' ').filter(word => word.length > 3);
    setMemoryContext(prev => [...prev, ...newContext]);

    setTimeout(() => {
      const responseText = getAIResponse(text, memoryContext, role);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl bg-[#6BAED6] hover:bg-[#5a9ac0] text-white flex items-center justify-center transition-transform hover:scale-105 z-50 p-0"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </Button>
    );
  }

  return (
    <Card className={`fixed right-6 bottom-6 w-[380px] shadow-2xl border-slate-200 z-50 flex flex-col transition-all duration-300 ease-in-out bg-white overflow-hidden ${isMinimized ? 'h-[72px]' : 'h-[600px] max-h-[80vh]'}`}>
      
      <CardHeader className="bg-[#6BAED6] p-4 flex flex-row items-center justify-between shrink-0 m-0 rounded-t-xl cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#6BAED6]"></div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-white text-base leading-tight">{title}</h3>
            <span className="text-white/80 text-xs font-medium">Online • Local Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4 scroll-smooth" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-[#DEEBF7] flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-[#6BAED6]" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl whitespace-pre-wrap text-sm shadow-sm
                      ${msg.sender === 'user' 
                        ? 'bg-[#6BAED6] text-white rounded-tr-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>

                </div>
              </div>
            ))}
            
            {isTyping && (
               <div className="flex w-full justify-start animate-in fade-in">
                 <div className="flex max-w-[85%] gap-2 flex-row">
                   <div className="w-8 h-8 rounded-full bg-[#DEEBF7] flex items-center justify-center shrink-0">
                     <Bot className="w-4 h-4 text-[#6BAED6]" />
                   </div>
                   <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1 shadow-sm h-10">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                 </div>
               </div>
            )}
          </div>

          {messages.length > 0 && messages[messages.length - 1].sender === 'ai' && !isTyping && !inputValue && (
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shadow-inner">
               {quickReplies.map((reply, i) => (
                 <Badge 
                   key={i} 
                   onClick={() => handleSendMessage(reply)}
                   variant="outline" 
                   className="shrink-0 cursor-pointer bg-white border-[#6BAED6]/30 text-[#6BAED6] hover:bg-[#DEEBF7] hover:border-[#6BAED6] transition-colors py-1.5 font-semibold text-xs"
                 >
                   {reply}
                 </Badge>
               ))}
            </div>
          )}

          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <div className="relative flex items-center">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="pr-12 h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#6BAED6] rounded-xl shadow-sm text-sm"
                disabled={isTyping}
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                size="icon" 
                className="absolute right-1.5 h-9 w-9 bg-[#6BAED6] hover:bg-[#5a9ac0] text-white rounded-lg transition-all"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
