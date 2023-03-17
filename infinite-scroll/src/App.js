import { useState, useRef, useCallback, Fragment } from "react";
import useFetch from "./components/hooks/useFetch";
import CardList from "./components/CardList";

function App() {
  // const [pageNumber, setPageNumber] = useState(1);
  // const { cards, hasMore, loading, error } = useFetch( pageNumber);

  // const observer = useRef();
  // const lastCardElementRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setPageNumber((prevNum) => prevNum + 1);
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, hasMore]
  // );

  return (
    <Fragment>
      <CardList />
    </Fragment>
  );
}

export default App;
