import { useState, useEffect, useContext } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from '@mui/icons-material/Send';
import { XMarkIcon } from "@heroicons/react/24/outline";
import CommentCard from "./posts/CommentCard";
import {
  fetchHandler,
  getPostOptions,
  findUserName,
  timeDifference,
} from "../utils";
import { UserContext } from "../contexts/UserContext";

export default function CommentDrawer(props) {
  const [openComments, setOpenComments] = useState(false);
  const openDrawerBottom = () => setOpenComments(true);
  const closeDrawerBottom = () => setOpenComments(false);
  const [comments, setComments] = useState([]);
  const { id } = props;
  const { users } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler(`/api/${id}/comments`);
      if (error) return console.log(error);
      setComments(data);
    })();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    const commentData = {
      comment: e.target.comment.value,
      postId: id,
    };

    if (commentData.comment === "") return;
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
      <div className="flex flex-wrap gap-4">
        <div className="cursor-pointer" onClick={openDrawerBottom}>
          <CommentIcon /> {comments.length}
        </div>
      </div>
      <Drawer
        size={"90vh"}
        placement="bottom"
        open={openComments}
        onClose={closeDrawerBottom}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="text-center">
            Comments
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerBottom}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        {comments.length > 0 ? (
          <div className="overflow-y-auto h-4/5">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              username={findUserName(users, comment.user_id)}
              comment={comment.comment}
              time={timeDifference(comment.created_at)}
              avatar={users.find((u) => u.id === comment.user_id)?.avatar}
            />
          ))}
        </div>
        ) : (
          <Typography variant="lead" color="blue-gray" className="text-center" >Be the first to comment</Typography>
        )}

        <form
          onSubmit={addComment}
          className="absolute bottom-0 p-4 flex items-center justify-center w-full"
        >
          <input
            type="text"
            id="comment"
            className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 bg-white shadow-lg rounded-full border border-gray-300 p-4 hover:bg-gray-100"
            placeholder="Enter your comment..."
          />
          <Button type="submit" size="lg" className="relative ml-2 h-14">
            <SendIcon />
          </Button>
        </form>
      </Drawer>
    </>
  );
}
