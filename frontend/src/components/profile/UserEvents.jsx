import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function UserEvents(props) {
  return (
    <div className={`flex justify-center py-4 px-2 ${props.onClick && "cursor-pointer"}`} onClick={props.onClick}>
      <Card className="flex-row w-full max-w-[48rem] max-h-[13rem]">
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
            {`${props.eventDate} @ ${props.eventTime}`}

          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {props.eventname}
          </Typography>
          <Typography color="gray" className="font-normal mb-8">
            {props.eventDescription}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
