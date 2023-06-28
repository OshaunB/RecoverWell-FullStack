import { createContext, useEffect, useState, useContext } from "react";
import { fetchHandler, getPostOptions } from "../utils";
import CurrentUserContext from "./current-user-context";

const EventContext = createContext();

const EventContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userJoined, setUserJoined] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rsvpEvent, setRSVPEvent] = useState(0);

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler("/api/events");
      if (error) return console.log(error);
      const filteredEvents = data.filter((e) => {
        const eventDateTime = new Date(e.date);
        return eventDateTime > new Date();
      });
      filteredEvents.sort(
        (a, b) => Number(b.joinedEvents) - Number(a.joinedEvents)
      );
      setEvents(filteredEvents);
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);


  const handleRSVP = async (eventId) => {
    if (!isLoggedIn) {
      setMessage("You must be logged in to RSVP");
      return;
    }

    const event = events.find((e) => e.id === eventId);
    if (event && event.expected_guests - event.joinedEvents === 0) {
      setTitle("Sorry, cannot RSVP");
      setMessage("No available slots for this event");
      return;
    }

    const [data, error] = await fetchHandler(
      "/api/c-join-event",
      getPostOptions({ eventId })
    );
    if (error) return console.log(error);
    if (data === "User already joined event") {
      setTitle("Sorry, cannot RSVP");
      setMessage("You've already reserved this event");
      return;
    }
    if (data === "Host cannot join their own event") {
      setTitle("Sorry, cannot RSVP");
      setMessage("You're the host, so you can't RSVP");
      return;
    }
    setTitle("RSVP Successful");
    setMessage("You've successfully RSVP this event");

    // Update the userJoined state
    setUserJoined((prevUserJoined) => [...prevUserJoined, eventId]);
    setRSVPEvent((prevRSVPEvent) => prevRSVPEvent + 1);
  };

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
    message,
    setMessage,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    handleMap,
    title,
    setTitle,
    rsvpEvent,
    setRSVPEvent,
    handleRSVP,
  };

  return (
    <EventContext.Provider value={context}>{children}</EventContext.Provider>
  );
};

export { EventContext, EventContextProvider };
