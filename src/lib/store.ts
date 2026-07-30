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
  addComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'timeline' | 'submittedAt'>) => void;
  updateStatus: (id: string, newStatus: ComplaintStatus) => void;
  seedData: () => void;
  clearStore: () => void;
}

const generateId = () => `CIV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

const MOCK_SEED: Complaint[] = [
  {
    id: 'CIV-2026-847291',
    title: 'Major Water Main Break',
    description: 'High pressure water erupting on 5th Avenue. Street is flooding rapidly.',
    location: 'Lat: 40.7128, Lng: -74.0060',
    hasImage: true,
    category: 'Infrastructure',
    department: 'Public Works',
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
    id: 'CIV-2026-928374',
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
  }
];

export const useStore = create<CiviMindStore>()(
  persist(
    (set) => ({
      complaints: [],

      addComplaint: (data) => set((state) => {
        const now = new Date().toISOString();
        const newComplaint: Complaint = {
          ...data,
          id: generateId(),
          status: 'Pending Triage',
          submittedAt: now,
          timeline: [
            { status: 'Complaint Submitted', timestamp: now },
            { status: 'AI Verified', timestamp: new Date(Date.now() + 2000).toISOString() } // Mocking AI delay
          ]
        };
        return { complaints: [newComplaint, ...state.complaints] };
      }),

      updateStatus: (id, newStatus) => set((state) => {
        const now = new Date().toISOString();
        const updatedComplaints = state.complaints.map(c => {
          if (c.id === id) {
            const newTimeline = [...c.timeline];
            
            // Generate intermediate states for realistic demo timeline
            if (newStatus === 'In Progress' && c.status === 'Pending Triage') {
               newTimeline.push({ status: 'Assigned to Department', timestamp: new Date(Date.now() - 5000).toISOString() });
               newTimeline.push({ status: 'Officer Accepted', timestamp: new Date(Date.now() - 2000).toISOString() });
            }
            
            newTimeline.push({ status: newStatus, timestamp: now });
            
            return {
              ...c,
              status: newStatus,
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
