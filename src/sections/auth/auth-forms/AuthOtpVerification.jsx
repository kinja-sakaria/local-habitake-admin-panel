/* eslint-disable prettier/prettier */
import { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, OutlinedInput, Stack, Typography, Link, Snackbar, Alert } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router';
import { OTPVERIFY_MUTATION, FORGOTPASS_MUTATION } from 'graphql/userMutations';
import { otpSchema } from 'schems/auth/authSchemas';
import { useMutation } from '@apollo/client/react';

export default function AuthOtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOtpChange = (index, value, setFieldValue) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Update Formik value with concatenated OTP
    setFieldValue('otp', newOtp.join(''));

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const [otpVerify, { loading }] = useMutation(OTPVERIFY_MUTATION);
  const [forgotPassword, { loading: resendLoading }] = useMutation(FORGOTPASS_MUTATION);

  const closeSnackbar = (_, reason) => reason !== 'clickaway' && setSnackbar((s) => ({ ...s, open: false }));

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const email = localStorage.getItem('email');
    try {
      const { data } = await otpVerify({
        variables: {
          code: values.otp,
          email,
        },
      });

      const res = data?.otpVerify;
      if (res?.success === true) {
        setSnackbar({ open: true, message: res.message || 'Otp Verify Sucessfully', severity: 'success' });
        // setTimeout(() => navigate('/reset-password'), 1500);
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

  const handleResend = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      setSnackbar({ open: true, message: 'Email not found', severity: 'error' });
      return;
    }

    try {
      const { data } = await forgotPassword({ variables: { email } });
      if (data?.forgotPassword?.success === true) {
        const msg = data?.forgotPassword?.message || 'OTP sent successfully';
        setSnackbar({ open: true, message: msg, severity: 'success' });
      } else {
        const msg = data?.forgotPassword?.message;
        setSnackbar({ open: true, message: msg, severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };
  return (
    <>
      <Formik initialValues={{ otp: '' }} validationSchema={otpSchema} onSubmit={handleSubmit}>
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <Typography variant="subtitle3" color="text.secondary">
                  Enter 6 digit OTP sent to your email ID
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="left" mt="10px">
                  {otp.map((digit, i) => (
                    <OutlinedInput
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: 'center', fontSize: 18, color: '#5B6B79', fontWeight: 400 },
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value, setFieldValue)}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pasteData = e.clipboardData.getData('Text').slice(0, otp.length);
                        const newOtp = pasteData.split('');
                        while (newOtp.length < otp.length) newOtp.push('');
                        setOtp(newOtp);
                        setFieldValue('otp', newOtp.join(''));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          e.preventDefault();
                          const newOtp = [...otp];
                          newOtp[i] = '';
                          setOtp(newOtp);
                          setFieldValue('otp', newOtp.join(''));

                          if (i > 0) {
                            const prevInput = document.getElementById(`otp-${i - 1}`);
                            if (prevInput) prevInput.focus();
                          }
                        } else if (e.key === 'ArrowRight') {
                          e.preventDefault();
                          if (i < otp.length - 1) {
                            const nextInput = document.getElementById(`otp-${i + 1}`);
                            if (nextInput) nextInput.focus();
                          }
                        } else if (e.key === 'ArrowLeft') {
                          e.preventDefault();
                          if (i > 0) {
                            const prevInput = document.getElementById(`otp-${i - 1}`);
                            if (prevInput) prevInput.focus();
                          }
                        }
                      }}
                      sx={{ width: 52, height: 60, borderRadius: '10px' }}
                    />
                  ))}
                </Stack>

                {/* ✅ Show error message */}
                {errors.otp && (
                  <Typography variant="caption" color="error.main" sx={{ mt: 1 }}>
                    {errors.otp}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
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

              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 20, lineHeight: '100%', fontWeight: 400 }}>
                  Didn’t receive the code?{' '}
                  <Link
                    href="#"
                    underline="hover"
                    color="primary.main"
                    onClick={(e) => {
                      e.preventDefault();
                      handleResend();
                    }}
                  >
                    Resend
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
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

AuthOtpVerification.propTypes = {
  onVerify: PropTypes.func,
};
