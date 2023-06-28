/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserHeading from "../components/profile/UserHeading";
import { fetchHandler, getPatchOptions } from "../utils";
import UserEvents from "../components/profile/UserEvents";
import UserAbout from "../components/profile/UserAbout";

export default function UserPage() {
  const [userProfile, setUserProfile] = useState({});
  const [errorText, setErrorText] = useState("");
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [eventData, setEventData] = useState([]);
  const [favoriteQuote, setFavoriteQuote] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const [data, error] = await fetchHandler(`/api/users/${id}`);
      if (error) {
        setErrorText("User not found");
        return;
      }
      
      setUserProfile(data);
      if (data.avatar) {
        setAvatar(data.avatar);
      } else {
        setAvatar(
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        );
      }
    };
    fetchData();
  }, [id, favoriteQuote]);
  console.log(userProfile)

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [id]);

  if (errorText) return <p>{errorText}</p>;
  console.log(eventData)
  return (
    <div style={{ backgroundColor: '#c8d8e4' }}>
      <div className="flex flex-col md:flex-row justify-center items-start">
        <div className="w-full">
          <UserHeading
            avatar={avatar}
            username={userProfile.username}
            gender={userProfile.gender}
            age={userProfile.dob}
            favoriteQuote={userProfile.favorite_quote}
            setFavoriteQuote={setFavoriteQuote}
            id={id}
          />
          <UserAbout userProfile={userProfile} />
        </div>
        
      </div>

      {eventData.length > 0 ? (
        <>
          <p className="font-bold text-4xl text-center" style={{ color: '#3298ee' }}>Events</p>
          <div className="flex flex-wrap justify-center">
            {eventData.map((event, index) => (
              <UserEvents
                key={index}
                avatar={avatar}
                username={userProfile.username}
                gender={userProfile.username}
                eventname={event.name}
                eventDescription={event.description}
                eventImage={event.image}
                eventTime={event.time}
                eventDate={event.date}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center font-light text-lg mt-8">
          No events reserved
        </p>
      )}
    </div>
  );
}
