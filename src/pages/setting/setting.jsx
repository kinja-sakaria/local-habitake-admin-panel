import { useState } from 'react';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import ActionButtons from 'sections/setting/ActionButtons';
import PermissionTable from 'sections/setting/PermissionTable';
import AiTransfromation from 'sections/setting/AiTransfromation';

export default function Setting() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (val) => {
    setActiveTab(val);
  };

  return (
    <>
      <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
        Setting
      </Typography>
      <ActionButtons activeTab={activeTab} onTabChange={handleTabChange} />
      <MainCard sx={{ minHeight: '728px' }}>{activeTab === 0 ? <AiTransfromation /> : <PermissionTable />}</MainCard>
    </>
  );
}
