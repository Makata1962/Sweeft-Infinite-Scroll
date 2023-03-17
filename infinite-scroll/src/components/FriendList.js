import { useState, useRef, useCallback } from "react";
import useUserFetch from "../hooks/useUserFetch";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

const FriendList = () => {
  const { userId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, hasMore, friends } = useUserFetch(userId, pageNumber);

  const observer = useRef();
  const lastFriendCardRef = useCallback(
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

  if (error) {
    return (
      <div className="user-details">
        <div className="error-message">Error loading user data</div>
      </div>
    );
  }

  return (
    <div className="card_list">
      {friends.map((friend, index) => {
        if (friends.length === index + 1) {
          return (
            <Link to={`/user/${friend.id}`} key={index} className="card_link">
              <div ref={lastFriendCardRef} className="card" key={index}>
                <img src={friend.imageUrl} alt={friend.title} />
                <h3>{friend.title}</h3>
                <p>{friend.description}</p>
              </div>
            </Link>
          );
        } else {
          return (
            <Link to={`/user/${friend.id}`} key={index} className="card_link">
              <div className="card" key={index}>
                <img src={friend.imageUrl} alt={friend.title} />
                <h3>{friend.title}</h3>
                <p>{friend.description}</p>
              </div>
            </Link>
          );
        }
      })}
      {loading && <Loading />}
      {error && <div>Error...</div>}
    </div>
  );
};

export default FriendList;
