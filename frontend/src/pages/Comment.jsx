/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CommentCard from "../components/posts/CommentCard";
import { UserContext } from "../contexts/UserContext";
import CurrentUserContext from "../contexts/current-user-context";
import {
  getPostOptions,
  fetchHandler,
  findUserName,
  timeDifference,
} from "../utils";

export default function Comment() {
  const { postId } = useParams();
  const { users } = useContext(UserContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      if (!currentUser) return;
      const [data, error] = await fetchHandler(`/api/${postId}/comments`);
      if (error) return console.log(error);
      setComments(data);
    })();
  }, [currentUser]);

  if (!currentUser) return <p>You need to be logged in to comment</p>;

  const addComment = async (e) => {
    e.preventDefault();
    const commentData = {
      comment: e.target.comment.value,
      postId,
    };
    const [data, error] = await fetchHandler(
      `/api/comments`,
      getPostOptions(commentData)
    );
    if (error) return console.log(error);
    setComments((prevComments) => [...prevComments, data]);
    e.target.reset();
  };

  return (
    <>
      <div>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment.comment}
            username={findUserName(users, comment.user_id)}
            time={timeDifference(comment.created_at)}
            avatar={users.find((u) => u.id === comment.user_id)?.avatar}
          />
        ))}

        <form onSubmit={addComment}>
          <textarea
            rows="4"
            cols="50"
            id="comment"
            placeholder="Write your comment..."
          ></textarea>
          <button className="btn btn-primary">Button</button>
        </form>
      </div>
    </>
  );
}
