import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
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
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthResetPassword() {
  const navigate = useNavigate();
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
          password: '123456',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .required('Password is required')
            .test('no-leading-trailing-whitespace', 'Password can not start or end with spaces', (value) => value === value.trim())
            .max(10, 'Password must be less than 10 characters'),

          confirmPassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        })}
        onSubmit={(values) => {
          navigate('/reset-password-conformation');
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="password" sx={{ fontSize: '18px', fontWeight: 400 }}>
                    Enter New Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    placeholder="Enter password"
                    sx={{ borderRadius: '100px', fontSize: '18px' }}
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
                  />
                  {touched.password && errors.password && (
                    <Typography variant="caption" color="error.main">
                      {errors.password}
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="confirmPassword" sx={{ fontSize: '18px', fontWeight: 400 }}>
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    placeholder="Confirm password"
                    sx={{ borderRadius: '100px', fontSize: '18px' }}
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
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Typography variant="caption" color="error.main">
                      {errors.confirmPassword}
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid size={12}>
                <AnimateButton>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
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
                    Submit
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
