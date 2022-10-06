import {
  DocumentView,
  IssueDocument,
  VerifyDocument,
  UpdateDocument,
  Overview,
  Login,
  RevokeDocument,
  UserManagement,
  Profile,
} from '../containers';

const indexRoutes = [
  {
    path: '/create',
    element: <IssueDocument />,
    private: true,
  },
  {
    path: '/verify',
    element: <VerifyDocument />,
    private: true,
  },
  {
    path: '/update',
    element: <UpdateDocument />,
    private: true,
  },
  {
    path: '/revoke',
    element: <RevokeDocument />,
    private: true,
  },
  {
    path: '/',
    element: <Overview />,
    private: true,
  },
  {
    path: '/view/:did',
    element: <DocumentView />,
    private: false,
  },
  {
    path: '/login',
    element: <Login />,
    private: false,
  },
  {
    path: '/users',
    element: <UserManagement />,
    private: true,
  },
  {
    path: '/profile',
    element: <Profile />,
    private: true,
  },
];

export default indexRoutes;
