// assets
import {
  AiModalIcon,
  DashboardIcon,
  NotificationIcon,
  PropertyManagment,
  SettingIcon,
  SubcriptionIcon,
  SupportIcon,
  TransactionIcon,
  UserManagment,
} from '../components/asstes';

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

const getDashboardMenu = (t) => ({
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: t('menu.dashboard'),
      type: 'item',
      url: '/dashboard',
      icon: icons.dashboard,
      breadcrumbs: false,
    },
    {
      id: 'usermanagement',
      title: t('menu.userManagement'),
      type: 'item',
      url: '/user-management',
      icon: icons.userManagment,
      breadcrumbs: false,
    },
    {
      id: 'propertymangement',
      title: t('menu.propertyManagement'),
      type: 'item',
      url: '/property-management',
      icon: icons.propertyManagment,
      breadcrumbs: false,
    },
    {
      id: 'subscription',
      title: t('menu.subscription'),
      type: 'item',
      url: '/subscription',
      icon: icons.subcription,
      breadcrumbs: false,
    },
    {
      id: 'setting',
      title: t('menu.setting'),
      type: 'item',
      url: '/setting',
      icon: icons.setting,
      breadcrumbs: false,
    },
    {
      id: 'transaction',
      title: t('menu.transaction'),
      type: 'item',
      url: '/transaction',
      icon: icons.transactionIcon,
      breadcrumbs: false,
    },
    {
      id: 'aimodeltraining',
      title: t('menu.aiModelTraining'),
      type: 'item',
      url: '/ai-model-training',
      icon: icons.aimodal,
      breadcrumbs: false,
    },
    {
      id: 'support',
      title: t('menu.support'),
      type: 'item',
      url: '/support',
      icon: icons.support,
      breadcrumbs: false,
    },
    {
      id: 'notification',
      title: t('menu.notification'),
      type: 'item',
      url: '/notification',
      icon: icons.notification,
      breadcrumbs: false,
    },
  ],
});

export default getDashboardMenu;
