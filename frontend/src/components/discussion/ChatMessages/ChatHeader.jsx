export default function ChatHeader({ senderUsername, senderAvatar }) {
  return (
    <div className="flex justify-center items-center h-20 bg-gray-200 py-2 px-4">
      <div className="flex items-center">
        <img
          src={senderAvatar}
          alt="Sender Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <h3 className="text-xl font-semibold">{senderUsername}</h3>
      </div>
    </div>
  );
}
