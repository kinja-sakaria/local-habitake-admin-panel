// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthForgotPassword() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Formik
        initialValues={{
          email: 'info@phoenixcoded.co',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        })}
        onSubmit={(values) => {
          setSnackbarOpen(true);

          // Redirect to OTP verification page
          setTimeout(() => navigate('/otp-verification'), 1500);
        }}
      >
        {({ errors, handleBlur, handleChange, touched, values, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="email-login" sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '100%' }}>
                    Enter your email
                  </InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    sx={{
                      borderRadius: '100px',
                      fontSize: '18px',
                      fontWeight: 400,
                      lineHeight: '100%',
                    }}
                  />
                  {touched.email && errors.email && (
                    <Typography variant="caption" color="error.main">
                      {errors.email}
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid size={12}>
                <AnimateButton>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      fontSize: '18px',
                      fontWeight: 400,
                      lineHeight: '100%',
                      padding: '18.5px 22px',
                      borderRadius: '48px',
                      backgroundColor: '#34216B',
                      '&:hover': {
                        backgroundColor: '#34216B',
                        borderRadius: '48px',
                      },
                      '&:focus': {
                        borderRadius: '48px',
                        outline: 'none',
                      },
                      '&:active': {
                        borderRadius: '48px',
                      },
                      '&::after': {
                        content: '""',
                        display: 'block',
                        borderRadius: '48px',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%', color: 'white', fontSize: '16px' }}>
          Check mail for reset password link
        </Alert>
      </Snackbar>
    </>
  );
}
