/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserHeading from "../components/profile/UserHeading";
import { fetchHandler, dateFormat, timeFormat } from "../utils";
import UserEvents from "../components/profile/UserEvents";
import UserAbout from "../components/profile/UserAbout";
import NotFoundPage from "./NotFound";

export default function UserPage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [eventData, setEventData] = useState([]);
  const [favoriteQuote, setFavoriteQuote] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler(`/api/users/${id}`);
      if (error) return setErrorText("User not found");
      setUserProfile(data);
      if (data.avatar) {
        setAvatar(data.avatar);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const [userEvents, error] = await fetchHandler(`/api/u-join-event/${id}`);
      if (error) return console.log(error);
      setEventData(userEvents);

      const eventIds = userEvents.map((event) => event.event_id);

      const eventPromises = eventIds.map((eventId) =>
        fetchHandler(`/api/events/${eventId}`)
      );
      const eventResponses = await Promise.all(eventPromises);

      const eventArray = eventResponses.map(([data, err]) => {
        if (err) return console.log(error);
        return data;
      });

      const filteredEventData = eventArray.filter((data) => data !== undefined);
      setEventData(filteredEventData);
    })();
  }, [id]);

  const upcomingEvents = eventData.filter((e) => {
    const eventDateTime = new Date(e.date);
    return eventDateTime > new Date();
  });

  const pastEvents = eventData.filter((e) => {
    const eventDateTime = new Date(e.date);
    return eventDateTime < new Date();
  });

  if (errorText) return <NotFoundPage />;
  return (
    <div style={{ backgroundColor: "#c8d8e4" }}>
      <div className="flex flex-col md:flex-row justify-center items-start">
        <div className="w-full">
          <UserHeading
            avatar={avatar}
            username={userProfile && userProfile.username}
            gender={userProfile && userProfile.gender}
            age={userProfile && userProfile.dob}
            favoriteQuote={userProfile && userProfile.favorite_quote}
            setFavoriteQuote={setFavoriteQuote}
            id={id}
          />
          <UserAbout
            userProfile={userProfile && userProfile}
            setUserProfile={userProfile && setUserProfile}
            id={id}
          />
        </div>
      </div>

      {upcomingEvents.length > 0 ? (
        <>
          <p className="font-bold text-4xl text-center text-palette-default pt-4">
            Upcoming Events
          </p>
          <div className="flex flex-wrap justify-center">
            {upcomingEvents.map((event, index) => (
              <UserEvents
                key={index}
                eventname={event.name}
                eventDescription={event.description}
                eventImage={event.image}
                eventTime={timeFormat(event.time)}
                eventDate={dateFormat(event.date)}
                onClick={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center font-light text-lg m-8">
          No Upcoming Events Reserved
        </p>
      )}
      {pastEvents.length > 0 ? (
        <>
          <p className="font-bold text-4xl text-center text-palette-default">
            Past Events
          </p>
          <div className="flex flex-wrap justify-center">
            {pastEvents.map((event, index) => (
              <UserEvents
                key={index}
                eventname={event.name}
                eventDescription={event.description}
                eventImage={event.image}
                eventTime={timeFormat(event.time)}
                eventDate={dateFormat(event.date)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center font-light text-lg mt-8">
          No Past Events Reserved
        </p>
      )}
    </div>
  );
}
