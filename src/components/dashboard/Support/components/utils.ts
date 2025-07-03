// Utility functions and types for Support components

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'feature' | 'account';
  customer: string;
  customerEmail: string;
  assignee: string;
  createdDate: string;
  lastUpdate: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high':
      return { backgroundColor: '#fee2e2', color: '#991b1b' };
    case 'medium':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'low':
      return { backgroundColor: '#dcfce7', color: '#166534' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'open':
      return { backgroundColor: '#dbeafe', color: '#1e40af' };
    case 'in-progress':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'resolved':
      return { backgroundColor: '#dcfce7', color: '#166534' };
    case 'closed':
      return { backgroundColor: '#f3f4f6', color: '#374151' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

export function getCategoryColor(category: string) {
  switch (category) {
    case 'technical':
      return { backgroundColor: '#e0e7ff', color: '#3730a3' };
    case 'billing':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'feature':
      return { backgroundColor: '#f3e8ff', color: '#7c2d12' };
    case 'account':
      return { backgroundColor: '#ecfdf5', color: '#065f46' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

// Default data
export const defaultSupportTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    title: 'Login issues with new account',
    description: 'User unable to login after creating new account',
    priority: 'high',
    status: 'open',
    category: 'technical',
    customer: 'John Smith',
    customerEmail: 'john.smith@email.com',
    assignee: 'Sarah Johnson',
    createdDate: '2024-02-15',
    lastUpdate: '2024-02-15 10:30 AM',
    avatar: 'JS'
  },
  {
    id: 'TKT-002',
    title: 'Payment processing error',
    description: 'Credit card payment fails during checkout',
    priority: 'high',
    status: 'in-progress',
    category: 'billing',
    customer: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    assignee: 'Mike Chen',
    createdDate: '2024-02-14',
    lastUpdate: '2024-02-15 09:15 AM',
    avatar: 'ED'
  },
  {
    id: 'TKT-003',
    title: 'Feature request: Dark mode',
    description: 'Request to add dark mode theme option',
    priority: 'medium',
    status: 'open',
    category: 'feature',
    customer: 'Alex Rodriguez',
    customerEmail: 'alex.r@email.com',
    assignee: 'Lisa Wang',
    createdDate: '2024-02-13',
    lastUpdate: '2024-02-14 03:20 PM',
    avatar: 'AR'
  },
  {
    id: 'TKT-004',
    title: 'Account deletion request',
    description: 'Customer wants to delete their account and data',
    priority: 'medium',
    status: 'resolved',
    category: 'account',
    customer: 'Maria Garcia',
    customerEmail: 'maria.g@email.com',
    assignee: 'David Brown',
    createdDate: '2024-02-12',
    lastUpdate: '2024-02-13 11:45 AM',
    avatar: 'MG'
  },
  {
    id: 'TKT-005',
    title: 'Slow page loading times',
    description: 'Dashboard takes too long to load',
    priority: 'low',
    status: 'open',
    category: 'technical',
    customer: 'Robert Wilson',
    customerEmail: 'robert.w@email.com',
    assignee: 'Jennifer Lee',
    createdDate: '2024-02-11',
    lastUpdate: '2024-02-12 02:10 PM',
    avatar: 'RW'
  }
];

export const defaultFAQData: FAQ[] = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.'
  },
  {
    question: 'How do I update my billing information?',
    answer: 'Go to Account Settings > Billing and click "Update Payment Method" to change your billing information.'
  },
  {
    question: 'Can I export my data?',
    answer: 'Yes, you can export your data from the Settings page under "Data Export". We support CSV and JSON formats.'
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription from Account Settings > Subscription. Your account will remain active until the end of your billing period.'
  }
];