import PropTypes from 'prop-types';
import { useState } from 'react';
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
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';

// assets
import { Eye, EyeSlash } from 'iconsax-reactjs';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: 'info@phoenixcoded.co',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .test('no-leading-trailing-whitespace', 'Password can not start or end with spaces', (value) => value === value.trim())
            .max(10, 'Password must be less than 10 characters')
        })}
        onSubmit={(values) => {
          console.log('Login successful', values);
          navigate('/dashboard');
        }}
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
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
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
                        borderRadius: '48px'
                      },
                      '&:focus': {
                        borderRadius: '48px',
                        outline: 'none'
                      },
                      '&::after': {
                        content: '""',
                        display: 'block',
                        borderRadius: '48px'
                      }
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
    </>
  );
}

AuthLogin.propTypes = { forgot: PropTypes.string };
