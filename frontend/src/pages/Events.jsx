import { useState, useEffect } from "react";
import RenderEvents from "../components/RenderEvents";
import { getPostOptions, fetchHandler } from "../utils";
import SearchInput from "../components/SearchInput";
import CreateEvent from "../components/CreateEvent";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler("/api/events");
      if (error) return console.log(error);
      setEvents(data);
    })();
  }, []);

  const handleCreateEvent = async (e, uploadedImage) => {
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
  };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-around items-center pt-10">
        <CreateEvent onSubmit={handleCreateEvent} />
        <SearchInput innerText={"Search Events"} />
      </div>
      <h1 className="text-5xl font-bold text-center">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {events.map((event) => (
          <RenderEvents
            key={event.id}
            img={event.image}
            title={event.name}
            description={event.description}
            date={event.date.slice(0, 10)}
            time={event.time}
            address={`${event.address}, ${event.city}, ${event.state}-${event.zip}`}
            maxAttendees={event.expected_guests}
            id={event.id}
          />
        ))}
      </div>
    </div>
  );
}
