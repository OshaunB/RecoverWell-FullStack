import { useState, useEffect, useContext } from "react";
import { Typography } from "@material-tailwind/react";
import RenderEvents from "../components/RenderEvents";
import { getPostOptions, fetchHandler, dateFormat, timeFormat } from "../utils";
import SearchInput from "../components/SearchInput";
import CreateEvent from "../components/CreateEvent";
import ErrorDialog from "../components/ErrorDialog";
import CurrentUserContext from "../contexts/current-user-context";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler("/api/events");
      if (error) return console.log(error);
      setEvents(data);
    })();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.value;
    setSearchTerm(term !== "" ? term : "");
  };

  const filteredEvents = events.filter((event) => {
    if (searchTerm === "") return true;
    return (
      // eslint-disable-next-line operator-linebreak
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCreateEvent = async (e, uploadedImage, closeDrawer) => {
    e.preventDefault();
    const obj = {
      name: e.target.eventName.value,
      description: e.target.description.value,
      address: e.target.address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip: e.target.zipCode.value,
      date: e.target.date.value,
      time: e.target.time.value,
      guestCount: Number(e.target.attendees.value),
      image: uploadedImage,
    };

    const [data, error] = await fetchHandler(
      "/api/createEvent",
      getPostOptions(obj)
    );
    if (error) return console.log(error);
    setEvents((prevEvents) => [...prevEvents, data]);
    e.target.reset();
    closeDrawer();
  };

  const handleRSVP = async (eventId) => {
    if (!isLoggedIn) {
      setErrorMessage("You must be logged in to RSVP");
      return;
    }
    const [data, error] = await fetchHandler(
      "/api/c-join-event",
      getPostOptions({ eventId })
    );
    if (error) return console.log(error);
    if (data === "User already joined event") {
      setErrorMessage("You've already reserved this event");
      return;
    }

    if (data === "Host cannot join their own event") {
      setErrorMessage("You're the host, so you can't RSVP");
    }
  };

  const handleMap = (address) => {
    window.open(`https://www.google.com/maps/place/${address}`, "_blank");
  };

  return (
    <div className="bg-gray-100">
      <Typography
        className="text-center p-5"
        variant="h1"
        color="blue"
        textGradient
      >
        Events
      </Typography>
      {errorMessage && (
        <ErrorDialog
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          title={"Sorry, cannot join event"}
        />
      )}
      <div className="flex justify-around items-center p-5">
        <CreateEvent onSubmit={handleCreateEvent} isLoggedIn={isLoggedIn} />
        <SearchInput
          innerText={"Search Events"}
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {filteredEvents.map((event) => (
          <RenderEvents
            key={event.id}
            img={event.image}
            title={event.name}
            description={event.description}
            date={dateFormat(event.date)}
            time={timeFormat(event.time)}
            address={`${event.address}, ${event.city}, ${event.state}-${event.zip}`}
            maxAttendees={event.expected_guests}
            id={event.id}
            RSVP={() => handleRSVP(event.id)}
            map={() => handleMap(`${event.address}+${event.city}+${event.state}+${event.zip}`)}
          />
        ))}
      </div>
    </div>
  );
}
