import { useState } from 'react';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import PropertyData from 'sections/property-management/PropertyData';
import PropertyDetails from 'sections/property-management/PropertyDetails';

export default function PropertyManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleTabChange = (val) => {
    setActiveTab(val);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => setSelectedUser(null);

  return (
    <>
      {selectedUser ? (
        <>
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Property Details
          </Typography>
          <PropertyDetails user={selectedUser} onClose={handleCloseDetails} activeTab={activeTab} />
        </>
      ) : (
        <>
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Property Management
          </Typography>
          <MainCard sx={{ '& .MuiCardContent-root': { padding: 0 } }}>
            <PropertyData activeTab={activeTab} onViewUser={handleViewUser} onTabChange={handleTabChange} />
          </MainCard>
        </>
      )}
    </>
  );
}
