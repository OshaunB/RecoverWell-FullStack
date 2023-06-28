// import {
//     Card,
//     CardHeader,
//     CardBody,
//     Typography,
//     Avatar,
// } from "@material-tailwind/react";

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function UserEvents(props) {
    const eventDate = new Date(props.eventDate);
    const eventTime = new Date(props.eventTime)
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
    });
    return (
        <div className="flex justify-center py-4 px-2">
            <Card className="flex-row w-full max-w-[48rem]">
                <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                    <img
                        src={props.eventImage}
                        alt="image"
                        className="w-full h-full object-cover"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h6" color="blue" className="uppercase mb-4">{formattedDate + " @ " + formattedTime}</Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {props.eventname}
                    </Typography>
                    <Typography color="gray" className="font-normal mb-8">
                    &quot;{props.eventDescription}&quot;
                    </Typography>
                    {/* <a href="#" className="inline-block">
                        <Button variant="text" className="flex items-center gap-2">
                            Learn More
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </a> */}
                </CardBody>
            </Card>
        </div>
    );
}
