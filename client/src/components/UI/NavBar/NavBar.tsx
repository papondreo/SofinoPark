import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar(): React.JSX.Element {
  const navLinks = [
    { text: 'УЧАСТКИ', link: '/area-description' },
    { text: 'О ПОСЕЛКЕ', link: '/company-description' },
    { text: 'НАШИ КОТТЕДЖИ', link: '/houses' },
    { text: 'КОНТАКТЫ', link: '/contacts' },
  ];

  return (
    <Box className="navbarContainer">
      <AppBar position="static" elevation={0} className="navbarAppBar">
        <Toolbar className="navbarToolbar">
          <div className="navbarLeft">
            <Typography variant="body1" className="navbarSubtext">
              Откройте для себя
            </Typography>
            <Typography variant="body1" className="navbarSubtext">
              идеальный дом вашей мечты!
            </Typography>
          </div>

          <Typography variant="h4" component={Link} to="/" className="navbarTitle">
            «Софьино Парк»
          </Typography>

          <div className="navbarRight">
            <Box className="navbarContactInfo">
              <Typography variant="body1" className="navbarPhone">
                +7 (915) 141-97-77
              </Typography>
              <Typography variant="body1" className="navbarEmail">
                sofinopark@yandex.ru
              </Typography>
            </Box>
          </div>
        </Toolbar>

        <Box className="navbarLinksContainer">
          <Grid2 container justifyContent="center" spacing={2} component="div">
            {navLinks.map(({ text, link }) => (
              <Grid2 key={text} component="div">
                <Button component={Link} to={link} className="navbarLink">
                  {text}
                </Button>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </AppBar>
    </Box>
  );
}
