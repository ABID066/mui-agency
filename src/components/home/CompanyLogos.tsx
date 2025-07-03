import React from 'react';
import { Box, Typography } from '@mui/material';

const CompanyLogos = () => {
  const companies = [
    {
      name: 'nbase',
      logo: (
        <Box sx={{
          width: 32,
          height: 32,
          bgcolor: '#000',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography sx={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>N</Typography>
        </Box>
      )
    },
    {
      name: 'Vercel',
      logo: (
        <Box sx={{
          width: 28,
          height: 28,
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px'
        }}>
          ▲
        </Box>
      )
    },
    {
      name: 'Supabase',
      logo: <Box sx={{ fontSize: '24px' }}>⚡</Box>
    },
    {
      name: 'Raycast',
      logo: <Box sx={{ fontSize: '24px' }}>🚀</Box>
    },
    {
      name: 'Framer',
      logo: <Box sx={{ fontSize: '24px' }}>🎨</Box>
    },
    {
      name: 'Coinbase',
      logo: (
        <Box sx={{
          width: 32,
          height: 32,
          bgcolor: '#1652f0',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography sx={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>C</Typography>
        </Box>
      )
    },
    {
      name: 'Storyblok',
      logo: <Box sx={{ fontSize: '24px' }}>📚</Box>
    },
    {
      name: 'AngelList',
      logo: (
        <Box sx={{
          width: 32,
          height: 32,
          bgcolor: '#1a1a1a',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography sx={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>A</Typography>
        </Box>
      )
    }
  ];

  const renderCompanyItem = (company: { name: string; logo: React.ReactElement }, index: number, setKey: string) => (
    <Box 
      key={`${setKey}-${index}`}
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        whiteSpace: 'nowrap',
        minWidth: 'max-content'
      }}
    >
      {company.logo}
      <Typography sx={{ 
        fontSize: '26px', 
        fontWeight: 600, 
        color: '#6b7280',
        letterSpacing: '-0.025em'
      }}>
        {company.name}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{
      mt: 8,
      py: 6,
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      minHeight: '160px',
      borderTop: '1px solid #f1f5f9',
      borderBottom: '1px solid #f1f5f9'
    }}>
      {/* Left side empty space */}
      <Box sx={{ width: '5%', flexShrink: 0 }} />
      
      {/* Text section on the left */}
      <Box sx={{
        width: '18%',
        flexShrink: 0,
        
        display: 'flex',
        alignItems: 'center'
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '13px',
            fontWeight: 500,
          
            letterSpacing: '0.1em',
            lineHeight: 1.5,
            maxWidth: '280px'
          }}
        >
          Trusted by fast-growing companies around the world
        </Typography>
      </Box>
      
      {/* Scrolling logos container */}
      <Box sx={{
        flex: 1,
        position: 'relative',
        height: '100px',
        overflow: 'hidden'
      }}>
        {/* Left gradient overlay for fade effect */}
        <Box sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '120px',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(248,250,252,1) 0%, rgba(248,250,252,0.8) 50%, rgba(248,250,252,0) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        
        {/* Right gradient overlay for fade effect */}
        <Box sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '120px',
          height: '100%',
          background: 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          animation: 'modernScroll 52.5s linear infinite',
          animationDelay: '0s',
          '@keyframes modernScroll': {
            '0%': {
              transform: 'translateX(0%) translateY(-50%)'
            },
            '100%': {
              transform: 'translateX(-100%) translateY(-50%)'
            }
          }
        }}>
          {/* First Set */}
          {companies.map((company, index) => 
            renderCompanyItem(company, index, 'first')
          )}
          
          {/* Second Set for Seamless Loop */}
          {companies.map((company, index) => 
            renderCompanyItem(company, index, 'second')
          )}
          
          {/* Third Set for Better Continuity */}
          {companies.map((company, index) => 
            renderCompanyItem(company, index, 'third')
          )}
        </Box>
      </Box>
      
      {/* Right side empty space */}
      <Box sx={{ width: '5%', flexShrink: 0 }} />
    </Box>
  );
};

export default CompanyLogos;