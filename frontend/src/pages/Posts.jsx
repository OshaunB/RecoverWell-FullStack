/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  getPostOptions,
  fetchHandler,
  findUserName,
  timeDifference,
} from "../utils";
import RenderPosts from "../components/RenderPosts";
import CreatePost from "../components/CreatePost";

export default function Posts() {
  const { id } = useParams();
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [postLikes, setPostLikes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
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
        fetchHandler(`/api/check-post-like/${post.id}`));
      const likeStatusData = await Promise.all(likeStatusPromises);
      const likeStatus = {};
      likeStatusData.forEach(([likeData], index) => {
        likeStatus[sortedPosts[index].id] = likeData;
      });

      setPostLikes(likeStatus);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const [data, error] = await fetchHandler(`/api/users`);
      if (error) {
        console.log(error);
        return;
      }
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleLike = useCallback(
    async (post) => {
      const postId = post.id;
      const likeStatus = postLikes[postId];
      const [_, error] = await fetchHandler(
        `/api/posts-like`,
        getPostOptions({ postId })
      );

      if (error) {
        console.log(error);
        return;
      }

      const updatedLikes = { ...postLikes };
      updatedLikes[postId] = !likeStatus;
      setPostLikes(updatedLikes);

      // Update the like count of the specific post in the posts state
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
          icon={
            postLikes[post.id] === true ? (
              <ThumbUpAltIcon />
            ) : (
              <ThumbUpOffAltIcon />
            )
          }
          clickLike={handleLike}
          post={post}
        />
      ))}
    </div>
  );
}
