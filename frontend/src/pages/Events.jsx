import { useState, useEffect } from "react";
import RenderEvents from "../components/RenderEvents";
import CreateEvent from "../components/CreateEvent";
import { getPostOptions, fetchHandler } from "../utils";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler("/api/events");
      if (error) return console.log(error);
      setEvents(data);
    })();
  }, []);

  return (
    <div className="bg-gray-100">
      <CreateEvent/>
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
          />
        ))}
      </div>
    </div>
  );
}
