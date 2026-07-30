/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2, Send, Bot, User, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const QUICK_REPLIES = [
  "Report a Pothole",
  "Water Leakage",
  "Check Complaint Status",
  "How does AI Detection work?",
  "Emergency Contacts"
];

const getAIResponse = (input: string, contextMemory: string[]): string => {
  const lower = input.toLowerCase();

  // Greetings
  if (lower.match(/^(hi|hello|hey|good morning|good evening)/)) {
    return "Hello! How can I assist you with CiviMind's municipal services today?";
  }

  // Demo Integration & Capabilities
  if (lower.includes("how do i report") || lower.includes("how to report")) {
    return "To report a complaint: 1. Capture a photo. 2. AI Detection analyzes it. 3. Automatic Department Assignment. 4. Officer Review. 5. Resolution & Citizen Notification.";
  }
  if (lower.includes("what departments are available") || lower.includes("list departments")) {
    return "CiviMind routes issues to: Roads, Water, Electricity, Sanitation, Traffic, and Public Health.";
  }
  if (lower.includes("how does ai work") || lower.includes("ai detection") || lower.includes("camera") || lower.includes("detect") || lower.includes("recognition")) {
    return "CiviMind AI analyzes uploaded images using object detection, estimates confidence, classifies the issue, predicts severity, and routes the complaint to the appropriate department.";
  }
  if (lower.includes("what can i do here") || lower.includes("capabilities")) {
    return "Citizens can report and track issues. Department Officers can review and resolve tickets. District Officials can view analytics, and Super Admins manage system health and overrides.";
  }

  // Status & Tracking (Memory context support)
  if (lower.includes("status") || lower.includes("track") || lower.includes("cmp") || lower.includes("ticket")) {
    if (contextMemory.includes("water") || contextMemory.includes("leakage")) {
      return "Your previously discussed water leakage complaint is currently assigned to the Water Department and is being processed.";
    }
    return "Complaint ID: CMP-2048\n\nStatus: In Progress\nDepartment: Roads\nAssigned Officer: Rahul Patil\nExpected Resolution: Today before 6:00 PM";
  }

  // Department specific routing
  if (lower.includes("road") || lower.includes("pothole") || lower.includes("crack") || lower.includes("damage") || lower.includes("street")) {
    return "The Roads Department handles pavement issues. Please navigate to the 'Submit Issue' tab and upload a clear photo of the pothole or damage for immediate AI triage.";
  }
  if (lower.includes("water") || lower.includes("leakage") || lower.includes("pipe") || lower.includes("tap") || lower.includes("burst")) {
    return "The Water Board handles leaks. CiviMind AI will prioritize severe burst pipes automatically. Please submit a report with location data.";
  }
  if (lower.includes("streetlight") || lower.includes("electricity") || lower.includes("power") || lower.includes("transformer") || lower.includes("electric")) {
    return "Electricity-related complaints are routed to the Power Grid. Critical hazards (like fallen transformers) receive an immediate 4-hour SLA.";
  }
  if (lower.includes("garbage") || lower.includes("waste") || lower.includes("trash") || lower.includes("dumping") || lower.includes("drainage")) {
    return "Sanitation complaints are batched and routed to local waste management units. AI will verify the scale of the waste accumulation from your photo.";
  }
  if (lower.includes("traffic") || lower.includes("signal") || lower.includes("parking") || lower.includes("congestion")) {
    return "Traffic Department officers will review signal malfunctions and severe congestion reports. Ensure you provide accurate GPS data.";
  }
  if (lower.includes("mosquito") || lower.includes("hygiene") || lower.includes("dead animal") || lower.includes("health")) {
    return "Public Health hazards are escalated immediately to the local health ward. Please report this through the Citizen portal right away.";
  }
  if (lower.includes("emergency")) {
    return "For life-threatening emergencies, please immediately dial 112 or your local emergency services hotline. CiviMind is for municipal infrastructure requests.";
  }

  return "I'm still learning. Currently I can help with complaint reporting, complaint tracking, AI detection, departments, and portal guidance.";
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Hello! I'm your CiviMind AI Assistant.\n\nI can help you:\n• Report civic issues\n• Track complaint status\n• Explain departments\n• Guide you through the portal\n• Answer Smart City questions",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [memoryContext, setMemoryContext] = useState<string[]>([]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    // Update session memory
    const newContext = text.toLowerCase().split(' ').filter(word => word.length > 3);
    setMemoryContext(prev => [...prev, ...newContext]);

    // Simulate network/typing delay
    setTimeout(() => {
      const responseText = getAIResponse(text, memoryContext);
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
      
      {/* Header */}
      <CardHeader className="bg-[#6BAED6] p-4 flex flex-row items-center justify-between shrink-0 m-0 rounded-t-xl cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#6BAED6]"></div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-white text-base leading-tight">CiviMind AI Assistant</h3>
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
          {/* Chat Area */}
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

          {/* Quick Replies (Only show if latest message is from AI and no user typing) */}
          {messages.length > 0 && messages[messages.length - 1].sender === 'ai' && !isTyping && !inputValue && (
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shadow-inner">
               {QUICK_REPLIES.map((reply, i) => (
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

          {/* Input Area */}
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
