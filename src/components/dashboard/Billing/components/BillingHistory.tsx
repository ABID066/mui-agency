'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Download, Receipt } from '@mui/icons-material';

const billingHistory = [
  {
    id: 'INV-2024-001',
    date: '2024-02-15',
    amount: '$29.00',
    status: 'Paid',
    description: 'Pro Plan - Monthly Subscription'
  },
  {
    id: 'INV-2024-002',
    date: '2024-01-15',
    amount: '$29.00',
    status: 'Paid',
    description: 'Pro Plan - Monthly Subscription'
  },
  {
    id: 'INV-2023-012',
    date: '2023-12-15',
    amount: '$29.00',
    status: 'Paid',
    description: 'Pro Plan - Monthly Subscription'
  },
  {
    id: 'INV-2023-011',
    date: '2023-11-15',
    amount: '$29.00',
    status: 'Paid',
    description: 'Pro Plan - Monthly Subscription'
  },
  {
    id: 'INV-2023-010',
    date: '2023-10-15',
    amount: '$9.00',
    status: 'Paid',
    description: 'Basic Plan - Monthly Subscription'
  }
];

export default function BillingHistory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return { backgroundColor: '#059669', color: '#ffffff' };
      case 'pending':
        return { backgroundColor: '#f59e0b', color: '#ffffff' };
      case 'failed':
        return { backgroundColor: '#dc2626', color: '#ffffff' };
      default:
        return { backgroundColor: '#6b7280', color: '#ffffff' };
    }
  };

  if (isMobile) {
    return (
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#ffffff',
            mb: 3,
            textAlign: 'center'
          }}
        >
          Billing History
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {billingHistory.map((invoice, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 'bold',
                        color: '#ffffff',
                        mb: 0.5
                      }}
                    >
                      {invoice.id}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#94a3b8' }}
                    >
                      {invoice.date}
                    </Typography>
                  </Box>
                  <Chip
                    label={invoice.status}
                    size="small"
                    sx={{
                      ...getStatusColor(invoice.status),
                      fontWeight: 'bold'
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#e2e8f0',
                    mb: 2
                  }}
                >
                  {invoice.description}
                </Typography>

                <Divider sx={{ backgroundColor: '#334155', mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}
                  >
                    {invoice.amount}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      color: '#3b82f6',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.1)'
                      }
                    }}
                  >
                    <Download fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#ffffff',
          mb: 3
        }}
      >
        Billing History
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#334155' }}>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', borderBottom: '1px solid #475569' }}>
                Invoice
              </TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', borderBottom: '1px solid #475569' }}>
                Date
              </TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', borderBottom: '1px solid #475569' }}>
                Description
              </TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', borderBottom: '1px solid #475569' }}>
                Amount
              </TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', borderBottom: '1px solid #475569' }}>
                Status
              </TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', borderBottom: '1px solid #475569' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billingHistory.map((invoice, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: '#2d3748'
                  }
                }}
              >
                <TableCell sx={{ color: '#e2e8f0', borderBottom: '1px solid #475569' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Receipt sx={{ color: '#3b82f6', fontSize: 20 }} />
                    {invoice.id}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>
                  {invoice.date}
                </TableCell>
                <TableCell sx={{ color: '#e2e8f0', borderBottom: '1px solid #475569' }}>
                  {invoice.description}
                </TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', borderBottom: '1px solid #475569' }}>
                  {invoice.amount}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                  <Chip
                    label={invoice.status}
                    size="small"
                    sx={{
                      ...getStatusColor(invoice.status),
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                  <IconButton
                    size="small"
                    sx={{
                      color: '#3b82f6',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.1)'
                      }
                    }}
                  >
                    <Download fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}