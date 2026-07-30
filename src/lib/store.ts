import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ComplaintStatus = 'Pending Triage' | 'In Progress' | 'Resolved' | 'Rejected' | 'Transferred';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface TimelineEvent {
  status: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  hasImage: boolean;
  category: string;
  department: string;
  priority: Priority;
  status: ComplaintStatus;
  timeline: TimelineEvent[];
  authenticityScore: number;
  duplicateProbability: number;
  estimatedResolution: string;
  submittedAt: string;
  resolvedAt?: string;
}

interface CiviMindStore {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'timeline' | 'submittedAt'>) => string;
  updateStatus: (id: string, newStatus: ComplaintStatus, department?: string) => void;
  seedData: () => void;
  clearStore: () => void;
}

const generateId = () => `CIV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

const MOCK_SEED: Complaint[] = [
  {
    id: 'CIV-2026-8472',
    title: 'Major Water Main Break',
    description: 'High pressure water erupting on 5th Avenue. Street is flooding rapidly.',
    location: 'Lat: 40.7128, Lng: -74.0060',
    hasImage: true,
    category: 'Infrastructure',
    department: 'Water Board',
    priority: 'Critical',
    status: 'Pending Triage',
    timeline: [
      { status: 'Complaint Submitted', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { status: 'AI Verified', timestamp: new Date(Date.now() - 3590000).toISOString() }
    ],
    authenticityScore: 95,
    duplicateProbability: 82,
    estimatedResolution: '4 hours',
    submittedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'CIV-2026-9283',
    title: 'Fallen Tree blocking Road',
    description: 'Large oak tree fell across Main Street during the storm.',
    location: 'Lat: 40.7282, Lng: -73.9942',
    hasImage: true,
    category: 'Environment',
    department: 'Forestry',
    priority: 'High',
    status: 'In Progress',
    timeline: [
      { status: 'Complaint Submitted', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { status: 'AI Verified', timestamp: new Date(Date.now() - 7190000).toISOString() },
      { status: 'Assigned to Department', timestamp: new Date(Date.now() - 7000000).toISOString() },
      { status: 'Officer Accepted', timestamp: new Date(Date.now() - 6800000).toISOString() },
      { status: 'In Progress', timestamp: new Date(Date.now() - 3600000).toISOString() }
    ],
    authenticityScore: 88,
    duplicateProbability: 15,
    estimatedResolution: '2 hours',
    submittedAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'CIV-2026-1192',
    title: 'Streetlights Out',
    description: 'Entire block is completely dark on Elm Street, very dangerous for pedestrians.',
    location: 'Lat: 40.7302, Lng: -73.9901',
    hasImage: false,
    category: 'Electrical',
    department: 'Electricity',
    priority: 'Medium',
    status: 'Pending Triage',
    timeline: [
      { status: 'Complaint Submitted', timestamp: new Date(Date.now() - 86400000).toISOString() }
    ],
    authenticityScore: 45,
    duplicateProbability: 95,
    estimatedResolution: '24 hours',
    submittedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'CIV-2026-4421',
    title: 'Missed Garbage Collection',
    description: 'Garbage bins overflowing, not collected for 3 days.',
    location: 'Lat: 40.7410, Lng: -73.9890',
    hasImage: true,
    category: 'Sanitation',
    department: 'Sanitation',
    priority: 'Low',
    status: 'Resolved',
    timeline: [
      { status: 'Complaint Submitted', timestamp: new Date(Date.now() - 172800000).toISOString() },
      { status: 'In Progress', timestamp: new Date(Date.now() - 86400000).toISOString() },
      { status: 'Resolved', timestamp: new Date(Date.now() - 3600000).toISOString() }
    ],
    authenticityScore: 92,
    duplicateProbability: 10,
    estimatedResolution: '2 days',
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
    resolvedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'CIV-2026-8833',
    title: 'Massive Pothole',
    description: 'Tire-popping pothole on the fast lane of I-95.',
    location: 'Lat: 40.8110, Lng: -73.9290',
    hasImage: true,
    category: 'Roadways',
    department: 'Public Works',
    priority: 'Critical',
    status: 'In Progress',
    timeline: [
      { status: 'Complaint Submitted', timestamp: new Date(Date.now() - 5000000).toISOString() },
      { status: 'Officer Accepted', timestamp: new Date(Date.now() - 4000000).toISOString() },
      { status: 'In Progress', timestamp: new Date(Date.now() - 2000000).toISOString() }
    ],
    authenticityScore: 99,
    duplicateProbability: 12,
    estimatedResolution: '8 hours',
    submittedAt: new Date(Date.now() - 5000000).toISOString()
  }
];

export const useStore = create<CiviMindStore>()(
  persist(
    (set) => ({
      complaints: [],

      addComplaint: (data) => {
        const id = generateId();
        const now = new Date().toISOString();
        const newComplaint: Complaint = {
          ...data,
          id,
          status: 'Pending Triage',
          submittedAt: now,
          timeline: [
            { status: 'Complaint Submitted', timestamp: now },
            { status: 'AI Verified', timestamp: new Date(Date.now() + 1000).toISOString() },
            { status: 'Department Assigned', timestamp: new Date(Date.now() + 2000).toISOString() }
          ]
        };
        set((state) => ({ complaints: [newComplaint, ...state.complaints] }));
        return id;
      },

      updateStatus: (id, newStatus, newDepartment) => set((state) => {
        const now = new Date().toISOString();
        const updatedComplaints = state.complaints.map(c => {
          if (c.id === id) {
            const newTimeline = [...c.timeline];
            
            if (newStatus === 'In Progress' && c.status === 'Pending Triage') {
               newTimeline.push({ status: 'Officer Accepted', timestamp: new Date(Date.now() - 2000).toISOString() });
            }
            if (newStatus === 'Transferred' && newDepartment) {
               newTimeline.push({ status: `Transferred to ${newDepartment}`, timestamp: now });
            } else {
               newTimeline.push({ status: newStatus, timestamp: now });
            }
            
            return {
              ...c,
              status: newStatus === 'Transferred' ? 'Pending Triage' : newStatus, // if transferred, it goes back to pending for the new dept
              department: newDepartment || c.department,
              timeline: newTimeline,
              resolvedAt: newStatus === 'Resolved' ? now : c.resolvedAt
            };
          }
          return c;
        });
        return { complaints: updatedComplaints };
      }),

      seedData: () => set((state) => {
        if (state.complaints.length === 0) {
          return { complaints: MOCK_SEED };
        }
        return state;
      }),
      
      clearStore: () => set({ complaints: [] })
    }),
    {
      name: 'civimind-storage',
    }
  )
);
