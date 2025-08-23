// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthResetPasswordConfrim() {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={3}>
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
              onClick={() => navigate('/login')}
            >
              Continue to Login
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </>
  );
}
