/* eslint-disable no-unused-vars */
import type React from 'react';

export type AdminData = {
  id: number;
  username: string;
};

export type AdminState = {
  status: 'fetching' | 'logged' | 'guest';
  data: AdminData | null;
};

export type UseAdminReturnType = {
  admin: AdminState;
  signInHandler: (e: React.FormEvent<HTMLFormElement>, recaptchaValue: string | null) => void;
  logoutHandler: () => void;
};
export type LayoutProps = {
  admin: AdminState;
  logoutHandler: () => void;
};
export type AllHousesPageProps = {
  admin: AdminState;
};
