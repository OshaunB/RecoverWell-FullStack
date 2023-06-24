import { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CommentCard from "./posts/CommentCard";
import { fetchHandler, getPostOptions } from "../utils";

export default function CommentDrawer(props) {
  const [openComments, setOpenComments] = useState(false);
  const openDrawerBottom = () => setOpenComments(true);
  const closeDrawerBottom = () => setOpenComments(false);
  const [comments, setComments] = useState([]);
  const { id } = props;

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler(`/api/${id}/comments`);
      if (error) return console.log(error);
      console.log(data);
      setComments(data);
    })();
  }, [id]);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div onClick={openDrawerBottom}>Comment</div>
      </div>
      <Drawer
        size={700}
        placement="bottom"
        open={openComments}
        onClose={closeDrawerBottom}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Comment Box
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerBottom}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="overflow-y-auto h-full">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment.comment}
              time="coming"
            />
          ))}
          <div className="sticky bottom-14 p-4 flex items-center justify-center">
            <input
              type="text"
              className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 bg-white shadow-lg rounded-lg border border-gray-300 p-4 hover:bg-gray-100"
              placeholder="Enter your comment..."
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
