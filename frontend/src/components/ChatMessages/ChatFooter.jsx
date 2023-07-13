import { useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Button, Input } from "@material-tailwind/react";
import { ChatContext } from "../../contexts/ChatContext";

export default function ChatFooter() {
  const { sendMessage } = useContext(ChatContext);

  return (
    <form
      onSubmit={sendMessage}
      className="p-2 flex items-center justify-center w-full"
    >
      <div className="relative flex w-full">
        <textarea
          type="text"
          className="w-full px-1 h-10 border border-black rounded resize-none"
          id="message"
          required
        />
      </div>
      <Button size="sm" type="submit">
        <SendIcon />
      </Button>
    </form>
  );
}
