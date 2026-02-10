import React from 'react';
import './CompanyDescriptionPageStyle.css';
import { Box, Container, Typography } from '@mui/material';

export default function CompanyDescriptionPage(): React.JSX.Element {
  return (
    <>
      <Box className="infoBlock">
        <Container>
          <Typography variant="h4" className="mainPageContentTitle">
            Наши основные преимущества
          </Typography>
          <div className="descriptionCard">
            <div className="descriptionCardContent">
              <img src="/assets/img/education_location.svg" className="svg" alt="svg"></img>
              <Typography variant="h6" className="mainPageCardTitle">
                Расположение
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Экологически чистая локация. 20 км от Мкад по Калужскому шоссе и 15 км до центра
                Подольска, на правом берегу реки Пахры.
              </Typography>
            </div>
            <div className="descriptionCardContent">
              <img src="/assets/img/15re_shop.svg" className="svg" alt="svg"></img>
              <Typography variant="h6" className="mainPageCardTitle">
                Инфраструктура
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Рядом располагаются супермаркеты и гипермаркеты, торговые центры и строительные
                магазины, школы, детские сады, аптеки и больница. Так же, на территории поселка есть
                спортивная площадка, гостевая парковка, детская площадка и прогулочные зоны
              </Typography>
            </div>
            <div className="descriptionCardContent">
              <img
                src="/assets/img/Tilda_Icons_37_Finance_technologies_moneybag.svg"
                className="svg"
                alt="svg"
              ></img>
              <Typography variant="h6" className="mainPageCardTitle">
                Стоимость
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Получите возможность стать владельцем дома вашей мечты по привлекательной цене.
                Участки с домами начинаются от 15.2 млн рублей, а для первых покупателей действует
                специальное предложение – стоимость от 14.4 млн рублей.{' '}
              </Typography>
            </div>
          </div>
          <div className="descriptionCard">
            <div className="descriptionBoxContent">
              <Typography variant="h6" className="mainPageCardTitle">
                Земельные участки без подряда
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Каждый клиент получает уникальную возможность реализовать строительство коттеджа,
                полностью соответствующего его индивидуальным представлениям и потребностям. Вы
                можете создать проект дома своей мечты, учитывая все детали и особенности, которые
                сделают его по-настоящему вашим. Ваш коттедж станет отражением вашего стиля и образа
                жизни!
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Приобретая участок с подрядом, вы получаете уникальную возможность воплотить мечту о
                собственном доме. В качестве подарка мы предлагаем вам индивидуальный проект
                коттеджа, который станет идеальным началом вашего будущего уютного пространства.
              </Typography>
            </div>
            <img src="/assets/img/CompanyDescriptionImg.jpeg" className="infoImage" alt="svg"></img>
          </div>
          <div className="descriptionCard">
            <img src="/assets/img/BabyArea.jpg" className="infoImage" alt="svg"></img>
            <div className="descriptionBoxContent">
              <Typography variant="h6" className="mainPageCardTitle">
                Комфорт и безопасность
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Участок земли находится в частной собственности, а сделка оформляется напрямую с
                продавцом через Договор купли-продажи.
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Территория относится к землям населенных пунктов и предназначена для индивидуального
                жилищного строительства (ИЖС).
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Вы становитесь владельцем земельного участка и дома, построенного на нем.
              </Typography>
              <Typography variant="body2" className="cardDescription">
                На территории расположены детская площадка, спортивные площадки и теннисный корт.
              </Typography>
              <Typography variant="body2" className="cardDescription">
                Территория закрыта и охраняется, оснащена въездной группой и КПП.
              </Typography>
            </div>
          </div>
        </Container>
      </Box>
    </>
  );
}
