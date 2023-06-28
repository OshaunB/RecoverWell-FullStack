export default function ChatBody({ position, senderAvatar, message }) {
  return (
    <div className="flex justify-center">
      <div className={`chat chat-${position} w-full sm:w-2/3 md:w-1/2 lg:w-1/2`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={senderAvatar} alt="Avatar" />
          </div>
        </div>
        <div
          className={`chat-bubble ${
            position === "end" ? "bg-meadow" : "bg-blue-700"
          } overflow-ellipsis whitespace-nowrap`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
