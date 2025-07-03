import {
  People,
  AdminPanelSettings,
  Block,
  CheckCircle
} from '@mui/icons-material';

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  lastLogin: string;
  joinDate: string;
  avatar: string;
  department: string;
}

// User stats interface
export interface UserStat {
  title: string;
  value: string;
  icon: React.ComponentType;
}

// Default user data
export const defaultUsers: User[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-02-15 10:30 AM',
    joinDate: '2023-01-15',
    avatar: 'SJ',
    department: 'Engineering'
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    phone: '+1 (555) 234-5678',
    role: 'Developer',
    status: 'Active',
    lastLogin: '2024-02-15 09:15 AM',
    joinDate: '2023-03-20',
    avatar: 'MC',
    department: 'Engineering'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 345-6789',
    role: 'Designer',
    status: 'Active',
    lastLogin: '2024-02-14 04:45 PM',
    joinDate: '2023-02-10',
    avatar: 'ED',
    department: 'Design'
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    phone: '+1 (555) 456-7890',
    role: 'Manager',
    status: 'Inactive',
    lastLogin: '2024-02-10 02:20 PM',
    joinDate: '2022-11-05',
    avatar: 'AR',
    department: 'Operations'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    phone: '+1 (555) 567-8901',
    role: 'Developer',
    status: 'Active',
    lastLogin: '2024-02-15 11:00 AM',
    joinDate: '2023-06-12',
    avatar: 'LW',
    department: 'Engineering'
  },
  {
    id: 6,
    name: 'David Brown',
    email: 'david.brown@company.com',
    phone: '+1 (555) 678-9012',
    role: 'Analyst',
    status: 'Pending',
    lastLogin: 'Never',
    joinDate: '2024-02-14',
    avatar: 'DB',
    department: 'Analytics'
  },
  {
    id: 7,
    name: 'Jennifer Wilson',
    email: 'jennifer.wilson@company.com',
    phone: '+1 (555) 789-0123',
    role: 'Designer',
    status: 'Active',
    lastLogin: '2024-02-15 08:30 AM',
    joinDate: '2023-04-18',
    avatar: 'JW',
    department: 'Design'
  },
  {
    id: 8,
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    phone: '+1 (555) 890-1234',
    role: 'Support',
    status: 'Active',
    lastLogin: '2024-02-15 12:15 PM',
    joinDate: '2023-08-22',
    avatar: 'RT',
    department: 'Support'
  }
];

// Default user stats
export const defaultUserStats: UserStat[] = [
  { title: 'Total Users', value: '1,247', icon: People },
  { title: 'Active Users', value: '1,156', icon: CheckCircle },
  { title: 'Admins', value: '12', icon: AdminPanelSettings },
  { title: 'Blocked Users', value: '8', icon: Block }
];

// Utility function to get status color
export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'active':
      return { backgroundColor: '#dcfce7', color: '#166534' };
    case 'inactive':
      return { backgroundColor: '#fee2e2', color: '#991b1b' };
    case 'pending':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

// Utility function to get role color
export function getRoleColor(role: string) {
  switch (role.toLowerCase()) {
    case 'admin':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'manager':
      return { backgroundColor: '#dbeafe', color: '#1e40af' };
    case 'developer':
      return { backgroundColor: '#e0e7ff', color: '#3730a3' };
    case 'designer':
      return { backgroundColor: '#f3e8ff', color: '#7c2d12' };
    case 'analyst':
      return { backgroundColor: '#ecfdf5', color: '#065f46' };
    case 'support':
      return { backgroundColor: '#fef2f2', color: '#7f1d1d' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}