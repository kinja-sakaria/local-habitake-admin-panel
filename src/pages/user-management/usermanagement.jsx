import { useState } from 'react';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import UserData from 'sections/user-management/UserData';
import ActionButtons from 'sections/user-management/ActionButtons';
import UserDetails from 'sections/user-management/UserProfile';

export default function UseManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleTabChange = (val) => {
    setActiveTab(val);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => setSelectedUser(null);
  const renderTitleAndIcon = () => {
    switch (activeTab) {
      case 0:
        return (
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Seller Profile{' '}
          </Typography>
        );
      case 1:
        return (
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Agency Profile{' '}
          </Typography>
        );
      default:
        return (
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Buyer Profile{' '}
          </Typography>
        );
    }
  };

  return (
    <>
      {selectedUser ? (
        <>
          {renderTitleAndIcon()}

          <UserDetails user={selectedUser} onClose={handleCloseDetails} activeTab={activeTab} />
        </>
      ) : (
        <>
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            User Management
          </Typography>
          <ActionButtons activeTab={activeTab} onTabChange={handleTabChange} />
          <MainCard sx={{ '& .MuiCardContent-root': { padding: 0 } }}>
            <UserData activeTab={activeTab} onViewUser={handleViewUser} />
          </MainCard>
        </>
      )}
    </>
  );
}
