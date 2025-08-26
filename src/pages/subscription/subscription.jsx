import { useState } from 'react';
import Typography from '@mui/material/Typography';
import ActionButtons from 'sections/subscription/ActionButtons';
import SubscribersList from 'sections/subscription/SubscribersList';
import SubscriptionForm from 'sections/subscription/SubscriptionForm';

export default function Subscription() {
  const [activeTab, setActiveTab] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const handleTabChange = (val) => setActiveTab(val);
  const handleClose = () => setShowForm(false);

  return (
    <>
      {showForm ? (
        <>
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Subscription Form
          </Typography>

          <SubscriptionForm onCancel={handleClose} />
        </>
      ) : (
        <>
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Subscription
          </Typography>

          <ActionButtons activeTab={activeTab} onTabChange={handleTabChange} onCreate={() => setShowForm(true)} />

          <SubscribersList activeTab={activeTab} />
        </>
      )}
    </>
  );
}
