/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { useContext, useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChatUsersMenu from "./ChatUsersMenu";
import { UserContext } from "../../contexts/UserContext";
import { fetchHandler } from "../../utils";
import { ChatContext } from "../../contexts/ChatContext";
import CurrentUserContext from "../../contexts/current-user-context";

export default function ChatDrawer() {
  const navigate = useNavigate();
  const { users } = useContext(UserContext);
  const { prevChat } = useContext(ChatContext);
  const [open, setOpen] = useState(false);
  const openDrawerLeft = () => setOpen(true);
  const closeDrawerLeft = () => setOpen(false);
  const [searchUser, setSearchUser] = useState("");
  const [lastMessages, setLastMessages] = useState({});
  const { currentUser } = useContext(CurrentUserContext);

  const filterUser = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleSearch = (e) => {
    const term = e.target.value;
    term === "" ? setSearchUser("") : setSearchUser(term);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const fetchLastMessage = async (receiverId) => {
    const [data, error] = await fetchHandler(`/api/lastMessage/${receiverId}`);
    if (error) return console.log(error);
    setLastMessages((prevMessages) => ({
      ...prevMessages,
      [receiverId]: data.message,
    }));
  };

  useEffect(() => {
    filterUser.forEach((user) => {
      fetchLastMessage(user.id);
    });
  }, [prevChat]);

  return (
    <>
      <div className="md:hidden">
        <Button onClick={openDrawerLeft} className="bg-none bg-meadow ml-5 mt-5 ">
          <MenuIcon />
        </Button>
      </div>
      <div className="hidden md:block">
        <Button onClick={openDrawerLeft} className="bg-none bg-meadow m-5 ">
          <MenuIcon />
        </Button>
      </div>
      <Drawer
        size={350}
        placement="left"
        open={open}
        onClose={closeDrawerLeft}
        className="p-4 h-auto overflow-auto"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Chat With More People
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerLeft}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="flex flex-col w-full border-r-2 overflow-y-auto">
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search user"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              onChange={handleSearch}
              value={searchUser}
            />
          </div>
          <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2"></div>
          {filterUser.map((user) => {
            if (currentUser && currentUser.id === user.id) {
              return null;
            }
            return (
              <ChatUsersMenu
                key={user.id}
                avatar={user.avatar}
                username={user.username}
                onClick={() => {
                  navigate(`/chat/${user.id}`);
                  closeDrawerLeft();
                }}
                userId={user.id}
                lastMessage={lastMessages[user.id]}
              />
            );
          })}
        </div>
      </Drawer>
    </>
  );
}

