import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
  import { useEffect, useState } from "react"
  import { useParams } from "react-router-dom"
import { fetchHandler } from "../../utils";

export default function UserEvents(props) {
    const { id } = useParams();
    // const [eventData, setEventData] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const [data, error] = await fetchHandler(`/api/events/${id}`)
    //         if (error) return console.log(error);
    //         console.log(data)
    //         setEventData(data)
    //         console.log(eventData)
    //     }
    //     fetchData()
    // }, [])

    // console.log(props)
    return (
        <div className="flex justify-center align-items">
        <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
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
                  {props.username}
                </Typography>
              </div>
              <Typography color="blue-gray">{props.eventname}</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>
              &quot;{props.eventdescription}&quot;
            </Typography>
          </CardBody>
        </Card>
        </div>
      );

}