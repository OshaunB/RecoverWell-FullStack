import { createContext, useEffect, useState, useContext } from "react";
import { fetchHandler } from "../utils";
import CurrentUserContext from "./current-user-context";

const EventContext = createContext();

const EventContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userJoined, setUserJoined] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler("/api/events");
      if (error) return console.log(error);
      setEvents(data);
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  const handleMap = ({ address, city, state, zip }) => {
    window.open(
      `https://www.google.com/maps/place/${address}+${city}+${state}+${zip}`,
      "_blank"
    );
  };

  const context = {
    events,
    setEvents,
    userJoined,
    setUserJoined,
    errorMessage,
    setErrorMessage,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    handleMap,
  };

  return (
    <EventContext.Provider value={context}>{children}</EventContext.Provider>
  );
};

export { EventContext, EventContextProvider };
