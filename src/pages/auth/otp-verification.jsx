/* eslint-disable prettier/prettier */
// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Logo from 'components/logo';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthOtpVerification from 'sections/auth/auth-forms/AuthOtpVerification';

// ================================|| LOGIN ||================================ //

export default function OtpVerification() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid sx={{ textAlign: 'left' }} size={12}>
          <Logo />
        </Grid>
        <Grid size={12}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">OTP Verification</Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <AuthOtpVerification />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
