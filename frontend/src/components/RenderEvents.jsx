import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import EventUserAvatar from "./EventUserAvatar";
import { fetchHandler, findUserName } from "../utils";
import { UserContext } from "../contexts/UserContext";

export default function RenderEvents(props) {
  const { users } = useContext(UserContext);
  const { id } = props;
  const [joinedEvents, setJoinedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const [data, error] = await fetchHandler(`/api/e-join-event/${id}`);
      if (error) return console.log(error);
      setJoinedEvents(data);
    })();
  }, [props.rsvpEvent, id]);

  const getAvatar = (array, userId) => {
    const user = array.find((u) => u.id === userId);
    return user ? user.avatar : "";
  };

  const availableSlots = props.maxAttendees - joinedEvents.length;

  return (
    <Card
      key={`${props.id}-${props.rsvpEvent}`}
      className="rounded-lg w-full max-w-[26rem] shadow-2xl mb-5"
    >
      <CardHeader floated={false} color="blue-gray">
        <img
          className="h-52 w-full object-cover rounded-t"
          src={
            props.img
            || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
          }
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody className="px-6 pb-0">
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {props.title}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            Available slots: {availableSlots}
          </Typography>
        </div>
        <Typography variant="lead">{props.description}</Typography>
        <Typography variant="lead"><span className="font-bold">Date:</span> {props.date}</Typography>
        <Typography variant="lead"><span className="font-bold">Time:</span> {props.time}</Typography>
        <Typography variant="lead"><span className="font-bold">Address:</span> {props.address}</Typography>
        <div className="flex items-center -space-x-3">
          {joinedEvents.map((event) => (
            <EventUserAvatar
              key={event.id}
              username={findUserName(users, event.user_id)}
              avatar={getAvatar(users, event.user_id)}
              onClick={() => navigate(`/users/${event.user_id}`)}
            />
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex justify-around items-center">
          <Tooltip content="View On Map" placement="top">
            <Button variant="gradient" color="green" onClick={props.map}>
              Map
            </Button>
          </Tooltip>
          <Tooltip content="Get More Info" placement="top">
            <Button variant="gradient" color="blue" onClick={props.info}>
              Info
            </Button>
          </Tooltip>
          <Tooltip content="Reserve This Event" placement="top">
            <Button variant="gradient" color="purple" onClick={props.onRSVP}>
              RSVP
            </Button>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
}
