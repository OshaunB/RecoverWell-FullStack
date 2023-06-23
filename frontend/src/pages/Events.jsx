import { useState, useContext } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import RenderEvents from "../components/RenderEvents";
import { getPostOptions, fetchHandler, dateFormat, timeFormat } from "../utils";
import SearchInput from "../components/SearchInput";
import CreateEvent from "../components/CreateEvent";
import ErrorDialog from "../components/ErrorDialog";
import { EventContext } from "../contexts/EventContext";

export default function Events() {
  const {
    events,
    setEvents,
    errorMessage,
    setErrorMessage,
    isLoggedIn,
    handleMap,
    setUserJoined,
  } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [rsvpEvent, setRSVPEvent] = useState(0);

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

    const event = events.find((e) => e.id === eventId);
    if (event && event.expected_guests - event.joinedEvents === 0) {
      setErrorMessage("No available slots for this event");
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
      return;
    }

    // Update the userJoined state
    setUserJoined((prevUserJoined) => [...prevUserJoined, eventId]);
    setRSVPEvent((prevRSVPEvent) => prevRSVPEvent + 1);
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
            onRSVP={() => handleRSVP(event.id)}
            map={() => handleMap(event)}
            info={() => navigate(`/events/${event.id}`)}
            rsvpEvent={rsvpEvent}
          />
        ))}
      </div>
    </div>
  );
}
