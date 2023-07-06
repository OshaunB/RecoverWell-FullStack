/* eslint-disable operator-linebreak */
import { Avatar } from "@material-tailwind/react";

export default function ChatUsersMenu({
  username,
  avatar,
  onClick,
  lastMessage,
}) {
  const defaultImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-row py-4 px-2 items-center border-b-2"
    >
      <div className="w-1/4">
        <Avatar src={avatar || defaultImg} />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">@{username}</div>
        <span className="text-gray-500">{lastMessage}</span>
      </div>
    </div>
  );
}
