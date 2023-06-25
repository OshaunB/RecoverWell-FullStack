import { useEffect, useState, useContext } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserLink from "../components/UserLink";
import { fetchHandler } from "../utils";
import { UserContext } from "../contexts/UserContext.jsx";
import RenderUsers from "../RenderUsers";
import { motion } from "framer-motion";

export default function UsersPage() {
  const { users } = useContext(UserContext);
  console.log(users);
  const userProfile = users.avatar;
  const userName = users.username;

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
    <div className="container mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => {
          const { avatar, username, full_name, gender, age } = user;

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
                age={age}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

//userData[?] =  will be used to grab the users profile image, as well as their post count. Will also include a condiiton that would change the color of the rating[post count] based off of the amount of posts the user has. This could also be applied in a way that would allow us to sort the users from most helpful to least. A contact button will also be added that allows users to message one another , a hyper link can then be added to the photo so that on click it brings them to the user. Or we could instead have a pop out that displays more information about the users. I think to the table there also should be an implementation that allows users to write a quote that they feel they relate most closely to. This would allow users to interact more closely and have something to actually talk about.
