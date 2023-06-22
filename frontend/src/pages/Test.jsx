import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Card, Typography } from "@material-tailwind/react";

export default function RenderPosts(props) {
  return (
    <div className="flex justify-center py-3">
      <Card className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 bg-white shadow-lg rounded-lg p-4 hover:bg-gray-100">
        <div className="flex items-center mb-4">
          <img
            src={props.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt="Profile Picture"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4"
          />
          <div>
            <Typography variant="h6" className="font-bold text-sm sm:text-base">
              @{props.username}
            </Typography>
            <Typography color="textSecondary" variant="body2" className="text-xs sm:text-sm">
              {props.time}
            </Typography>
          </div>
        </div>
        <Typography className="text-gray-800 text-xs sm:text-sm mb-4 pl-5">{props.content}</Typography>
        <div className="flex justify-around">
          <div>
            <span onClick={() => props.clickLike(props.post)}>
              {props.icon}
            </span>{" "}
            {props.likes}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => props.clickComment(props.post)}
          >
            <CommentIcon fontSize="small" /> Comment
          </div>
          <div>
            <ShareIcon fontSize="small" /> Share
          </div>
        </div>
      </Card>
    </div>
  );
}
