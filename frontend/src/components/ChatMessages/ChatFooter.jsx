import { useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Button, Input } from "@material-tailwind/react";
import { ChatContext } from "../../contexts/ChatContext";

export default function ChatFooter() {
  const { sendMessage } = useContext(ChatContext);

  return (
    <form onSubmit={sendMessage} className="p-2 flex items-center justify-center w-full">
      <div className="relative flex w-full">
        <Input
          type="text"
          label="Enter your message"
          required
          containerProps={{
            className: "min-w-0",
          }}
          id="message"
        />
        <Button
          size="sm"
          type="submit"
          className="!absolute right-1 top-1 rounded"
        >
          <SendIcon fontSize="sm" />
        </Button>
      </div>
    </form>
  );
}
