/* eslint-disable @typescript-eslint/no-deprecated */
import React from 'react';
import { Box, Container, Typography, Grid, Link, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { LayoutProps } from '../../../types/UseAdminType';
import './Footer.css';

export default function Footer({ admin, logoutHandler }: LayoutProps): React.JSX.Element {
  return (
    <Box component="footer" className="footer">
      <Container className="footer-container">
        <Grid container spacing={4}>
          {/* Логотип и описание */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footer-logo">
              СОФЬИНО ПАРК
            </Typography>
            <Typography variant="body2" className="footer-description">
              Современный коттеджный поселок с развитой инфраструктурой и комфортными условиями для
              жизни. Московская прописка и высокий уровень безопасности.
            </Typography>
          </Grid>

          {/* Быстрые ссылки */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footer-links-title">
              Быстрые ссылки
            </Typography>
            <Box>
              <Link component={RouterLink} to="area-description" className="footer-link">
                О проекте
              </Link>
              <Link component={RouterLink} to="company-description" className="footer-link">
                Преимущества
              </Link>
              <Link component={RouterLink} to="houses" className="footer-link">
                Цены
              </Link>
              <Link component={RouterLink} to="contacts" className="footer-link">
                Контакты
              </Link>
            </Box>
          </Grid>

          {/* Контакты */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footer-contacts-title">
              Контакты
            </Typography>
            <Box>
              <Typography variant="body2" className="footer-contacts-item">
                <Link href="tel:+79151419777" className="footer-link">
                  +7 (915) 141-97-77
                </Link>
              </Typography>
              <Typography variant="body2" className="footer-contacts-item">
                <Link href="mailto:sofinopark@yandex.ru" className="footer-link">
                  sofinopark@yandex.ru
                </Link>
              </Typography>
              <Typography variant="body2" className="footer-contacts-item">
                Москва, Калужское шоссе, 20 км от МКАД
              </Typography>
              <Typography variant="body2" className="footer-contacts-item">
                {admin.status === 'guest' && (
                  <Link className="footer-link" component={RouterLink} to="/adminka">
                    Сотрудникам
                  </Link>
                )}

                {admin.data && (
                  <Button className="logoutButton" onClick={logoutHandler}>
                    Выйти
                  </Button>
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Нижняя часть футера */}
        <Box className="footer-bottom">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} СОФЬИНО ПАРК. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
