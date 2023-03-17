import axios from "axios";
import { useState, useEffect } from "react";

const useUserFetch = (userId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`
      )
      .then((res) => {
        console.log(res.data, "response data from USERFETCH");
        setUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [userId]);

  return { loading, error, user };
};

export default useUserFetch;
