import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function RenderEvents(props) {
  return (
    <Card className="rounded-lg w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          className="h-52 w-full object-cover rounded-t"
          src={props.img}
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {props.title}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >{props.maxAttendees}</Typography>
        </div>
        <Typography color="gray">{props.description}</Typography>
        <Typography color="gray">Date: {props.date}</Typography>
        <Typography color="gray">Time: {props.time}</Typography>
        <Typography color="gray">Address: {props.address}</Typography>
      </CardBody>
      <CardFooter className="pt-3 flex justify-around items-center">
        <button className="btn btn-success" onClick={props.map}>Map</button>
        <button className="btn btn-primary" onClick={props.RSVP}
        >Reserve</button>
      </CardFooter>
    </Card>
  );
}
