import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const TransformationTypeModal = ({ open, handleClose, newButton, setNewButton, handleAddButton }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Transformation Type</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New Type"
          fullWidth
          variant="outlined"
          value={newButton}
          onChange={(e) => setNewButton(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          onClick={handleClose}
          sx={{
            textTransform: 'none',
            color: '#747474',
            fontSize: '17.3px',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#000000',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddButton}
          variant="contained"
          sx={{
            borderRadius: '100px',
            textTransform: 'none',
            fontSize: '17.3px',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransformationTypeModal;
