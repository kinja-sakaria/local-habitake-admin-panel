import { Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function ActionButtons({ onApproveAll, onRejectAll, onViewAll }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success" onClick={onApproveAll} startIcon={<DoneIcon />} sx={{ borderRadius: '100px' }}>
        Approve all
      </Button>
      <Button variant="contained" color="error" onClick={onRejectAll} startIcon={<CloseIcon />} sx={{ borderRadius: '100px' }}>
        Reject all
      </Button>
      <Link
        component={RouterLink}
        onClick={onViewAll}
        variant="caption"
        color="success"
        fontSize="18px"
        fontWeight={700}
        underline="always"
      >
        View all
      </Link>
    </Stack>
  );
}
