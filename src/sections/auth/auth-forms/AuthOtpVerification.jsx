/* eslint-disable prettier/prettier */
import { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, OutlinedInput, Stack, Typography, Link } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router';

export default function AuthOtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index, value, setFieldValue) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Update Formik value with concatenated OTP
    setFieldValue('otp', newOtp.join(''));

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <Formik
      initialValues={{ otp: '' }}
      validationSchema={Yup.object().shape({
        otp: Yup.string().required('OTP is required').length(4, 'Enter 4 digits'),
      })}
      onSubmit={(values) => {
        console.log('OTP submitted:', values.otp);
        navigate('/reset-password');
      }}
    >
      {({ handleSubmit, errors, touched, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="subtitle3" color="text.secondary">
                Enter 4 digit OTP sent to your email ID
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
                    }}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value, setFieldValue)}
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
                <Link href="#" underline="hover" color="primary.main">
                  Resend
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

AuthOtpVerification.propTypes = {
  onVerify: PropTypes.func,
};
