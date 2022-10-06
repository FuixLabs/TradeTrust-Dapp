import WidgetsIcon from '@mui/icons-material/Widgets';
import GradingIcon from '@mui/icons-material/Grading';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const iconSizing = {
  height: 18,
  width: 18,
};

export const SIDEBAR_LINK = [
  {
    name: 'Overview',
    to: '/',
    icon: <WidgetsIcon sx={iconSizing} />,
  },
  {
    name: 'Verify',
    to: '/verify',
    icon: <GradingIcon sx={iconSizing} />,
  },
  {
    name: 'Update',
    to: '/update',
    icon: <SystemUpdateAltIcon sx={iconSizing} />,
  },
  {
    name: 'Revoke',
    to: '/revoke',
    icon: <ContentPasteOffIcon sx={iconSizing} />,
  },
  {
    name: 'Profile',
    to: '/profile',
    icon: <ManageAccountsIcon sx={iconSizing} />,
  },
  {
    name: 'Users',
    to: '/users',
    icon: <PeopleAltIcon sx={iconSizing} />,
  },
];
