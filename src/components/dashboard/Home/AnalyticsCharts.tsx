'use client';

import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';

interface ChartData {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  chartData: number[];
}

interface AnalyticsChartsProps {
  sessionsData: ChartData;
  pageViewsData: ChartData;
}

// Enhanced chart component for better visualization
function AreaChart({ data, color = '#3b82f6' }: { data: number[], color?: string }) {
  const [hoveredPoint, setHoveredPoint] = React.useState<number | null>(null);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const dates = ['Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 30'];
  
  // Create SVG path for the area chart
  const width = 300;
  const height = 100;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + ((max - value) / range) * chartHeight;
    return { x, y, value };
  });
  
  const pathData = `M${padding},${height - padding} L${points.map(p => `${p.x},${p.y}`).join(' L')} L${width - padding},${height - padding} Z`;
  const lineData = `M${points.map(p => `${p.x},${p.y}`).join(' L')}`;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 120 }}>
      <Box sx={{ width: '100%', height: 100, position: 'relative' }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
          <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
          
          {/* Area fill */}
          <path
            d={pathData}
            fill={`url(#gradient-${color.replace('#', '')})`}
            stroke="none"
          />
          
          {/* Line */}
          <path
            d={lineData}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Interactive areas */}
          {points.map((point, index) => (
            <rect 
              key={`area-${index}`}
              x={point.x - (chartWidth / data.length / 2)}
              y={padding}
              width={chartWidth / data.length}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
          
          {/* Data points */}
          {points.map((point, index) => (
            <React.Fragment key={`point-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredPoint === index ? 5 : 3}
                fill={color}
                stroke="#1e293b"
                strokeWidth="2"
              />
              
              {/* Tooltip on hover */}
              {hoveredPoint === index && (
                <g>
                  <rect 
                    x={point.x - 30}
                    y={point.y - 35}
                    width="60"
                    height="25"
                    rx="4"
                    fill="#1e293b"
                    stroke="#334155"
                  />
                  <text 
                    x={point.x}
                    y={point.y - 18}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                  >
                    {point.value.toLocaleString()}
                  </text>
                  
                  {/* Vertical reference line */}
                  <line 
                    x1={point.x}
                    y1={padding}
                    x2={point.x}
                    y2={height - padding}
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                </g>
              )}
            </React.Fragment>
          ))}
        </svg>
      </Box>
      
      {/* Date labels */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 2 }}>
        {dates.map((date, index) => (
          <Typography 
            key={index} 
            variant="caption" 
            sx={{ 
              color: hoveredPoint === index ? '#ffffff' : '#94a3b8', 
              fontSize: '0.7rem',
              fontWeight: hoveredPoint === index ? 'bold' : 'normal'
            }}
          >
            {date}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

// Bar chart component for page views
function BarChart({ data, color = '#06b6d4' }: { data: number[], color?: string }) {
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null);
  const max = Math.max(...data);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
  const width = 300;
  const height = 100;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / data.length * 0.6;
  const barSpacing = chartWidth / data.length;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 120 }}>
      <Box sx={{ width: '100%', height: 100, position: 'relative' }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id={`bar-gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id={`bar-gradient-hover-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
          <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
          
          {data.map((value, index) => {
            const barHeight = (value / max) * chartHeight;
            const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
            const y = height - padding - barHeight;
            const isHovered = hoveredBar === index;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={isHovered ? `url(#bar-gradient-hover-${color.replace('#', '')})` : `url(#bar-gradient-${color.replace('#', '')})`}
                  stroke={color}
                  strokeWidth={isHovered ? "2" : "1"}
                  rx="2"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect 
                      x={x + barWidth/2 - 25}
                      y={y - 30}
                      width="50"
                      height="20"
                      rx="4"
                      fill="#1e293b"
                      stroke="#334155"
                    />
                    <text 
                      x={x + barWidth/2}
                      y={y - 16}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                    >
                      {(value/1000).toFixed(1)}K
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </Box>
      
      {/* Month labels */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 2 }}>
        {months.map((month, index) => (
          <Typography 
            key={index} 
            variant="caption" 
            sx={{ 
              color: hoveredBar === index ? '#ffffff' : '#94a3b8', 
              fontSize: '0.7rem',
              fontWeight: hoveredBar === index ? 'bold' : 'normal'
            }}
          >
            {month}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default function AnalyticsCharts({ sessionsData, pageViewsData }: AnalyticsChartsProps) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Sessions Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <Card sx={{ 
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          height: { xs: '280px', md: '300px' },
          '&:hover': {
            backgroundColor: '#334155',
            borderColor: '#475569'
          }
        }}>
          <CardContent sx={{ height: '100%', p: { xs: 2, md: 3 } }}>
            <Box sx={{ mb: { xs: 1, md: 2 } }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {sessionsData.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  {sessionsData.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ fontSize: { xs: 14, md: 16 }, color: '#10b981', mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: '#10b981', fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {sessionsData.change}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: { xs: 1, md: 2 }, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                {sessionsData.subtitle}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'end', minHeight: { xs: '120px', md: '140px' } }}>
              <AreaChart data={sessionsData.chartData} color="#3b82f6" />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Page Views Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <Card sx={{ 
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          height: { xs: '280px', md: '300px' },
          '&:hover': {
            backgroundColor: '#334155',
            borderColor: '#475569'
          }
        }}>
          <CardContent sx={{ height: '100%', p: { xs: 2, md: 3 } }}>
            <Box sx={{ mb: { xs: 1, md: 2 } }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {pageViewsData.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  {pageViewsData.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingDown sx={{ fontSize: { xs: 14, md: 16 }, color: '#ef4444', mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: '#ef4444', fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {pageViewsData.change}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: { xs: 1, md: 2 }, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                {pageViewsData.subtitle}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'end', minHeight: { xs: '120px', md: '140px' } }}>
              <BarChart data={pageViewsData.chartData} color="#06b6d4" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

// Export the chart data
export const sessionsChartData: ChartData = {
  title: 'Sessions',
  value: '13,277',
  change: '+55%',
  subtitle: 'Sessions per day for the last 30 days',
  chartData: [5000, 8000, 12000, 15000, 18000, 22000, 25000]
};

export const pageViewsChartData: ChartData = {
  title: 'Page views and downloads',
  value: '1.3M',
  change: '-8%',
  subtitle: 'Page views and downloads for the last 6 months',
  chartData: [8000, 9000, 7000, 11000, 13000, 12000, 10000]
};