import React from 'react';
import './SendedApplicationStyle.css';

export default function SendedApplication(): React.JSX.Element {
  return (
    <>
      <div className="sendedContainer">
        <h1 className="sendedTitle">СПАСИБО, ВАША ЗАЯВКА ОФОРМЛЕНА</h1>
        <div className="sendedText">
          <p className="sendedDescription">Наш менеджер свяжется с вами в ближайшее время</p>
        </div>
      </div>
    </>
  );
}
