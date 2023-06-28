import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import { UserContext } from "../contexts/UserContext.jsx";
import RenderUsers from "../RenderUsers";

export default function UsersPage() {
  const navigate = useNavigate();
  const { users } = useContext(UserContext);

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="bg-palette-teal">
      <Typography
        className="text-center p-5"
        variant="h1"
        color="blue"
        textGradient
      >
        RecoverFresh Community
      </Typography>
      <div className="container mx-auto max-w-screen-lg bg-palette-teal ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-center justify-items-center">
          {users.map((user) => {
            const {
              avatar,
              username,
              full_name,
              gender,
              favorite_quote,
              email,
            } = user;

            return (
              <motion.div
                key={username}
                variants={cardVariants}
                initial="initial"
                animate="animate"
              >
                <RenderUsers
                  username={`@${username}`}
                  full_name={full_name}
                  img={avatar}
                  gender={gender}
                  favorite_quote={favorite_quote}
                  email={email}
                  onClick={() => navigate(`/users/${user.id}`)}
                  chatNavigate={() => navigate(`/chat/${user.id}`)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
