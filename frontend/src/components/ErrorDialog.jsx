import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ErrorDialog(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.errorMessage) {
      setOpen(true);
    }
  }, [props.errorMessage]);

  const handleOpen = () => {
    setOpen(!open);
    props.setErrorMessage("");
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
        <DialogHeader>{props.title}</DialogHeader>
        <DialogBody divider>{props.errorMessage}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span onClick={handleOpen}>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
