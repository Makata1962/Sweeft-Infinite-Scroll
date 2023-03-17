import { useState, useRef, useCallback, Fragment } from "react";
import useFetch from "./components/hooks/useFetch";

function App() {
  // const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { cards, hasMore, loading, error } = useFetch( pageNumber);

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
    <Fragment>
      {cards.map((card, index) => {
        if (cards.length === index + 1) {
          return (
            <div ref={lastCardElementRef} key={index} className="card">
              <div>{card.name}</div>
              <div>{card.lastName}</div>
              <div>{card.title}</div>
            </div>
          );
        } else {
          return (
            <div key={index} className="card">
              <div>{card.name}</div>
              <div>{card.lastName}</div>
              <div>{card.title}</div>
            </div>
          );
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </Fragment>
  );
}

export default App;
