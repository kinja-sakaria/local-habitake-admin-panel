import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ActionButtons({ activeTab, onTabChange }) {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} mb={3}>
      <Button
        variant={activeTab === 0 ? 'contained' : ''}
        color={activeTab === 0 ? 'success' : 'secondary'}
        onClick={() => onTabChange(0)}
        sx={{ borderRadius: '100px', textTransform: 'none', color: activeTab !== 0 ? 'secondary.main' : 'white', fontSize: '16px' }}
      >
        {t('users.seller')}
      </Button>
      <Button
        variant={activeTab === 1 ? 'contained' : ''}
        color={activeTab === 1 ? 'success' : 'secondary'}
        onClick={() => onTabChange(1)}
        sx={{ borderRadius: '100px', textTransform: 'none', color: activeTab !== 1 ? 'secondary.main' : 'white', fontSize: '16px' }}
      >
        {t('users.agency')}
      </Button>
      <Button
        variant={activeTab === 2 ? 'contained' : ''}
        color={activeTab === 2 ? 'success' : 'secondary'}
        onClick={() => onTabChange(2)}
        sx={{ borderRadius: '100px', textTransform: 'none', color: activeTab !== 2 ? 'secondary.main' : 'white', fontSize: '16px' }}
      >
        {t('users.buyer')}
      </Button>
    </Stack>
  );
}
