import { Card, Avatar } from "flowbite-react";

export default function RenderPosts(props) {
  return (
    <div>
      <Card className="my-4 flex justify-start items-start max-w-xl mx-auto">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Avatar
              alt="User logo"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
            <div>
              <div>{props.username}</div>
              <div className="ml-auto text-gray-400 text-sm">{props.time}</div>
            </div>
          </div>
          <div>{props.content}</div>
        </div>
        <div className="flex justify-around">
          <div>
            <span onClick={() => props.clickLike(props.post)}>
              {props.icon}
            </span>{" "}
            {props.likes}
          </div>
          <div>Comment</div>
          <div>Share</div>
        </div>
      </Card>
    </div>
  );
}
