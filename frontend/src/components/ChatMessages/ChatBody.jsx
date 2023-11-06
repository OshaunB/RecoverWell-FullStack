export default function ChatBody({ position, senderAvatar, message }) {
  return position === "start" ? (
    <div className="flex justify-start my-4 items-center">
      <img
        src={senderAvatar}
        className="object-cover h-8 w-8 rounded-full"
        alt=""
      />
      <div className="ml-2 py-3 px-4 bg-blue-400 rounded-full text-white max-w-lg">
        {message}
      </div>
    </div>
  ) : (
    <div className="flex justify-end my-2 mx-2 items-center">
      <div className="mr-2 py-3 px-4 bg-blue-400 rounded-full text-white max-w-lg">
        {message}
      </div>
      <img
        src={senderAvatar}
        className="object-cover h-8 w-8 rounded-full"
        alt=""
      />
    </div>
  );
}
