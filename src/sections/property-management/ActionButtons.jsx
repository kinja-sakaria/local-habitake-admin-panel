import { Stack, Typography, Box } from '@mui/material';

export default function ActionButtons({ activeTab, onTabChange, counts = { approved: 10, pending: 6 } }) {
  const tabs = [
    { id: 0, label: 'Approved Properties', count: counts.approved },
    { id: 1, label: 'Pending Approval', count: counts.pending },
  ];

  return (
    <Stack direction="row" spacing={4}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Box
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderBottom: isActive ? '2px solid #16a34a' : '2px solid transparent',
              pb: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'success.main' : 'text.secondary',
              }}
            >
              {tab.label}
            </Typography>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '100%',
                bgcolor: isActive ? '#D9F2E9' : '#E7E9EB',
                color: isActive ? 'success.main' : 'secondary.main',
              }}
            >
              {tab.count}
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
