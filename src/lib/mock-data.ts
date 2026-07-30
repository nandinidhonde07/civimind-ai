
export const complaints = [
  { id: 'C-101', title: 'Pothole on Main St', category: 'Road', priority: 'High', status: 'Pending', date: '2023-10-01' },
  { id: 'C-102', title: 'Water Leak', category: 'Water', priority: 'Critical', status: 'In Progress', date: '2023-10-02' },
  { id: 'C-103', title: 'Streetlight out', category: 'Electricity', priority: 'Medium', status: 'Resolved', date: '2023-10-03' },
  { id: 'C-104', title: 'Garbage pile', category: 'Sanitation', priority: 'Low', status: 'Pending', date: '2023-10-04' },
];

export const metrics = {
  total: 1245,
  resolved: 890,
  pending: 355,
  avgResolutionTime: '48h',
};

export const departmentStats = [
  { name: 'Roads', pending: 120, resolved: 300, efficiency: 85 },
  { name: 'Water', pending: 45, resolved: 200, efficiency: 92 },
  { name: 'Electricity', pending: 80, resolved: 150, efficiency: 78 },
  { name: 'Sanitation', pending: 110, resolved: 240, efficiency: 88 },
];
