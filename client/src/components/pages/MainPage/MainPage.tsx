import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import MainPageInlineCard from '../../UI/MainPageInlineCard/MainPageInlineCard';
import MainPageInfoCard from '../../UI/MainPageInfoCard/MainPageInfoCard';
import './MainPage.css';
import { mainAdvantagesData, additionalInfoData } from './MainPageConsts';

export default function MainPage(): React.JSX.Element {
  return (
    <Box className="mainPageContainer">
      <Container maxWidth="lg" className="mainPageContent">
        <Typography variant="h3" className="mainPageTitle">
          Поселок комфорт-класса
          <br /> «Софьино Парк»
        </Typography>
        <Typography variant="h6" className="mainPageSubtitle">
          На Калужском шоссе, 20 км от Мкад и 15 км до центра Подольска
        </Typography>
      </Container>

      <Typography variant="h4" className="mainPageContentTitle">
        Наши преимущества
      </Typography>

      {/* Первый размап с преимуществами (без фонового изображения) */}
      <Box className="inlineCardContainer">
        {mainAdvantagesData.map((card, index) => (
          <MainPageInlineCard key={index} title={card.title} description={card.description} />
        ))}
      </Box>

      <Typography variant="h4" className="mainPageContentTitle" style={{ marginTop: '40px' }}>
        Почему именно мы
      </Typography>

      {/* Второй размап с фоновым изображением */}
      <Box className="cardContainer">
        <Box className="mainPageBackground" />
        {additionalInfoData.map((card, index) => (
          <MainPageInfoCard key={index} title={card.title} description={card.description} />
        ))}
      </Box>
    </Box>
  );
}
