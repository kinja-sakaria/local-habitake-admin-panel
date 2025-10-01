import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// project-imports
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';

// assets
import avatar1 from '/assets/images/users/avatar-6.png';
import { Logout } from 'iconsax-reactjs';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client/react';
import { USERLOGOUT_MUTATION } from 'graphql/userMutations';
import { useNavigate } from 'react-router';
import { logout } from 'store/slices/userSlice';
import { Alert, Snackbar } from '@mui/material';

export default function ProfilePage() {
  const theme = useTheme();
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const user = useSelector((state) => state.admin.user);
  const [userLogoutMutation] = useMutation(USERLOGOUT_MUTATION);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const closeSnackbar = (_, reason) => reason !== 'clickaway' && setSnackbar((s) => ({ ...s, open: false }));
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogoutClick = () => {
    setOpen(false);
    setConfirmOpen(true);
  };

  const handleConfirmLogout = async () => {
    //
    // // Perform logout logic here
    // console.log('User logged out');
    try {
      const { data } = await userLogoutMutation({
        variables: {
          userId: user?.userId,
        },
      });

      if (data?.logoutUser?.success === true) {
        setSnackbar({
          open: true,
          message: data?.logoutUser?.message || 'Admin Logout Successfully',
          severity: 'success',
        });

        // Close the confirmation dialog
        setConfirmOpen(false);

        // Close profile popper
        setOpen(false);

        // Dispatch logout to Redux & clear cookies
        dispatch(logout());

        // Redirect after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      const msg = data?.logoutUser?.message;

      setSnackbar({ open: true, message: msg, severity: 'error' });
    }
  };

  const handleCancelLogout = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <ButtonBase
          sx={(theme) => ({
            p: 0.25,
            borderRadius: 1,
            '&:hover': { bgcolor: 'secondary.lighter' },
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.secondary.dark}`,
              outlineOffset: 2,
            },
          })}
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? 'profile-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar alt="profile user" src={avatar1} />
        </ButtonBase>
        <Popper
          placement="bottom-end"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 9] } }] }}
        >
          {({ TransitionProps }) => (
            <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
              <Paper
                sx={(theme) => ({
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: { maxWidth: 250 },
                  borderRadius: 1.5,
                })}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid>
                          <Stack direction="row" sx={{ gap: 1.25, alignItems: 'center' }}>
                            <Avatar alt="profile user" src={avatar1} />
                            <Stack>
                              <Typography variant="subtitle1">Admin</Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid>
                          <Tooltip title="Logout">
                            <IconButton size="large" color="error" sx={{ p: 1 }} onClick={handleLogoutClick}>
                              <Logout variant="Bulk" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          )}
        </Popper>

        {/* Logout Confirmation Dialog */}
        <Dialog
          open={confirmOpen}
          onClose={handleCancelLogout}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle id="logout-dialog-title" fontSize={20} fontWeight={600}>
            Confirm Logout
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description" color="primary" fontSize={16} fontWeight={400}>
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelLogout} color="primary">
              No
            </Button>
            <Button onClick={handleConfirmLogout} color="error" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
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
