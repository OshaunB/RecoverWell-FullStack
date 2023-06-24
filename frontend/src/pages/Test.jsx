import { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input
} from "@material-tailwind/react";
import { XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import CommentCard from "../components/posts/CommentCard.jsx";

export default function Comment() {
  const [openBottom, setOpenBottom] = useState(false);

  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={openDrawerBottom}>Open Drawer Bottom</Button>
      </div>
      <Drawer
        size={700}
        placement="bottom"
        open={openBottom}
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
          <CommentCard time="notime" username="username" comment="comment" />
          <CommentCard time="notime" username="username" comment="comment" />
          <CommentCard time="notime" username="username" comment="comment" />
          <CommentCard time="notime" username="username" comment="comment" />
          <CommentCard time="notime" username="username" comment="comment" />
          <CommentCard time="notime" username="username" comment="comment" />
          <CommentCard time="notime" username="username" comment="comment" />
          <CommentCard time="notime" username="username" comment="comment" />
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
