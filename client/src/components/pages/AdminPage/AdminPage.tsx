import { Button, Container, Input, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import type { AdminPageProps } from '../../../types/AdminPageType';
import './AdminPageStyle.css';
import ReCAPTCHA from 'react-google-recaptcha';

export default function AdminPage({ signInHandler }: AdminPageProps): React.JSX.Element {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleRecaptchaChange = (value: string | null): void => {
    setRecaptchaValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    signInHandler(e, recaptchaValue);
  };

  return (
    <Container className="loginContainer">
      <Paper elevation={3} className="loginPaper">
        <Typography variant="h4" align="center" className="loginTitle">
          Админ-панель
        </Typography>
        <form onSubmit={handleSubmit} className="loginForm">
          <Input className="loginInput" name="login" placeholder="Введите логин" />
          <Input
            className="loginInput"
            type="password"
            name="password"
            placeholder="Введите пароль"
          />
          <ReCAPTCHA
            sitekey="6Lc2yoUqAAAAACwmbe2pEBrtyuCUnIemC4RAZwa9"
            onChange={handleRecaptchaChange}
          />
          <Button type="submit" variant="contained" color="primary" className="loginButton">
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
