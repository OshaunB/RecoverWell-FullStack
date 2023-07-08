/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import { Avatar } from "@material-tailwind/react";
import { ChatContext } from "../contexts/ChatContext";
import ChatBody from "../components/ChatMessages/ChatBody.jsx";
import ChatFooter from "../components/ChatMessages/ChatFooter";
import { UserContext } from "../contexts/UserContext";
import { findUserById } from "../utils";
import ChatDrawer from "../components/ChatMessages/ChatDrawer.jsx";
import NotFoundPage from "./NotFound";

export default function Chat() {
  const defaultImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const { id } = useParams();
  const [avatar, setAvatar] = useState(defaultImg);
  const { prevChat, setReceiverId, room, socket, currentUser, notFound } =
    useContext(ChatContext);
  const { users } = useContext(UserContext);
  const sortedChat = prevChat.sort((a, b) => a.id - b.id);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;
    setReceiverId(id);
    socket.emit("join_room", room);
  }, [id, room, currentUser]);

  useEffect(() => {
    const user = findUserById(users, Number(id));
    if (user && user.avatar) {
      setAvatar(user.avatar);
    }
  }, [id, users]);

  useEffect(() => {
    if (sortedChat.length > 0) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [sortedChat]);

  if (!currentUser || notFound) return <NotFoundPage />;

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <ChatDrawer />
      <div className="w-full mr-20">
        <div className="md:w-full">
          <div className="flex flex-col m-5 h-full">
            <div className="container mx-auto max-w-screen-lg shadow-lg rounded-lg h-full bg-green-200">
              <div className="px-5 py-5 flex justify-between items-center bg-green-200 border-b-2">
                <div className="font-semibold text-2xl">Chat</div>
                <Avatar src={avatar} />
              </div>
              <div className="flex flex-row justify-between bg-white flex-grow h-full">
                <div className="w-full px-5 flex flex-col justify-between h-full">
                  <div
                    ref={chatContainerRef}
                    className="chat-messages"
                    style={{
                      maxHeight: "65vh",
                      minHeight: "65vh",
                      overflowY: "auto",
                    }}
                  >
                    <ScrollToBottom>
                      {sortedChat.map((m) => {
                        const sender = findUserById(users, m.sender_id);
                        const receiver = findUserById(users, m.receiver_id);
                        const senderAvatar = sender?.avatar || defaultImg;
                        const receiverAvatar = receiver?.avatar || defaultImg;

                        return (
                          <ChatBody
                            key={crypto.randomUUID()}
                            position={
                              currentUser.id === m.sender_id ? "end" : "start"
                            }
                            message={m.message}
                            senderAvatar={senderAvatar}
                            receiverAvatar={receiverAvatar}
                          />
                        );
                      })}
                    </ScrollToBottom>
                  </div>
                  <div className="py-5">
                    <ChatFooter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
