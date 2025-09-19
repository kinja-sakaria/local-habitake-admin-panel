// project-imports
import { t } from 'i18next';
import getDashboardMenu from './dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [getDashboardMenu(t)],
};

export default menuItems;
