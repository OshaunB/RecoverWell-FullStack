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

export default function UserHeading(props) {
  const [open, setOpen] = useState(false);
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

  const [isEditing, setIsEditing] = useState(false);
  const [favoriteQuote, setFavoriteQuote] = useState(props.favorite_quote);

  const handleQuoteUpdate = async () => {
    try {
      const response = await fetch(`/api/users/quote/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favoriteQuote: favoriteQuote }),
      });

      if (response.ok) {
        console.log("Quote updated successfully");
        setIsEditing(false); // Close the textarea after successfully updating the quote
      } else {
        console.log("Failed to update Quote");
        // Handle failure if needed
      }
    } catch (error) {
      console.log("Error occurred while updating Quote:", error);
      // Handle error if needed
    }
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
              <div>
                <Textarea
                  variant="static"
                  placeholder="Favorite Quote"
                  rows={2}
                  value={favoriteQuote}
                  onChange={(e) => setFavoriteQuote(e.target.value)}
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
                      size="sm"
                      rounded={true}
                      onClick={handleQuoteUpdate}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Typography color="blue" className="font-medium" textGradient>
                "{favoriteQuote}"
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
