import io from "socket.io-client";
import { useEffect, useState, createContext, useContext } from "react";
import CurrentUserContext from "./current-user-context";
import { fetchHandler, getPostOptions } from "../utils";
import { UserContext } from "./UserContext";

const ChatContext = createContext();

const socket = io.connect("https://recoverwell.onrender.com");

const ChatContextProvider = ({ children }) => {
  const [prevChat, setPrevChat] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [room, setRoom] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const { users } = useContext(UserContext);
  const [conversationId, setConversationId] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const doesUserExist = users.some((user) => {
      console.log(user.id === Number(receiverId));
      return user.id === Number(receiverId);
    });
    if (!doesUserExist) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [receiverId, users]);

  useEffect(() => {
    (async () => {
      if (notFound) return;
      const obj = {
        userId2: receiverId,
        roomName: crypto.randomUUID(),
      };
      const [data, error] = await fetchHandler(
        "/api/conversations",
        getPostOptions(obj)
      );
      if (error) {
        console.log(error);
        return;
      }
      setRoom(data.room_name);
      setConversationId(data.id);
    })();
  }, [currentUser, receiverId, room, notFound]);

  console.log(conversationId);

  useEffect(() => {
    if (!conversationId) return;
    (async () => {
      const [data, error] = await fetchHandler(
        `/api/messages/${conversationId}`
      );
      if (error) return console.log(error);
      setPrevChat(data);
    })();
  }, [conversationId, room]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message === "") return;
    const messageData = {
      sender_id: currentUser.id,
      receiver_id: receiverId,
      conversationId,
      message,
      room,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };

    const [data, error] = await fetchHandler(
      "/api/messages",
      getPostOptions(messageData)
    );

    await socket.emit("send_message", messageData);

    if (error) return console.log(error);
    e.target.reset();
    setPrevChat((p) => [...p, data]);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setPrevChat((p) => [...p, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [room, currentUser]);

  const context = {
    prevChat,
    setPrevChat,
    receiverId,
    setReceiverId,
    room,
    setRoom,
    conversationId,
    sendMessage,
    socket,
    currentUser,
    notFound,
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
