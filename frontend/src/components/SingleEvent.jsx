/* eslint-disable operator-linebreak */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import EmailIcon from "@mui/icons-material/Email";

import {
  findUserName,
  dateFormat,
  fetchHandler,
  timeFormat,
  deleteOptions,
  findUserById,
} from "../utils";
import { UserContext } from "../contexts/UserContext";
import { EventContext } from "../contexts/EventContext";
import CurrentUserContext from "../contexts/current-user-context";
import MessageDialog from "./MessageDialog";

export default function SingleEvent() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { users } = useContext(UserContext);
  const {
    events,
    message,
    setMessage,
    title,
    setTitle,
    handleRSVP,
    handleMap,
  } = useContext(EventContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState(null);
  const [joined, setJoined] = useState(false);
  const [userJoined, setUserJoined] = useState([]);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user || !event) return;
      const [data, err] = await fetchHandler(
        `/api/check-joined-event/${eventId}`
      );
      if (err) return console.log(err);
      setJoined(data);
      const [data2, err2] = await fetchHandler(`/api/e-join-event/${eventId}`);
      if (err2) return console.log(err2);
      setUserJoined(data2);
    })();
  }, [eventId, joined, handleRSVP, user, event]);

  useEffect(() => {
    const eventData = events.find((e) => e.id === Number(eventId));
    const userData = users.find((u) => u.id === Number(eventData.user_id));
    if (!userData || !eventData) return;
    setIsHost(userData.id === currentUser.id);
    setUser(userData);
    setEvent(eventData);
  }, [eventId, users, events, joined, currentUser]);

  const handleCancelEvent = async () => {
    const [_, error] = await fetchHandler(
      `/api/cancel-join-event/${currentUser.id}/${eventId}`,
      deleteOptions
    );
    if (error) return console.log(error);
    setJoined(false);
    setTitle("Event Cancellation Successful");
    setMessage("Event has been cancelled");
  };

  if (!user || !event) return <div>Event Not Found</div>;

  const handleDeleteEvent = async () => {
    const [_, error] = await fetchHandler(
      `/api/deleteEvent/${currentUser.id}/${eventId}`,
      deleteOptions
    );
    if (error) return console.log(error);
    navigate("/events");
    window.location.reload();
  };

  return (
    <div>
      <Typography variant="h1" color="blue" className="text-center py-5">
        {event.name}
      </Typography>
      {message && (
        <MessageDialog
          message={message}
          setMessage={setMessage}
          title={title}
        />
      )}
      <div className="flex justify-center items-center">
        <Card className="flex-col sm:flex-row md:flex-grow w-full max-w-[48rem] sm:rounded-md md:rounded-lg mx-2 border-solid border-2">
          <div className="sm:w-full md:w-2/5 sm:rounded-t-md md:rounded-t-none md:rounded-l-lg">
            <CardHeader
              shadow={false}
              floated={false}
              className="w-full h-full m-0 sm:rounded-t-md md:rounded-t-lg md:rounded-l-none"
            >
              <img
                src={
                  event.image ||
                  "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                }
                alt="image"
                className="w-full h-full object-cover"
              />
            </CardHeader>
          </div>
          <CardBody>
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => navigate(`/users/${user.id}`)}
              >
                <Avatar
                  src={
                    user.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="avatar"
                />
                <div>
                  <Typography variant="h6">@{user.username}</Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {user.email}
                  </Typography>
                </div>
              </div>
              <EmailIcon
                className="cursor-pointer"
                onClick={() => navigate(`/chat/${user.id}`)}
              />
            </div>

            <Typography variant="lead">{event.description}</Typography>
            <Typography variant="lead">
              <span className="font-bold">Date:</span> {dateFormat(event.date)}
            </Typography>
            <Typography variant="lead">
              <span className="font-bold">Time:</span> {timeFormat(event.time)}
            </Typography>
            <Typography variant="lead">
              <span className="font-bold">Address:</span>{" "}
              {`${event.address}, ${event.city}, ${event.state}-${event.zip}`}
            </Typography>
            <div className="flex items-center gap-4 justify-around pt-4">
              <Button
                variant="gradient"
                color={joined ? "red" : "blue"}
                onClick={
                  joined ? handleCancelEvent : () => handleRSVP(event.id)
                }
                className="flex items-center gap-2"
              >
                {joined ? "Cancel RSVP" : "RSVP"}
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={() => handleMap(event)}
              >
                Map
              </Button>
              {isHost && (
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleDeleteEvent}
                >
                  Delete Event
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
      <div>
        <Typography variant="h3" color="blue" className="text-center py-5">
          See who is going to this event
        </Typography>
        <div
          className="flex justify-center items-center pb-5
        "
        >
          {userJoined.length > 0 ? (
            <Card className="w-96 border-solid border-2">
              <List>
                {userJoined.map((u) => (
                  <ListItem key={u.id}>
                    <ListItemPrefix onClick={() => navigate(`/users/${u.user_id}`)}>
                      <Avatar
                        variant="circular"
                        alt="candice"
                        src={
                          findUserById(users, u.user_id).avatar ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                      />
                    </ListItemPrefix>
                    <div onClick={() => navigate(`/users/${u.user_id}`)}>
                      <Typography variant="h6" color="blue-gray">
                        @{findUserName(users, u.user_id)}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {findUserById(users, u.user_id).email}
                      </Typography>
                    </div>
                    <div className="ml-auto">
                      <EmailIcon
                        className="cursor-pointer"
                        onClick={() => navigate(`/chat/${u.id}`)}
                      />
                    </div>
                  </ListItem>
                ))}
              </List>
            </Card>
          ) : (
            <Typography variant="h6">
              No one has RSVP&aposd to this event
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
