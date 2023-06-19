import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

export default function RenderPosts(props) {
  return (
    <div className="flex justify-center py-3">
      <div className="w-2/5 bg-white shadow-lg rounded-lg p-4 hover:bg-gray-100">
        <div className="flex items-center mb-4">
          <img
            src={props.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-bold">@{props.username}</h2>
            <p className="text-gray-500 text-sm">{props.time}</p>
          </div>
        </div>
        <p className="text-gray-800 mb-4 pl-5">{props.content}</p>
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
            <CommentIcon /> Comment
          </div>
          <div>
            <ShareIcon /> Share
          </div>
        </div>
      </div>
    </div>
  );
}
