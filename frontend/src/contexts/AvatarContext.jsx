import { useEffect, useState, createContext, useContext } from "react";
import { fetchHandler } from "../utils";
import CurrentUserContext from "./current-user-context";

const AvatarContext = createContext();

const AvatarContextProvider = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler("/api/me");
      if (error) return console.log(error);
      if (data.avatar) {
        setAvatar(data.avatar);
      } else {
        setAvatar(
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        );
      }
    })();
  }, [currentUser, setCurrentUser]);

  const context = { avatar, setAvatar };
  return (
    <AvatarContext.Provider value={context}>{children}</AvatarContext.Provider>
  );
};

export { AvatarContext, AvatarContextProvider };
