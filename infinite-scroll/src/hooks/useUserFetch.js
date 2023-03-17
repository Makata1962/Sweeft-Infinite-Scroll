import axios from "axios";
import { useState, useEffect } from "react";

const useUserFetch = (userId, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  console.log(userId, "userId", pageNumber, "pageNumber");

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`
      )
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });

    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${pageNumber}/10`
      )
      .then((res) => {
        setHasMore(res.data.list.length > 0);
        setLoading(false);
        setFriends((prevFriends) => {
          return [...new Set([...prevFriends, ...res.data.list])];
        });
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [userId, pageNumber]);

  return { loading, error, user, friends, hasMore };
};

export default useUserFetch;
