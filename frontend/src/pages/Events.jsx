import { useState, useContext } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import RenderEvents from "../components/RenderEvents";
import {
  getPostOptions,
  fetchHandler,
  dateFormat,
  timeFormat,
  validateDate,
} from "../utils";
import SearchInput from "../components/SearchInput";
import CreateEvent from "../components/CreateEvent";
import MessageDialog from "../components/MessageDialog";
import { EventContext } from "../contexts/EventContext";

export default function Events() {
  const {
    events,
    setEvents,
    message,
    setMessage,
    isLoggedIn,
    handleMap,
    title,
    setTitle,
    rsvpEvent,
    handleRSVP,
  } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

    if (!validateDate(obj.date)) {
      console.log("hi");
      setTitle("Invalid Date");
      setMessage("Please select a future date");
      return;
    }

    const [data, error] = await fetchHandler(
      "/api/createEvent",
      getPostOptions(obj)
    );
    if (error) return console.log(error);
    setEvents((prevEvents) => [...prevEvents, data]);
    e.target.reset();
    closeDrawer();
  };

  const handleInfo = (eventId) => {
    if (!isLoggedIn) {
      setTitle("Authentication Required");
      setMessage("You must be signed in to view this event");
      return;
    }
    navigate(`/events/${eventId}`);
  };

  

  return (
    <div className="bg-palette-teal">
      <Typography
        className="text-center p-5"
        variant="h1"
        color="blue"
        textGradient
      >
        Events
      </Typography>
      {message && (
        <MessageDialog
          message={message}
          setMessage={setMessage}
          title={title}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center max-w ">
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
            info={() => handleInfo(event.id)}
            rsvpEvent={rsvpEvent}
          />
        ))}
      </div>
    </div>
  );
}
