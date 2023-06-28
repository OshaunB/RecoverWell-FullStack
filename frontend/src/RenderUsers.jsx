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

  return (
    <Card className="rounded-lg w-full max-w-[26rem] shadow-lg mb-4 overflow-hidden">
      <CardHeader floated={false} className="h-70">
        <img src={img || defaultImage} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-2 cursor-pointer"
          onClick={onClick}
        >
          {username}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          {full_name}
        </Typography>
        <Typography variant="paragraph" color="blue-gray">
          Favorite Quote: {favorite_quote}
          <br />
        </Typography>
      </CardBody>
      <CardFooter className="pt-3 flex justify-around items-center">
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
