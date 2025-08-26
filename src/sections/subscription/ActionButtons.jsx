import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Box } from '@mui/material';

export default function ActionButtons({ activeTab, onTabChange, onCreate }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
      {/* Left side buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant={activeTab === 0 ? 'contained' : 'outlined'}
          color={activeTab === 0 ? 'success' : 'secondary'}
          onClick={() => onTabChange(0)}
          sx={{
            borderRadius: '100px',
            textTransform: 'none',
            color: activeTab !== 0 ? 'secondary.main' : 'white',
            fontSize: '16px',
            border: 'none',
          }}
        >
          Subscription List
        </Button>

        <Button
          variant={activeTab === 1 ? 'contained' : 'outlined'}
          color={activeTab === 1 ? 'success' : 'secondary'}
          border
          onClick={() => onTabChange(1)}
          sx={{
            borderRadius: '100px',
            textTransform: 'none',
            color: activeTab !== 1 ? 'secondary.main' : 'white',
            fontSize: '16px',
            border: 'none',
          }}
        >
          Subscribers List
        </Button>
      </Stack>

      {/* Right side button */}
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        sx={{
          borderRadius: '100px',
          textTransform: 'none',
          fontSize: '16px',
        }}
        onClick={onCreate}
      >
        Create Subscription
      </Button>
    </Stack>
  );
}
