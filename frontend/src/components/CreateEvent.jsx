import { useState, useRef } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Widget } from "@uploadcare/react-widget";
import API_KEYS from "../../config";
import MessageDialog from "./MessageDialog";

export default function CreateEvent({ onSubmit, isLoggedIn }) {
  const [open, setOpen] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const openDrawer = () => {
    if (!isLoggedIn) {
      setShowErrorDialog(true);
    } else {
      setOpen(true);
    }
  };
  const closeDrawer = () => setOpen(false);
  const widgetApi = useRef();
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleRenderImage = (fileInfo) => {
    const croppedImageUrl = `${fileInfo.cdnUrl}-/scale_crop/370x210/center/-/enhance/`;
    setUploadedImage(croppedImageUrl);
  };

  return (
    <>
      <Button onClick={openDrawer}>Create Event</Button>
      <Drawer open={open} size={450}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Create an Event
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <form
          className="flex flex-col gap-6 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e, uploadedImage, closeDrawer);
          }}
        >
          <Input type="text" label="Name" id="eventName" required />
          <Input type="text" label="Address" id="address" required />
          <div className="flex gap-4">
            <Input
              containerProps={{
                className: "max-w-[100px]",
              }}
              type="text"
              label="City"
              id="city"
              required
            />
            <Input
              type="text"
              label="State"
              id="state"
              containerProps={{
                className: "max-w-[100px]",
              }}
              required
            />
          </div>
          <div className="flex gap-4">
            <Input
              id="zipCode"
              containerProps={{
                className: "max-w-[100px]",
              }}
              type="text"
              label="Zip Code"
              required
            />
            <Input
              type="number"
              id="attendees"
              label="Expected Attendees"
              containerProps={{
                className: "max-w-[100px]",
              }}
              required
            />
          </div>
          <div className="flex gap-4">
            <Input
              containerProps={{
                className: "max-w-[100px]",
              }}
              type="date"
              label="Date"
              id="date"
              required
            />
            <Input
              type="time"
              label="Time"
              id="time"
              containerProps={{
                className: "max-w-[100px]",
              }}
              required
            />
          </div>
          <Textarea id="description" label="Description" required />
          <>
            <Button onClick={() => widgetApi.current.openDialog()}>
              Upload Image
              <Widget
                ref={widgetApi}
                publicKey={
                  API_KEYS.UPLOADCARE_API_KEY || "Your_Uploadcare_Public_Key"
                }
                onChange={handleRenderImage}
              />
            </Button>

            <Button size="md" type="submit">
              Create Event
            </Button>
          </>
        </form>
      </Drawer>
      {showErrorDialog && (
        <MessageDialog
          message="You must be logged in to create an event"
          setMessage={() => setShowErrorDialog(false)}
          title="Authentication Required"
        />
      )}
    </>
  );
}
