import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function UserEvents(props) {
  const eventDate = new Date(props.eventDate);
  const formattedDate = eventDate.toLocaleDateString();
  const formattedTime = eventDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div className="flex justify-center py-4 px-2">
      <Card className="flex-row w-full max-w-[48rem]">
        <CardHeader
          shadow={false}
          floated={false}
          className="w-2/5 shrink-0 m-0 rounded-r-none"
        >
          <img
            src={props.eventImage}
            alt="image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="blue" className="uppercase mb-4">
            {`${formattedDate} @ ${formattedTime}`}

          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {props.eventname}
          </Typography>
          <Typography color="gray" className="font-normal mb-8">
            &quot;{props.eventDescription}&quot;
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
