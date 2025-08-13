import { Tabs, Tab, Box, Typography } from '@mui/material';

export default function VerificationTabs({ activeTab, onChange, userCount, propertyCount }) {
  const TabLabelWithCount = (label, count, isActive) => (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{
        '&:hover .countBox': {
          backgroundColor: '#D5F3EA',
          color: '#01A669',
        },
        '&:hover .labelText': {
          color: '#01A669',
        },
      }}
    >
      <Typography
        className="labelText"
        sx={{ fontWeight: isActive ? 500 : 400, fontSize: '16px', color: isActive ? '#01A669' : '#5B6B79' }}
      >
        {label}
      </Typography>
      <Box
        className="countBox"
        sx={{
          backgroundColor: isActive ? '#D5F3EA' : '#E4E6EA',
          color: isActive ? '#01A669' : '#5B6B79',
          fontSize: '0.75rem',
          px: 1.2,
          py: 1.2,
          borderRadius: '50px',
          fontWeight: 500,
          minWidth: 24,
          textAlign: 'center',
        }}
      >
        {count}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}  gap={3}>
      <Tabs
        value={activeTab}
        onChange={onChange}
        TabIndicatorProps={{ style: { backgroundColor: '#01A669' } }}
      >
        <Tab
          label={TabLabelWithCount('User', userCount, activeTab === 0)}
          sx={{
            textTransform: 'none',
            fontWeight: activeTab === 0 ? 500 : 400,
            minHeight: '48px',
            p: 0,
          }}
        />
        <Tab
          label={TabLabelWithCount('Property', propertyCount, activeTab === 1)}
          sx={{
            textTransform: 'none',
            fontWeight: activeTab === 1 ? 500 : 400,
            minHeight: '48px',
            p: 0,
          }}
        />
      </Tabs>
    </Box>
  );
}
