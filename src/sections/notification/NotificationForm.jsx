import { Box, Button, Stack, TextField, Typography, Paper } from '@mui/material';

export default function NotificationForm() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: '20px',
          sm: '40px',
          md: '60px',
          lg: '75.92px',
        },
        borderRadius: 3,
        border: '1px solid #E8EBEE',
        width: '100%',
        maxWidth: 744,
        mx: 'auto',
        mt: 5,
      }}
    >
      <Typography align="center" color="secondary.main" sx={{ fontSize: '27.33px', fontWeight: 500, mb: '60px' }}>
        NOTIFICATION
      </Typography>

      <Stack spacing="60px">
        <Box>
          <Typography sx={{ fontSize: '21.26px', color: 'secondary.main', mb: 2 }}>Title</Typography>
          <TextField
            fullWidth
            placeholder="Enter Title"
            variant="outlined"
            color="secondary.main"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '24.29px',
                fontWeight: 400,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#DCDCDC',
              },
            }}
          />
        </Box>

        <Box>
          <Typography sx={{ fontSize: '21.26px', color: 'secondary.main', mb: 2 }}>Description</Typography>
          <TextField
            fullWidth
            placeholder="Enter Here"
            variant="outlined"
            multiline
            rows={4}
            sx={{
              fontSize: '24.29px',
              '& .MuiInputBase-input': {
                fontSize: '24.29px',
                fontWeight: 400,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#DCDCDC',
              },
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
          <Button
            variant="text"
            sx={{
              color: '#747474',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '21.26px',
              '&:hover': {
                backgroundColor: 'secondary.lighter',
                color: '#747474',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: '#fff',
              px: 4,
              borderRadius: '30px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '21.26px',
              '&:hover': {
                backgroundColor: '#34216B',
                color: '#fff',
              },
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
