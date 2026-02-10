/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { useLocation } from 'react-router-dom';
import './HousePage.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import type { HousePageProps } from '../../../types/HousePageType';

export default function HousePage(): React.JSX.Element {
  const location = useLocation();
  const cottage = location.state?.cottage as HousePageProps['cottage'];

  // Генерация путей к изображениям
  const images = Array.from(
    { length: 5 },
    (_, index) => `/assets/cottages/cot${cottage.id.toString()}/bg_${(index + 1).toString()}.jpg`,
  );

  return (
    <div className="house-page-container">
      <Typography variant="h4" className="mainPageContentTitle" style={{ marginBottom: '30px' }}>
        Коттедж №{cottage.id}
      </Typography>
      <div className="house-page-content">
        <Swiper
          style={
            {
              '--swiper-navigation-color': 'black',
              '--swiper-pagination-color': '#fff',
            } as React.CSSProperties
          }
          speed={600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Parallax, Pagination, Navigation]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="swiperImg"
                src={image}
                alt={`Cottage ${cottage.id.toString()} - Slide ${(index + 1).toString()}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="house-page-details">
          <h2>Стоимость: {cottage.cost} рублей</h2>
          <p className="house-page-area">Площадь: {cottage.area} м²</p>
        </div>
      </div>
    </div>
  );
}
