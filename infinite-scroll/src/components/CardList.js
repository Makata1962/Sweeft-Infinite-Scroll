import React from "react";
import Card from "./Card";
import "./CardList.style.css";

const CardList = React.forwardRef(({ cards }, cardRef) => {
  console.log(cards);
  return (
    <div className="card_list">
      {cards.map((card, index) => {
        if (cards.length === index + 1) {
          return (
            <Card
              ref={cardRef}
              key={index}
              image={card.imageUrl}
              name={card.title}
            />
          );
        } else {
          return <Card key={index} image={card.imageUrl} name={card.title} />;
        }
      })}
    </div>
  );
});

export default CardList;
