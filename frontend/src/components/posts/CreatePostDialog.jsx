import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function CreateDiscussion({
  onSubmit,
  open,
  setOpen,
}) {
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button className="m-4" onClick={handleOpen} >Create Post</Button>
      <Dialog open={open} onClose={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Create Post</DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
        </div>
        <form onSubmit={onSubmit}>
          <DialogBody divider>
            <div className="grid gap-6">
              <Textarea label="Content" id="content" />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="outlined" color="red" onClick={handleOpen}>
              Close
            </Button>
            <Button variant="gradient" color="green" type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
