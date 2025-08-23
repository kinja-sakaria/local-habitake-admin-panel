import { Button, Stack } from '@mui/material';

export default function ActionButtons({ activeTab, onTabChange }) {
  return (
    <Stack direction="row" spacing={2} mb={3}>
      <Button
        variant={activeTab === 0 ? 'contained' : ''}
        color={activeTab === 0 ? 'success' : 'secondary'}
        onClick={() => onTabChange(0)}
        sx={{ borderRadius: '100px', textTransform: 'none', color: activeTab !== 0 ? 'secondary.main' : 'white', fontSize: '16px' }}
      >
        Seller
      </Button>
      <Button
        variant={activeTab === 1 ? 'contained' : ''}
        color={activeTab === 1 ? 'success' : 'secondary'}
        onClick={() => onTabChange(1)}
        sx={{ borderRadius: '100px', textTransform: 'none', color: activeTab !== 1 ? 'secondary.main' : 'white', fontSize: '16px' }}
      >
        Agency
      </Button>
      <Button
        variant={activeTab === 2 ? 'contained' : ''}
        color={activeTab === 2 ? 'success' : 'secondary'}
        onClick={() => onTabChange(2)}
        sx={{ borderRadius: '100px', textTransform: 'none', color: activeTab !== 2 ? 'secondary.main' : 'white', fontSize: '16px' }}
      >
        Buyer
      </Button>
    </Stack>
  );
}
