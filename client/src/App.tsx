import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AllHousesPage from './components/pages/AllHousesPage/AllHousesPage';
import MainPage from './components/pages/MainPage/MainPage';
import ContactsPage from './components/pages/ContactsPage/ContactsPage';
import AreaDescriptionPage from './components/pages/AreaDescriptionPage/AreaDescriptionPage';
import CompanyDescriptionPage from './components/pages/CompanyDescriptionPage/CompanyDescriptionPage';
import HousePage from './components/UI/HousePage/HousePage';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdminPage from './components/pages/AdminPage/AdminPage';
import SendedApplication from './components/pages/SendedApplication/SendedApplication';
import useAdmin from './hooks/useAdmin';

const theme = createTheme({
  typography: {
    fontFamily: 'Gilroy, Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightBold: 800,
  },
});

function App(): React.JSX.Element {
  const { signInHandler, logoutHandler, admin } = useAdmin();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout admin={admin} logoutHandler={logoutHandler} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/adminka',
          element: <AdminPage signInHandler={signInHandler} />,
        },
        {
          path: '/sended-application',
          element: <SendedApplication />,
        },
        {
          path: '/houses',
          element: <AllHousesPage admin={admin} />,
        },
        {
          path: '/house/:id',
          element: <HousePage />,
        },
        {
          path: '/contacts',
          element: <ContactsPage />,
        },
        {
          path: '/area-description',
          element: <AreaDescriptionPage admin={admin} />,
        },
        {
          path: '/company-description',
          element: <CompanyDescriptionPage />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
