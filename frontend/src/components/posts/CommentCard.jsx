/* eslint-disable operator-linebreak */
import { Typography } from "@material-tailwind/react";

export default function CommentCard(props) {
  return (
    <div className="flex justify-center py-3">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 bg-white shadow-lg rounded-lg border border-gray-300 p-4 hover:bg-gray-100">
        <div className="flex items-center mb-4">
          <img
            src={
              props.avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile Picture"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <Typography variant="h5" color="blue-gray">
              @{props.username}
            </Typography>
            <p className="text-gray-500 text-sm">{props.time}</p>
          </div>
        </div>
        <Typography variant="lead" className="pl-5">
          {props.comment}
        </Typography>
      </div>
    </div>
  );
}
