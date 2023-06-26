import { Avatar, Tooltip } from "@material-tailwind/react";

export default function EventUserAvatar(props) {
  return (
      <Tooltip content={props.username}>
        <Avatar onClick={props.onClick}
          variant="circular"
          className="border-2 border-white hover:z-10 focus:z-10 cursor-pointer"
          src={props.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        />
      </Tooltip>
  );
}
