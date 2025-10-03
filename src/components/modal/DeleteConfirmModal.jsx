/* eslint-disable prettier/prettier */
import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import AlertIcon from 'assets/images/widget/alert-icon.png';

const DeleteConfirmModal = ({ open, onClose, onConfirm, title }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{
          textAlign: 'center',
          p: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box>
          <img src={AlertIcon} />
        </Box>
        <Typography
          fontWeight={600}
          gutterBottom
          color="info.100"
          sx={{
            fontSize: '28px',
            mb: 0,
          }}
        >
          {title}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: '50px', px: '50px' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            px: 4,
            width: '100%',
            fontSize: '16px',
            fontWeight: 500,
            borderRadius: '50px',
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.main' },
          }}
        >
          No
        </Button>
        <Button
          onClick={onConfirm}
          variant="outlined"
          sx={{
            px: 4,
            width: '100%',
            fontSize: '16px',
            fontWeight: 500,
            borderRadius: '50px',
            borderColor: 'primary.main',
            color: '#34216B',
            '&:hover': { bgcolor: 'white', color: 'primary.main', borderColor: 'primary.main' },
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteConfirmModal;
