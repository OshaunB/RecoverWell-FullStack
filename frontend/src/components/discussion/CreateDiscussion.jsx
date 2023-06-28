import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function CreateDiscussion({
  onSubmit,
  setError,
  open,
  setOpen,
  currentUser,
}) {
  const handleOpen = () => {
    if (!currentUser) {
      setError("You must be logged in to create a discussion");
    } else {
      setOpen(!open);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="bg-none bg-meadow">Create Discussion</Button>
      <Dialog open={open} onClose={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Create Discussion Group</DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
        </div>
        <form onSubmit={onSubmit}>
          <DialogBody divider>
            <div className="grid gap-6">
              <Input label="Topic" id="topic" />
              <Textarea label="Description" id="description" />
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
    </>
  );
}
