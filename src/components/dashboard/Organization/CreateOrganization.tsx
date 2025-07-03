'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import {
  PhotoCamera,
  Business,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';

interface OrganizationData {
  name: string;
  description: string;
  industry: string;
  size: string;
  website: string;
  address: string;
  city: string;
  country: string;
  logo: string;
}

const steps = ['Basic Information', 'Organization Details', 'Review & Create'];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Marketing',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Other'
];

const organizationSizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees'
];

export default function CreateOrganization() {
  const [activeStep, setActiveStep] = useState(0);
  const [creating, setCreating] = useState(false);
  const [orgData, setOrgData] = useState<OrganizationData>({
    name: '',
    description: '',
    industry: '',
    size: '',
    website: '',
    address: '',
    city: '',
    country: '',
    logo: ''
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field: keyof OrganizationData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrgData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: keyof OrganizationData) => (event: { target: { value: string } }) => {
    setOrgData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCreate = async () => {
    setCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCreating(false);
    alert('Organization created successfully!');
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return orgData.name && orgData.description;
      case 1:
        return orgData.industry && orgData.size;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
              Basic Information
            </Typography>
            
            {/* Logo Upload */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                backgroundColor: '#3b82f6',
                fontSize: '2rem',
                fontWeight: 600
              }}>
                {orgData.name ? orgData.name.charAt(0).toUpperCase() : <Business />}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                  Organization Logo
                </Typography>
                <IconButton
                  component="label"
                  sx={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#94a3b8',
                    '&:hover': {
                      backgroundColor: '#334155'
                    }
                  }}
                >
                  <PhotoCamera />
                  <input type="file" hidden accept="image/*" />
                </IconButton>
              </Box>
            </Box>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Organization Name"
                  value={orgData.name}
                  onChange={handleInputChange('name')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  value={orgData.description}
                  onChange={handleInputChange('description')}
                  multiline
                  rows={3}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 1:
        return (
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
              Organization Details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth required>
                  <InputLabel sx={{ color: '#94a3b8' }}>Industry</InputLabel>
                  <Select
                    value={orgData.industry}
                    onChange={handleSelectChange('industry')}
                    label="Industry"
                    sx={{
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#334155'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6'
                      }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          color: '#ffffff'
                        }
                      }
                    }}
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry} sx={{ color: '#ffffff' }}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth required>
                  <InputLabel sx={{ color: '#94a3b8' }}>Organization Size</InputLabel>
                  <Select
                    value={orgData.size}
                    onChange={handleSelectChange('size')}
                    label="Organization Size"
                    sx={{
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#334155'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6'
                      }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          color: '#ffffff'
                        }
                      }
                    }}
                  >
                    {organizationSizes.map((size) => (
                      <MenuItem key={size} value={size} sx={{ color: '#ffffff' }}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Website (Optional)"
                  value={orgData.website}
                  onChange={handleInputChange('website')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Address (Optional)"
                  value={orgData.address}
                  onChange={handleInputChange('address')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="City (Optional)"
                  value={orgData.city}
                  onChange={handleInputChange('city')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Country (Optional)"
                  value={orgData.country}
                  onChange={handleInputChange('country')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 2:
        return (
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
              Review & Create
            </Typography>
            
            <Alert 
              severity="info" 
              sx={{ 
                mb: 4,
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                color: '#ffffff',
                '& .MuiAlert-icon': {
                  color: '#3b82f6'
                }
              }}
            >
              Please review your organization details before creating.
            </Alert>
            
            <Card sx={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              boxShadow: 'none'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Avatar sx={{ 
                    width: 60, 
                    height: 60, 
                    backgroundColor: '#3b82f6',
                    fontSize: '1.5rem',
                    fontWeight: 600
                  }}>
                    {orgData.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                      {orgData.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {orgData.description}
                    </Typography>
                  </Box>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Industry</Typography>
                    <Typography variant="body1" sx={{ color: '#ffffff', mb: 2 }}>
                      {orgData.industry}
                    </Typography>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Size</Typography>
                    <Typography variant="body1" sx={{ color: '#ffffff', mb: 2 }}>
                      {orgData.size}
                    </Typography>
                  </Grid>
                  
                  {orgData.website && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>Website</Typography>
                      <Typography variant="body1" sx={{ color: '#ffffff', mb: 2 }}>
                        {orgData.website}
                      </Typography>
                    </Grid>
                  )}
                  
                  {(orgData.address || orgData.city || orgData.country) && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>Location</Typography>
                      <Typography variant="body1" sx={{ color: '#ffffff' }}>
                        {[orgData.address, orgData.city, orgData.country].filter(Boolean).join(', ')}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Create New Organization
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Set up your new organization in a few simple steps
        </Typography>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: '#94a3b8',
                  '&.Mui-active': {
                    color: '#ffffff'
                  },
                  '&.Mui-completed': {
                    color: '#94a3b8'
                  }
                },
                '& .MuiStepIcon-root': {
                  color: '#334155',
                  '&.Mui-active': {
                    color: '#3b82f6'
                  },
                  '&.Mui-completed': {
                    color: '#059669'
                  }
                }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Content */}
      <Card sx={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        mb: 4
      }}>
        <CardContent sx={{ p: 4 }}>
          {renderStepContent(activeStep)}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<ArrowBack />}
          sx={{
            color: '#94a3b8',
            '&:disabled': {
              color: '#6b7280'
            }
          }}
        >
          Back
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={creating || !isStepValid(activeStep)}
              sx={{
                backgroundColor: '#3b82f6',
                '&:hover': {
                  backgroundColor: '#2563eb'
                },
                '&:disabled': {
                  backgroundColor: '#374151',
                  color: '#6b7280'
                }
              }}
            >
              {creating ? 'Creating...' : 'Create Organization'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid(activeStep)}
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: '#3b82f6',
                '&:hover': {
                  backgroundColor: '#2563eb'
                },
                '&:disabled': {
                  backgroundColor: '#374151',
                  color: '#6b7280'
                }
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}