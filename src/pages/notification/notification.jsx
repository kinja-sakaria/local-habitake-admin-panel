import Typography from '@mui/material/Typography';
// project imports
import NotificationForm from '../../sections/notification/NotificationForm';

export default function Notification() {
  return (
    <>
      <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
        Notification
      </Typography>
      <NotificationForm />
    </>
  );
}
