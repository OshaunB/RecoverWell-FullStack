import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function MessageDialog({ title, message, setMessage }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleOpen = () => {
    setOpen(!open);
    setMessage("");
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>{title}</DialogHeader>
        <DialogBody divider>
          <span className="font-bold">{message}</span>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span onClick={handleOpen}>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
