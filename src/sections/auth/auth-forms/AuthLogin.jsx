import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client/react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party

import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';

// assets
import { Eye, EyeSlash } from 'iconsax-reactjs';
import { LOGIN_USER } from 'graphql/userMutations';
import { useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import Cookies from 'js-cookie';
import { loginSuccess } from 'store/slices/userSlice';
import { loginSchema } from '../../../schemas/auth/authSchemas';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(!!localStorage.getItem('rememberMe'));
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);

  const closeSnackbar = (_, reason) => reason !== 'clickaway' && setSnackbar((s) => ({ ...s, open: false }));

  const handleLoginSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { data } = await loginUser({
        variables: { input: { email: values.email, password: values.password } },
      });

      const res = data?.adminLogin;
console.log("res",res)
      if (res?.success) {
        Cookies.set('accessToken', res.accessToken, { expires: 7 });
        Cookies.set('refreshToken', res.refreshToken, { expires: 7 });
        dispatch(loginSuccess({ userId: res.userId, email: values.email }));

        setSnackbar({ open: true, message: res.message || 'Login successful!', severity: 'success' });
        // navigate('/dashboard'); 
      } else {
        const msg = res?.message || 'Login failed';
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
          password: '',
          submit: null,
        }}
        validationSchema={loginSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="email-login" sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '100%' }}>
                    Email Address
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
                    sx={{ borderRadius: '100px', fontSize: '18px', fontWeight: 400, lineHeight: '100%' }}
                  />
                  {touched.email && errors.email && (
                    <Typography variant="caption" color="error.main">
                      {errors.email}
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="password-login" sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '100%' }}>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{ borderRadius: '100px', fontSize: '18px', fontWeight: 400, lineHeight: '100%' }}
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <Typography variant="caption" color="error.main">
                      {errors.password}
                    </Typography>
                  )}
                </Stack>
              </Grid>

              <Grid sx={{ mt: -1 }} size={12}>
                <Stack direction="row" sx={{ gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography sx={{ fontSize: '20px', fontWeight: 400, lineHeight: '100%' }}>Remember me</Typography>}
                  />

                  <Link
                    sx={{ fontSize: '20px', fontWeight: 400, lineHeight: '100%' }}
                    component={RouterLink}
                    to="/forgot-password"
                    color="text.primary"
                  >
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              <Grid size={12}>
                <AnimateButton>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
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
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      {/* Snackbar */}
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

AuthLogin.propTypes = { forgot: PropTypes.string };
