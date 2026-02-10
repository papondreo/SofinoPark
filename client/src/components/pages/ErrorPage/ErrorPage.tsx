import React, { useState } from 'react';
import { Button } from '@mui/material';
import './ErrorPageStyle.css';

export default function ErrorPage(): React.JSX.Element {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleImageClick = (): void => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="errorPageContainer">
      <img
        src="/assets/img/404.jpg"
        alt="Error"
        className={`errorImg ${isFlipped ? 'flipped' : ''}`}
        onClick={handleImageClick}
      />
      <Button
        onClick={() => window.location.replace('/')}
        variant="contained"
        className="errorButton"
      >
        Вернуться на главную
      </Button>
    </div>
  );
}
