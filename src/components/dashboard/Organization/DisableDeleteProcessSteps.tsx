'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControlLabel,
  Checkbox,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Block,
  Delete,
  CheckCircle,
  Download,
  Email
} from '@mui/icons-material';

interface DisableDeleteStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

interface ProcessStepsProps {
  actionType: 'disable' | 'delete';
  onBack: () => void;
}

const disableSteps: DisableDeleteStep[] = [
  {
    id: 'backup',
    title: 'Data Backup',
    description: 'Download a backup of your organization data',
    completed: false,
    required: true
  },
  {
    id: 'notify',
    title: 'Notify Members',
    description: 'Send notification to all organization members',
    completed: false,
    required: true
  },
  {
    id: 'transfer',
    title: 'Transfer Ownership',
    description: 'Transfer ownership to another member (optional)',
    completed: false,
    required: false
  },
  {
    id: 'confirm',
    title: 'Confirm Action',
    description: 'Final confirmation to disable/delete organization',
    completed: false,
    required: true
  }
];

const deleteSteps: DisableDeleteStep[] = [
  {
    id: 'backup',
    title: 'Final Data Export',
    description: 'Download all organization data (last chance)',
    completed: false,
    required: true
  },
  {
    id: 'members',
    title: 'Remove All Members',
    description: 'Remove all members from the organization',
    completed: false,
    required: true
  },
  {
    id: 'subscriptions',
    title: 'Cancel Subscriptions',
    description: 'Cancel all active subscriptions and billing',
    completed: false,
    required: true
  },
  {
    id: 'confirm',
    title: 'Final Confirmation',
    description: 'Permanent deletion confirmation',
    completed: false,
    required: true
  }
];

export default function ProcessSteps({ actionType, onBack }: ProcessStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<DisableDeleteStep[]>(
    actionType === 'disable' ? [...disableSteps] : [...deleteSteps]
  );
  const [confirmText, setConfirmText] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [transferEmail, setTransferEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showFinalDialog, setShowFinalDialog] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [backupDownloaded, setBackupDownloaded] = useState(false);

  const handleStepComplete = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
  };

  const handleDownloadBackup = async () => {
    setProcessing(true);
    // Simulate backup download
    await new Promise(resolve => setTimeout(resolve, 3000));
    setBackupDownloaded(true);
    handleStepComplete('backup');
    setProcessing(false);
  };

  const handleNotifyMembers = async () => {
    if (!notificationMessage.trim()) return;
    
    setProcessing(true);
    // Simulate notification sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    handleStepComplete('notify');
    setProcessing(false);
  };

  const handleTransferOwnership = async () => {
    if (!transferEmail.trim()) {
      handleStepComplete('transfer');
      return;
    }
    
    setProcessing(true);
    // Simulate ownership transfer
    await new Promise(resolve => setTimeout(resolve, 2000));
    handleStepComplete('transfer');
    setProcessing(false);
  };

  const handleRemoveMembers = async () => {
    setProcessing(true);
    // Simulate member removal
    await new Promise(resolve => setTimeout(resolve, 2000));
    handleStepComplete('members');
    setProcessing(false);
  };

  const handleCancelSubscriptions = async () => {
    setProcessing(true);
    // Simulate subscription cancellation
    await new Promise(resolve => setTimeout(resolve, 2000));
    handleStepComplete('subscriptions');
    setProcessing(false);
  };

  const handleFinalAction = async () => {
    const expectedText = actionType === 'disable' ? 'DISABLE ORGANIZATION' : 'DELETE PERMANENTLY';
    if (confirmText !== expectedText || !agreedToTerms) return;
    
    setProcessing(true);
    // Simulate final action
    await new Promise(resolve => setTimeout(resolve, 3000));
    handleStepComplete('confirm');
    setProcessing(false);
    setShowFinalDialog(false);
  };

  const canProceedToNext = () => {
    const currentStepData = steps[currentStep];
    return currentStepData?.completed || !currentStepData?.required;
  };

  const allRequiredStepsCompleted = () => {
    return steps.filter(step => step.required).every(step => step.completed);
  };

  const getProgressPercentage = () => {
    const completedSteps = steps.filter(step => step.completed).length;
    return (completedSteps / steps.length) * 100;
  };

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      color: '#ffffff' 
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2, 
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button
            onClick={onBack}
            sx={{ 
              color: '#94a3b8', 
              minWidth: 'auto', 
              p: 1,
              alignSelf: { xs: 'flex-start', sm: 'auto' }
            }}
          >
            ← Back
          </Button>
          <Typography 
            variant="h4" 
            fontWeight={700} 
            sx={{ 
              color: '#ffffff',
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' }
            }}
          >
            {actionType === 'disable' ? 'Disable' : 'Delete'} Organization
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#94a3b8',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Follow these steps to {actionType} your organization safely
        </Typography>
      </Box>

      {/* Progress */}
      <Card sx={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        mb: { xs: 3, md: 4 }
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#ffffff',
                fontSize: { xs: '1.125rem', sm: '1.25rem' }
              }}
            >
              Progress
            </Typography>
            <Chip
              label={`${Math.round(getProgressPercentage())}% Complete`}
              sx={{
                backgroundColor: getProgressPercentage() === 100 ? '#10b981' : '#3b82f6',
                color: '#ffffff',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#334155',
              '& .MuiLinearProgress-bar': {
                backgroundColor: getProgressPercentage() === 100 ? '#10b981' : '#3b82f6'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Steps */}
      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.id}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: step.completed ? '#10b981' : '#ffffff',
                  fontWeight: 600
                },
                '& .MuiStepIcon-root': {
                  color: step.completed ? '#10b981' : '#3b82f6'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {step.title}
                {step.required && (
                  <Chip
                    label="Required"
                    size="small"
                    sx={{
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      fontSize: '0.7rem'
                    }}
                  />
                )}
                {step.completed && (
                  <CheckCircle sx={{ color: '#10b981', fontSize: '1.2rem' }} />
                )}
              </Box>
            </StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                {step.description}
              </Typography>

              {/* Step Content */}
              {step.id === 'backup' && (
                <Card sx={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  mb: 3
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2 }}>
                      Download Organization Data
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                      This backup includes all organization data, member information, and settings.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      onClick={handleDownloadBackup}
                      disabled={processing || backupDownloaded}
                      sx={{
                        backgroundColor: backupDownloaded ? '#10b981' : '#3b82f6',
                        '&:hover': {
                          backgroundColor: backupDownloaded ? '#059669' : '#2563eb'
                        }
                      }}
                    >
                      {processing ? 'Generating...' : backupDownloaded ? 'Downloaded' : 'Download Backup'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step.id === 'notify' && (
                <Card sx={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  mb: 3
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2 }}>
                      Notification Message
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={notificationMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                      placeholder="Enter a message to send to all organization members..."
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#1e293b',
                          color: '#ffffff',
                          '& fieldset': {
                            borderColor: '#334155'
                          }
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<Email />}
                      onClick={handleNotifyMembers}
                      disabled={processing || !notificationMessage.trim()}
                      sx={{
                        backgroundColor: '#3b82f6',
                        '&:hover': {
                          backgroundColor: '#2563eb'
                        }
                      }}
                    >
                      {processing ? 'Sending...' : 'Send Notification'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step.id === 'transfer' && (
                <Card sx={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  mb: 3
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2 }}>
                      Transfer Ownership (Optional)
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                      Enter the email of the member you want to transfer ownership to, or leave blank to skip.
                    </Typography>
                    <TextField
                      fullWidth
                      value={transferEmail}
                      onChange={(e) => setTransferEmail(e.target.value)}
                      placeholder="member@example.com"
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#1e293b',
                          color: '#ffffff',
                          '& fieldset': {
                            borderColor: '#334155'
                          }
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleTransferOwnership}
                      disabled={processing}
                      sx={{
                        backgroundColor: '#3b82f6',
                        '&:hover': {
                          backgroundColor: '#2563eb'
                        }
                      }}
                    >
                      {processing ? 'Processing...' : transferEmail.trim() ? 'Transfer Ownership' : 'Skip Transfer'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step.id === 'members' && (
                <Card sx={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  mb: 3
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2 }}>
                      Remove All Members
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                      This will remove all members from the organization and revoke their access.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleRemoveMembers}
                      disabled={processing}
                      sx={{
                        backgroundColor: '#ef4444',
                        '&:hover': {
                          backgroundColor: '#dc2626'
                        }
                      }}
                    >
                      {processing ? 'Removing...' : 'Remove All Members'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step.id === 'subscriptions' && (
                <Card sx={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  mb: 3
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2 }}>
                      Cancel Subscriptions
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                      This will cancel all active subscriptions and stop future billing.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleCancelSubscriptions}
                      disabled={processing}
                      sx={{
                        backgroundColor: '#ef4444',
                        '&:hover': {
                          backgroundColor: '#dc2626'
                        }
                      }}
                    >
                      {processing ? 'Cancelling...' : 'Cancel Subscriptions'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step.id === 'confirm' && (
                <Card sx={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  mb: 3
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2 }}>
                      Final Confirmation
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setShowFinalDialog(true)}
                      disabled={!allRequiredStepsCompleted()}
                      sx={{
                        backgroundColor: actionType === 'disable' ? '#f59e0b' : '#ef4444',
                        '&:hover': {
                          backgroundColor: actionType === 'disable' ? '#d97706' : '#dc2626'
                        }
                      }}
                    >
                      {actionType === 'disable' ? 'Disable Organization' : 'Delete Organization'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step Navigation */}
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                mt: 3,
                flexDirection: { xs: 'column', sm: 'row' },
                '& .MuiButton-root': {
                  minWidth: { xs: '100%', sm: 'auto' }
                }
              }}>
                {index < steps.length - 1 && (
                  <Button
                    onClick={() => setCurrentStep(index + 1)}
                    disabled={!canProceedToNext()}
                    sx={{ 
                      color: '#3b82f6',
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    Next Step
                  </Button>
                )}
                {index > 0 && (
                  <Button
                    onClick={() => setCurrentStep(index - 1)}
                    sx={{ 
                      color: '#94a3b8',
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    Previous
                  </Button>
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {/* Final Confirmation Dialog */}
      <Dialog
        open={showFinalDialog}
        onClose={() => setShowFinalDialog(false)}
        maxWidth="md"
        fullWidth
        fullScreen={false}
        PaperProps={{
          sx: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff',
            m: { xs: 1, sm: 2 },
            maxHeight: { xs: '90vh', sm: 'none' }
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          p: { xs: 2, sm: 3 }
        }}>
          {actionType === 'disable' ? <Block sx={{ color: '#f59e0b' }} /> : <Delete sx={{ color: '#ef4444' }} />}
          Final Confirmation
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Alert 
            severity={actionType === 'disable' ? 'warning' : 'error'} 
            sx={{ 
              mb: 3,
              backgroundColor: '#1e293b',
              border: `1px solid ${actionType === 'disable' ? '#f59e0b' : '#ef4444'}`,
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: actionType === 'disable' ? '#f59e0b' : '#ef4444'
              }
            }}
          >
            {actionType === 'disable' 
              ? 'This will disable your organization. You can reactivate it within 30 days.'
              : 'This action is permanent and cannot be undone. All data will be lost forever.'
            }
          </Alert>
          
          <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
            Type <strong>{actionType === 'disable' ? 'DISABLE ORGANIZATION' : 'DELETE PERMANENTLY'}</strong> to confirm:
          </Typography>
          <TextField
            fullWidth
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={actionType === 'disable' ? 'DISABLE ORGANIZATION' : 'DELETE PERMANENTLY'}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0f172a',
                color: '#ffffff',
                '& fieldset': {
                  borderColor: '#334155'
                }
              }
            }}
          />
          
          <FormControlLabel
            control={
              <Checkbox
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                sx={{ color: '#94a3b8' }}
              />
            }
            label={`I understand that this action will ${actionType} the organization and agree to proceed.`}
            sx={{ color: '#94a3b8' }}
          />
        </DialogContent>
        <DialogActions sx={{ 
          p: { xs: 2, sm: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 1 },
          '& .MuiButton-root': {
            minWidth: { xs: '100%', sm: 'auto' }
          }
        }}>
          <Button onClick={() => setShowFinalDialog(false)} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleFinalAction}
            disabled={processing || confirmText !== (actionType === 'disable' ? 'DISABLE ORGANIZATION' : 'DELETE PERMANENTLY') || !agreedToTerms}
            variant="contained"
            sx={{
              backgroundColor: actionType === 'disable' ? '#f59e0b' : '#ef4444',
              '&:hover': {
                backgroundColor: actionType === 'disable' ? '#d97706' : '#dc2626'
              },
              '&:disabled': {
                backgroundColor: '#374151',
                color: '#6b7280'
              }
            }}
          >
            {processing ? 'Processing...' : (actionType === 'disable' ? 'Disable Organization' : 'Delete Permanently')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}