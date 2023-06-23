import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import UserAbout from "../components/profile/UserAbout";
import UserHeading from "../components/profile/UserHeading";
// import UserPosts from "../components/profile/UserPosts";
import { fetchHandler } from "../utils";
import UserEvents from "../components/profile/UserEvents";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState({});
  const [errorText, setErrorText] = useState(null);
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [eventData, setEventData] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const [data, error] = await fetchHandler(`/api/users/${id}`)
      if (error) return console.log(error);
      setUserProfile(data);
      if (data.avatar) {
        setAvatar(data.avatar)
      }
    }
    fetchData()
  }, [])

  //   useEffect(() => {
  //     const fetchData = async () => {
  //         const [data, error] = await fetchHandler(`/api/u-join-event/${id}`)
  //         if (error) return console.log(error);
  //         console.log(data)
  //         setEventData(data)

  //         // Extract event IDs from the response data(/api/u-join-event/${id})
  //         const eventIds = data.map((event) => event.event_id);
  //         console.log(eventIds)

  //         // Make additional fetch calls to retrieve event data for each event ID
  //         eventIds.forEach(async (eventId) => {
  //           const [userEvents, eventError] = await fetchHandler(`/api/e-join-event/${eventId}`);
  //           if (eventError) return console.log(eventError);
  //           console.log(userEvents);
  //           // Process the event data as needed
  //         });

  //         const [allEvents, err] = await fetchHandler(`/api/join-event`);
  //         if (err) return console.log(err);
  //         console.log(allEvents)

  //     }
  //     fetchData()
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      const [userEvents, error] = await fetchHandler(`/api/u-join-event/${id}`);
      if (error) return console.log(error);
      console.log(userEvents);
      setEventData(userEvents);

      const eventIds = userEvents.map((event) => event.event_id);
      console.log(eventIds);

      const eventPromises = eventIds.map((eventId) => fetchHandler(`/api/events/${eventId}`));
      const eventResponses = await Promise.all(eventPromises);

      const eventData = eventResponses.map(([data, error]) => {
        if (error) {
          console.log(error);
          return undefined; // or handle the error in a different way
        }
        return data;
      });

      const filteredEventData = eventData.filter((data) => data !== undefined);
      console.log(filteredEventData);
      setEventData(filteredEventData);
    };

    fetchData();
  }, []);


  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;
  // console.log(userProfile)

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page

  // const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return <>
    {/* <h1>{profileUsername}</h1> */}
    <UserHeading
      avatar={avatar}
      username={userProfile.username}
      gender={userProfile.gender}
    />
    {/* <UserAbout /> */}
    {/* <UserPosts /> */}
    
    {eventData.length > 0 ? (
      <>
        <p className="font-bold text-4xl text-center text-cyan-300">Events</p>
        {eventData.map((event, index) => (
          <UserEvents
            key={index}
            avatar={avatar}
            username={userProfile.username}
            gender={userProfile.username}
            eventname={event.name}
            eventdescription={event.description}
            eventimage={event.image}
          />
        ))}
      </>
    ) : (
      <p className="text-center font-light text-lg mt-8">No events reserved</p>
    )}

  </>;
}