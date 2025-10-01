import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import PropertyData from 'sections/property-management/PropertyData';
import PropertyDetails from 'sections/property-management/PropertyDetails';

export default function PropertyManagement() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (location.state?.property) {
      setSelectedProperty(location.state.property);
      setActiveTab(location.state.activeTab ?? 0);
    }
  }, [location.state]);

  const handleTabChange = (val) => setActiveTab(val);
  const handleViewProperty = (property) => setSelectedProperty(property);
  const handleCloseDetails = () => setSelectedProperty(null);

  return (
    <>
      {selectedProperty ? (
        <>
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Property Details
          </Typography>
          <PropertyDetails property={selectedProperty} onClose={handleCloseDetails} />
        </>
      ) : (
        <>
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Property Management
          </Typography>
          <MainCard sx={{ '& .MuiCardContent-root': { padding: 0 } }}>
            <PropertyData activeTab={activeTab} onViewUser={handleViewProperty} onTabChange={handleTabChange} />
          </MainCard>
        </>
      )}
    </>
  );
}
