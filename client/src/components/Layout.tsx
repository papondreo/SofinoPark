import React from 'react';
import NavBar from './UI/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './UI/Footer/Footer';
import type { LayoutProps } from '../types/UseAdminType';

export default function Layout({ admin, logoutHandler }: LayoutProps): React.JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer admin={admin} logoutHandler={logoutHandler} />
    </>
  );
}
