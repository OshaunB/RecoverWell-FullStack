import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RenderUsers(props) {
  const { username, full_name, img, gender, email } = props;
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleConnectClick = () => {
    setShowDetails(!showDetails);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: "-50%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <Card className="rounded-lg w-full max-w-[22rem] shadow-lg mb-4 overflow-hidden">
      <CardHeader floated={false} className="h-70">
        <img src={img || defaultImage} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {username}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          {full_name}
        </Typography>
        <Typography variant="body2" color="blue-gray" className="mt-4">
          Gender: {gender}
        </Typography>
        <Typography variant="body2" color="blue-gray">
          Favorite Quote: 
          <br/>
        <div>
        
        </div>
          {email}
        
         
        </Typography>
      </CardBody>
      <CardFooter className="pt-3 flex justify-around items-center">
        <motion.button
          className="btn btn-success"
          variants={buttonVariants}
          whileHover="hover"
          onClick={handleConnectClick}
        >
          Connect
        </motion.button>
      </CardFooter>
      {showDetails && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="w-80">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <CardBody>
              <img
                src={img || defaultImage}
                alt="profile-picture"
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
              <Typography variant="h6" color="blue-gray" className="text-center">
                {full_name}
              </Typography>
              <Typography variant="body2" color="blue-gray" className="mt-4">
                Gender: {gender}
              </Typography>
              <Typography variant="body2" color="blue-gray">
              Email: {}
              </Typography>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </Card>
  );
}
