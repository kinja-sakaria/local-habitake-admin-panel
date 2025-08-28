import { Button, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';
import BeforeAITransformation from '../../sections/ai-model-training/BeforeAITransformation';
import AfterAITransformation from '../../sections/ai-model-training/AfterAITransformation';

export default function AIModelTraining() {
  return (
    <>
      <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
        AI Feedback & Training Dataset Builder
      </Typography>
      <MainCard sx={{ minHeight: '728px' }}>
        {/* <Typography fontSize="19.77px" color="secondary.800" mb={3} sx={{ fontWeight: 500 }}>
          AI Feedback & Training Dataset Builder
        </Typography> */}
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid
            item
            size={{ xs: 12, md: 6, lg: 6 }}
            sx={{
              pb: { xs: 2, sm: 4, md: 6 },
            }}
          >
            <BeforeAITransformation />
          </Grid>
          <Grid
            item
            size={{ xs: 12, md: 6, lg: 6 }}
            sx={{
              pb: { xs: 2, sm: 4, md: 6 },
            }}
          >
            <AfterAITransformation />
          </Grid>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            sx={{
              color: '#747474',
              fontSize: '17.3px',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#000000',
              },
            }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: '17.3px',
              fontWeight: 500,
              backgroundColor: 'primary.main',
              color: '#fff',
              borderRadius: '100px',
              '&:hover': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            Approve
          </Button>
        </Grid>
      </MainCard>
    </>
  );
}
