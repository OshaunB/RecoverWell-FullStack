/* eslint-disable operator-linebreak */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import { ChatContext } from "../contexts/ChatContext";
import ChatBody from "../components/discussion/ChatMessages/ChatBody.jsx";
import ChatFooter from "../components/discussion/ChatMessages/ChatFooter";
import { UserContext } from "../contexts/UserContext";
import { findUserById, } from "../utils";

export default function Chat() {
  const { id } = useParams();
  const { prevChat, setReceiverId, room, socket, currentUser } =
    useContext(ChatContext);
  const { users } = useContext(UserContext);

  useEffect(() => {
    setReceiverId(id);
    socket.emit("join_room", room);
  }, [id, room]);

  return (
    <div className="h-screen flex flex-col">
      <ScrollToBottom className="flex-grow overflow-y-scroll px-4">
        {prevChat.map((m) => {
          const sender = findUserById(users, m.sender_id);
          const receiver = findUserById(users, m.receiver_id);
          const senderAvatar =
            sender?.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
          const receiverAvatar =
            receiver?.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

          return (
            <ChatBody
              key={crypto.randomUUID()}
              position={currentUser.id === m.sender_id ? "end" : "start"}
              message={m.message}
              senderAvatar={senderAvatar}
              receiverAvatar={receiverAvatar}
            />
          );
        })}
      </ScrollToBottom>
      <ChatFooter />
    </div>
  );
}
