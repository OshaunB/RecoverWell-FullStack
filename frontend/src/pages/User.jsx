import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import UserAbout from "../components/profile/UserAbout";
import UserHeading from "../components/profile/UserHeading";
import UserPosts from "../components/profile/UserPosts";
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
    const fetchData = async () =>{
      const [data, error] = await fetchHandler(`/api/users/${id}`)
      if (error) return console.log(error);
      setUserProfile(data);
      if (data.avatar) {
        setAvatar(data.avatar)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
        const [data, error] = await fetchHandler(`/api/events/${id}`)
        if (error) return console.log(error);
        console.log(data)
        setEventData(data)
        // console.log(eventData)
    }
    fetchData()
}, [])


console.log(eventData)
// console.log(eventData.name)
// console.log(eventData.description)


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
    <UserAbout />
    {/* <UserPosts /> */}
    
    <UserEvents avatar={avatar}
    username={userProfile.username}
    gender={userProfile.username}
    eventname={eventData.name}
    eventdescription={eventData.description}
    />
  </>;
}
