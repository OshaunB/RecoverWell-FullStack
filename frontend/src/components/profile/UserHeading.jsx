import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Dialog,
  DialogBody,
  Textarea,
  Button,
} from "@material-tailwind/react";

import { fetchHandler, getPatchOptions } from "../../utils";


export default function UserHeading(props) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleOpen = () => setOpen((cur) => !cur);

  function calculateAge(dateString) {
    var currentDate = new Date();
    var birthDate = new Date(dateString);
    var age = currentDate.getUTCFullYear() - birthDate.getUTCFullYear();

    // Check if the current date has passed the birthdate in the current year
    if (
      currentDate.getUTCMonth() < birthDate.getUTCMonth() ||
      (currentDate.getUTCMonth() === birthDate.getUTCMonth() &&
        currentDate.getUTCDate() < birthDate.getUTCDate())
    ) {
      age--; // Subtract 1 from the age if the birthday hasn't occurred yet
    }

    return age;
  }

 

  const handleQuoteUpdate = async (e) => {
    e.preventDefault();
    const quote = e.target.quote.value;
    const [data, error] = await fetchHandler(`/api/users/quote/${props.id}`, getPatchOptions({ favoriteQuote: quote }));
    if (error) return console.log(error);
    setIsEditing(false);
    props.setFavoriteQuote(data.favorite_quote)
  };

  return (
    <div className="flex justify-center mb-6 mt-2">
      <div className="flex w-full">
        <Card className="w-96 mx-auto">
          <div
            className="flex align-center justify-center cursor-pointer transition-opacity hover:opacity-90"
            onClick={handleOpen}
          >
            <img
              className="w-11/12 my-8 mx-12 bg-orange-200 shadow-2xl rounded-full"
              src={props.avatar}
              alt="User Profile Pic"
            />
          </div>
          <CardBody className="text-center p-3">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {`@${props.username}`}
            </Typography>
            <Typography color="blue" className="font-medium" textGradient>
              {props.gender}
            </Typography>
            <Typography color="blue" className="font-medium" textGradient>
              {calculateAge(props.age)}
            </Typography>
            {isEditing ? (
              <form onSubmit={handleQuoteUpdate}>
                <Textarea
                  variant="static"
                  placeholder="Favorite Quote"
                  rows={2}
                  id="quote"
                />
                <div className="w-full flex justify-between py-1.5">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="red"
                      variant="text"
                      rounded={true}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                    type="submit"
                      size="sm"
                      rounded={true}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <Typography color="blue" className="font-medium" textGradient>
                "{props.favoriteQuote}"
                <Button
                  size="sm"
                  color="blue"
                  variant="text"
                  rounded={true}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </Typography>
            )}
          </CardBody>
        </Card>

        <Dialog size="md" open={open} handler={handleOpen}>
          <DialogBody divider={true} className="p-0">
            <img
              alt="nature"
              className="h-[48rem] w-full object-cover object-center"
              src={props.avatar}
            />
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
}
