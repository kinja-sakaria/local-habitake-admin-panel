// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project-imports
import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';
import LanguageSwitcher from './LanguageSwitcher';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      <Box sx={{ width: '100%', ml: { xs: 0, md: 2 } }}></Box>
      {downLG && <Box sx={{ width: 1, ml: 1 }} />}
      <LanguageSwitcher />
      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
