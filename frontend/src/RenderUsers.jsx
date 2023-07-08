import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";

export default function RenderUsers({
  username,
  full_name,
  gender,
  img,
  favorite_quote,
  onClick,
  chatNavigate,
}) {
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const [expanded, setExpanded] = useState(false);

  const quoteWords = favorite_quote && favorite_quote.split(" ");
  const truncatedQuote = quoteWords && quoteWords.slice(0, 10).join(" ");

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="rounded-lg w-full max-w-[19rem] shadow-lg mb-4 overflow-hidden bg-palette-default">
      <CardHeader floated={false} className="h-70">
        <img src={img || defaultImage} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography
          variant="h4"
          color="white"
          className="mb-2 cursor-pointer"
          onClick={onClick}
        >
          {username}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          {full_name}
        </Typography>
        <Typography variant="lead" color="white" className="mt-4">
          Gender: {gender}
        </Typography>
        {favorite_quote && (
          <Typography variant="paragraph" color="white">
            Favorite Quote: {expanded ? favorite_quote : truncatedQuote}
            {quoteWords && quoteWords.length > 10 && (
              <div className="block">
                <button className="text-blue-400 underline" onClick={toggleExpand}>
                  {expanded ? "Read Less" : "Read More"}
                </button>
              </div>
            )}
          </Typography>
        )}
      </CardBody>
      <CardFooter className="pt-1 flex justify-around items-center">
        <motion.button
          className="btn btn-success"
          variants={buttonVariants}
          whileHover="hover"
          onClick={chatNavigate}
        >
          Chat
        </motion.button>
      </CardFooter>
    </Card>
  );
}
