import MainCard from 'components/MainCard';
import CallIcon from '@mui/icons-material/Call';
import { UserIdProofIcon } from 'components/asstes';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Avatar, Button, Divider, Stack, Typography } from '@mui/material';

export default function UserProfileCard({ user, activeTab }) {
  return (
    <MainCard>
      {/* Verify Button */}
      <Button
        variant="contained"
        size="small"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          borderRadius: '20px',
          px: 2,
          textTransform: 'capitalize',
          bgcolor: 'success.main',
          '&:hover': { bgcolor: 'success.dark' },
        }}
      >
        {user.status}
      </Button>

      {/* Avatar */}
      <Avatar src={user.image} alt="User" sx={{ width: 128, height: 128, mx: 'auto', mb: 2 }} />

      {/* Name */}
      <Typography variant="h4" textAlign="center" color="secondary.800" fontWeight={500}>
        {user.name || 'Merita Sadore'}
      </Typography>
      <Typography variant="h5" textAlign="center" color="secondary.main" fontWeight={400} py="5px">
        {activeTab === 0 && user.role === 'Seller' && '(Seller)'}
        {activeTab === 0 && user.role === 'Agent' && '(Agent)'}
        {activeTab === 1 && '(Agent)'}
        {activeTab === 2 && '(Buyer)'}
      </Typography>

      {/* Last updated */}
      <Typography variant="h5" display="block" textAlign="center" color="secondary.main" fontWeight={400}>
        Last updated : 20/03/2025 06:18 PM
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Email */}
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <EmailRoundedIcon sx={{ color: 'success.main' }} />
        <Typography variant="h5" fontWeight={400} color="secondary.main">
          {user.email}
        </Typography>
      </Stack>

      {/* Aadhar & Phone*/}
      <Stack direction="row" alignItems="center" spacing={1} pb={2}>
        {activeTab === 2 ? <CallIcon sx={{ fill: '#01A669' }} /> : <UserIdProofIcon />}
        <Typography variant="h5" fontWeight={400} color="secondary.main">
          {activeTab === 2 ? user.phone : 'Aadhar Card'}
        </Typography>
      </Stack>
    </MainCard>
  );
}
