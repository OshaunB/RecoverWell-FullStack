import { useEffect, useState, createContext } from "react";
import { getAllUsers } from "../adapters/user-adapter";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const [data, error] = await getAllUsers();
      if (error) return console.log(error);
      setUsers(data);
    })();
  }, []);

  const context = { users, setUsers };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
