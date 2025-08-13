// assets

import { AiModalIcon, DashboardIcon, NotificationIcon, PropertyManagment, SettingIcon, SubcriptionIcon, SupportIcon, TransactionIcon, UserManagment } from '../components/asstes';

// icons
const icons = {
  setting: SettingIcon,
  aimodal: AiModalIcon,
  support: SupportIcon,
  dashboard: DashboardIcon,
  subcription: SubcriptionIcon,
  userManagment: UserManagment,
  notification: NotificationIcon,
  transactionIcon: TransactionIcon,
  propertyManagment: PropertyManagment,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.dashboard,
      breadcrumbs: false
    },
    {
      id: 'usermanagement',
      title: 'User Management',
      type: 'item',
      url: '/user-management',
      icon: icons.userManagment,
      breadcrumbs: false
    },
    {
      id: 'propertymangement',
      title: 'Property Management',
      type: 'item',
      url: '/property-management',
      icon: icons.propertyManagment,
      breadcrumbs: false
    },

    {
      id: 'subscription',
      title: 'Subscription',
      type: 'item',
      url: '/subscription',
      icon: icons.subcription,
      breadcrumbs: false
    },
    {
      id: 'setting',
      title: 'Setting',
      type: 'item',
      url: '/setting',
      icon: icons.setting,
      breadcrumbs: false
    },
    {
      id: 'transaction',
      title: 'Transaction',
      type: 'item',
      url: '/transaction',
      icon: icons.transactionIcon,
      breadcrumbs: false
    },
    {
      id: 'aimodeltraining',
      title: 'AI Model Training',
      type: 'item',
      url: '/ai-model-training',
      icon: icons.aimodal,
      breadcrumbs: false
    },
    {
      id: 'support',
      title: 'Support',
      type: 'item',
      url: '/support',
      icon: icons.support,
      breadcrumbs: false
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/notification',
      icon: icons.notification,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
