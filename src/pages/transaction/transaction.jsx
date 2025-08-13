import Typography from '@mui/material/Typography';
import TransactionHistory from 'sections/transaction/TransactionHistory';
import MainCard from 'components/MainCard';

export default function Transaction() {
  return (
    <>
      <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
        Transactions
      </Typography>
      <MainCard>
        <TransactionHistory />
      </MainCard>
    </>
  );
}
