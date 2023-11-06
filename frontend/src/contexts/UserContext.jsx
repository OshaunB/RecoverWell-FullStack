import { useEffect, useState, createContext, useContext } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import CurrentUserContext from "./current-user-context";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const [data, error] = await getAllUsers();
      if (error) return console.log(error);
      setUsers(data);
    })();
  }, [currentUser]);

  const context = { users, setUsers };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
