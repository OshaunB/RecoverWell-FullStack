import CurrentUserContext from "../../contexts/current-user-context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { timeDifference } from "../../utils";
import { fetchHandler } from "../../utils";
import RenderPosts from "../posts/RenderPosts";
import { UserContext } from "../../contexts/UserContext";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export default function UserPosts() {
  const navigate = useNavigate();
  const { users } = useContext(UserContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  const [userPosts, setUserPosts] = useState([]);
  const [postLikes, setPostLikes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const [data, error] = await fetchHandler(`/api/posts`);
      if (error) return console.log(error);

      let matchedPosts = data.filter((post) => post.user_id === currentUser.id);
      setUserPosts(matchedPosts);
    };

    fetchData();
  }, []);

  //   bg-red-200

  return (
    <div className="bg-red-200">
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <RenderPosts
            key={post.id}
            username={currentUser.username}
            time={timeDifference(post.created_at)}
            content={post.content}
            likes={post.number_of_likes}
            icon={
              postLikes[post.id] ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />
            }
            avatar={users.find((u) => u.id === post.user_id)?.avatar}
          />
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
