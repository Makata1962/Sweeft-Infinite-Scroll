import React, { useState, useRef, useCallback } from "react";
import "./CardList.style.css";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const CardList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { cards, hasMore, loading, error } = useFetch(pageNumber);

  const observer = useRef();
  const lastCardElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevNum) => prevNum + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="card_list">
      {cards.map((card, index) => {
        if (cards.length === index + 1) {
          return (
            <Link to={`/user/${card.id}`} key={index}>
              <div ref={lastCardElementRef} className="card" key={index}>
                <img src={card.imageUrl} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Link>
          );
        } else {
          return (
            <Link to={`/user/${card.id}`} key={index}>
              <div className="card" key={index}>
                <img src={card.imageUrl} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Link>
          );
        }
      })}
      {loading && <div>Loading...</div>}
      {error && <div>Error...</div>}
    </div>
  );
};

export default CardList;
