import React, { useState } from 'react';
import { Button, Input, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { send, EmailJSResponseStatus } from '@emailjs/browser';
import './ContactsPageStyle.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';

export default function ContactsPage(): React.JSX.Element {
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ phone: string; email: string }>({ phone: '', email: '' });
  const navigate = useNavigate();

  const handleRecaptchaChange = (value: string | null): void => {
    setRecaptchaValue(value);
  };

  const isValidEmail = (Email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(Email);
  };

  const isValidPhone = (Phone: string): boolean => {
    const phoneRegex = /^(\+7|8)\d{10}$/;
    return phoneRegex.test(Phone);
  };

  const handleValidation = (captchaValue: string | null): boolean => {
    let formIsValid = true;
    const newErrors = { phone: '', email: '' };

    if (!phone) {
      formIsValid = false;
      newErrors.phone = 'Пожалуйста, введите номер телефона';
    } else if (!isValidPhone(phone)) {
      formIsValid = false;
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!email) {
      formIsValid = false;
      newErrors.email = 'Пожалуйста, введите email';
    } else if (!isValidEmail(email)) {
      formIsValid = false;
      newErrors.email = 'Введите корректный email';
    }

    if (!captchaValue) {
      formIsValid = false;
      toast.error('Подтвердите, что вы не робот');
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (handleValidation(recaptchaValue)) {
      try {
        await send(
          'service_elw9aqf',
          'template_2nvf1v5',
          {
            phone,
            email,
          },
          {
            publicKey: 'hk1r4vexc3eXWEA63',
          },
        );

        console.log('SUCCESS!');
      } catch (err) {
        if (err instanceof EmailJSResponseStatus) {
          console.log('EmailJS Request Failed...', err);
        }

        console.log('ERROR', err);
      }
      setPhone('');
      setEmail('');
      navigate('/sended-application');
    }
  };
  return (
    <div className="contactsMainContainer">
      <div className="containerContacts">
        <div className="text">
          <h1 className="contacts">КОНТАКТЫ:</h1>
          <h2 className="phone">+7 (915) 141-97-77</h2>
          <h2 className="email">SOFINOPARK@YANDEX.RU</h2>
          <h2 className="description">
            Свяжитесь с нами, чтобы узнать все преимущества жизни в наших уютных коттеджах! Более
            500 довольных клиентов уже выбрали нас!
          </h2>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <Input
            className="input"
            name="phone"
            id="phone"
            placeholder="Введите номер телефона в формате: +79991112233"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={!!errors.phone}
          />
          {errors.phone && <Typography color="error">{errors.phone}</Typography>}
          <Input
            className="input"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
          />
          {errors.email && <Typography color="error">{errors.email}</Typography>}
          <ReCAPTCHA
            sitekey="6Lc2yoUqAAAAACwmbe2pEBrtyuCUnIemC4RAZwa9"
            onChange={handleRecaptchaChange}
          />
          <Button type="submit" className="button">
            Оставить заявку
          </Button>
        </form>
      </div>
    </div>
  );
}
