import type React from 'react';
import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../api/axiosInstance';
import type { AdminData, AdminState, UseAdminReturnType } from '../types/UseAdminType';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useAdmin(): UseAdminReturnType {
  const [admin, setAdmin] = useState<AdminState>({ status: 'fetching', data: null });

  useEffect(() => {
    axiosInstance
      .get<{
        accessToken: string;
        admin: AdminData;
      }>('/tokens/refresh')
      .then(({ data }) => {
        setTimeout(() => {
          setAdmin({ status: 'logged', data: data.admin });
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setAdmin({ status: 'guest', data: null });
        setAccessToken('');
      });
  }, []);

  const logoutHandler = (): void => {
    axiosInstance
      .get('/admin/logout')
      .then(() => setAdmin({ status: 'guest', data: null }))
      .catch((error: unknown) => console.error('Logout error:', error));
    setAccessToken('');
  };

  const signInHandler = (
    e: React.FormEvent<HTMLFormElement>,
    recaptchaValue: string | null,
  ): void => {
    e.preventDefault();
    if (!recaptchaValue) {
      toast.error('Подтвердите, что вы не робот');
      return;
    }
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (!formData.login || !formData.password) {
      toast.error('Отсутствуют обязательные поля!');
      return;
    }
    axiosInstance
      .post<{ admin: AdminData }>('/admin/login', formData)
      .then(({ data }) => {
        setAdmin({ status: 'logged', data: data.admin });
        window.location.href = '/';
      })
      .catch((error: unknown) => {
        toast.error('Неправильный логин или пароль');
        console.log(error);
      });
  };

  return {
    admin,
    signInHandler,
    logoutHandler,
  };
}
