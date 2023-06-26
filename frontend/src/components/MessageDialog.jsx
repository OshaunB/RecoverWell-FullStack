import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function MessageDialog(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.message) {
      setOpen(true);
    }
  }, [props.message]);

  const handleOpen = () => {
    setOpen(!open);
    props.setMessage("");
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
        <DialogBody divider><span className="font-bold">{props.message}</span></DialogBody>
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
