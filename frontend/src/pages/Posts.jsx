/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CurrentUserContext from "../contexts/current-user-context";

import {
  getPostOptions,
  fetchHandler,
  findUserName,
  timeDifference,
} from "../utils";
import RenderPosts from "../components/posts/RenderPosts";
import CreatePost from "../components/posts/CreatePost";
import { UserContext } from "../contexts/UserContext";

export default function Posts() {
  const navigate = useNavigate();
  const { users } = useContext(UserContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState([]);
  const [postLikes, setPostLikes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      const [data, error] = await fetchHandler(`/api/discussions/${id}`);
      if (error) return console.log(error);
      setTopic(data.topic);

      const [postData, err] = await fetchHandler(`/api/dis-posts/${id}`);
      if (err) return console.log(err);

      const sortedPosts = postData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setPosts(sortedPosts);

      const likeStatusPromises = sortedPosts.map((post) =>
        fetchHandler(`/api/check-post-like/${post.id}`)
      );
      const likeStatusData = await Promise.all(likeStatusPromises);
      const likeStatus = {};
      likeStatusData.forEach(([likeData], index) => {
        likeStatus[sortedPosts[index].id] = likeData;
      });

      setPostLikes(likeStatus);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleLike = useCallback(
    async (post) => {
      const postId = post.id;
      const likeStatus = postLikes[postId];
      const [_, error] = await fetchHandler(
        `/api/posts-like`,
        getPostOptions({ postId })
      );

      if (error) return console.log(error);

      const updatedLikes = { ...postLikes };
      updatedLikes[postId] = !likeStatus;
      setPostLikes(updatedLikes);

      const updatedPosts = posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            number_of_likes: likeStatus
              ? p.number_of_likes - 1
              : p.number_of_likes + 1,
          };
        }
        return p;
      });
      setPosts(updatedPosts);
    },
    [postLikes, posts]
  );

  if (!currentUser) return <p>Log in to see this information</p>;

  return (
    <div>
      <h1 className="flex justify-center font-bold text-3xl">{topic}</h1>
      <CreatePost setPosts={setPosts} />
      {posts.map((post) => (
        <RenderPosts
          username={findUserName(users, post.user_id)}
          key={post.id}
          time={timeDifference(post.created_at)}
          content={post.content}
          likes={post.number_of_likes}
          icon={postLikes[post.id] ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
          clickLike={handleLike}
          clickComment={() => navigate(`/posts/${post.id}/comments`)}
          post={post}
          avatar={users.find((u) => u.id === post.user_id)?.avatar}
        />
      ))}
    </div>
  );
}
