import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import SupportView from 'sections/support/SupportView';

export default function Support() {
  return (
    <>
      <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
        Support
      </Typography>
      <MainCard sx={{ '& .MuiCardContent-root': { padding: 0 }, '& .MuiCardContent-root:last-child': { pb: 0 } }}>
        <SupportView />
      </MainCard>
    </>
  );
}
