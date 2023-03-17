import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cards, setCards] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNumber}/10`,
      params: { page: pageNumber },
    })
      .then((res) => {
        setCards((prevCards) => {
          return [...new Set([...prevCards, ...res.data.list])];
        });
        setHasMore(res.data.list.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [pageNumber]);

  return { loading, error, cards, hasMore };
};

export default useFetch;
