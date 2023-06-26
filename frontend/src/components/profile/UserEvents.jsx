import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";

export default function UserEvents(props) {
    const eventDate = new Date(props.eventDate);
    const eventTime = new Date(props.eventTime)
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
    });
    return (
        <div className="flex justify-center align-items py-4 px-4">
            <Card color="transparent" shadow={true} className="w-full max-w-[26rem]">
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex items-center gap-4 pt-0 pb-8 px-2"
                >
                    <Avatar
                        size="lg"
                        variant="circular"
                        src={props.avatar}
                        alt="user avatar"
                    />
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray">
                                {props.eventname}
                            </Typography>
                        </div>
                        <Typography color="blue-gray">{formattedDate + " @ " + formattedTime}</Typography>
                    </div>
                </CardHeader>
                <CardBody className="mb-6 p-0">
                    <Typography>&quot;{props.eventDescription}&quot;</Typography>
                </CardBody>
            </Card>
            <img
                src={props.eventImage}
                alt="event image"
                className="w-40 h-40 object-cover ml-4 shadow-lg"
            />
        </div>
    );
}
