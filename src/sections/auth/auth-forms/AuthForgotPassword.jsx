// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { FORGOTPASS_MUTATION } from 'graphql/userMutations';

import { useMutation } from '@apollo/client/react';
import { forgotPasswordSchema } from 'schems/auth/authSchemas';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthForgotPassword() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [forgotPassword, { loading }] = useMutation(FORGOTPASS_MUTATION);

  const closeSnackbar = (_, reason) => reason !== 'clickaway' && setSnackbar((s) => ({ ...s, open: false }));
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { data } = await forgotPassword({
        variables: { email: values.email },
      });

      const res = data?.forgotPassword;
      if (res?.success === true) {
        localStorage.setItem('email', values.email);
        setSnackbar({ open: true, message: res.message || 'Check mail for reset password link', severity: 'success' });
        setTimeout(() => navigate('/otp-verification'), 1500);
      } else {
        const msg = res?.message;
        setErrors({ submit: msg });
        setSnackbar({ open: true, message: msg, severity: 'error' });
      }
    } catch (err) {
      setErrors({ submit: err.message });
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null,
        }}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmit}
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
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', color: 'white', fontSize: '16px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
