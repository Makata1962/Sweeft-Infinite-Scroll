import React, { useState, useRef, useCallback } from "react";
import classes from "./CardList.module.scss";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

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
    <div className={classes.card_list}>
      {cards.map((card, index) => {
        if (cards.length === index + 1) {
          return (
            <Link
              to={`/user/${card.id}`}
              key={index}
              className={classes.card_link}
            >
              <div
                ref={lastCardElementRef}
                className={classes.card}
                key={index}
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className={classes["card-img"]}
                />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Link>
          );
        } else {
          return (
            <Link
              to={`/user/${card.id}`}
              key={index}
              className={classes.card_link}
            >
              <div className={classes.card} key={index}>
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className={classes["card-img"]}
                />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Link>
          );
        }
      })}
      {loading && <Loading />}
      {error && <div className={classes.error}>Error...</div>}
    </div>
  );
};

export default CardList;
