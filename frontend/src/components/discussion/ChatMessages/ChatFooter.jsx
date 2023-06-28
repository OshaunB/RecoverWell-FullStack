import { useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@material-tailwind/react";
import { ChatContext } from "../../../contexts/ChatContext";

export default function ChatFooter() {
  const { sendMessage } = useContext(ChatContext);
  return (
    <form
      onSubmit={sendMessage}
      className="fixed bottom-0 p-2 flex items-center justify-center w-full bg-gray-100"
    >
      <input
        type="text"
        id="message"
        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 bg-white shadow-lg rounded-full border border-gray-300 p-4 hover:bg-gray-100"
        placeholder="Enter your message..."
      />
      <Button type="submit" size="lg" className="relative ml-2 h-14">
        <SendIcon />
      </Button>
    </form>
  );
}
