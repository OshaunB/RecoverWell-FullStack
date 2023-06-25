import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function Test() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="mt-6 w-96 m-5">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            UI/UX Review Check
          </Typography>
          <Typography>
            Because it's about motivating the doers. Because it's about
            motivating the doers. Because it's about motivating the doers.
            Because it's about motivating the doers. Because it's about
            motivating the doers. Because it's about motivating the doers.
            Because it's about motivating the doers. Because it's about
            motivating the doers. Because it's about motivating the doers.
          </Typography>
        </CardBody>
      </Card>
      <Card className="mt-6 w-96 m-5">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            UI/UX Review Check
          </Typography>
          <Typography>
            Because it's about motivating the doers. Because I'm here to follow
            my dreams and inspire others.
          </Typography>
        </CardBody>
      </Card>
      <Card className="mt-6 w-96 m-5">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            UI/UX Review Check
          </Typography>
          <Typography>
            Because it's about motivating the doers. Because I'm here to follow
            my dreams and inspire others.
          </Typography>
        </CardBody>
      </Card>
      <Card className="mt-6 w-96 m-5">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            UI/UX Review Check
          </Typography>
          <Typography>
            Because it's about motivating the doers. Because I'm here to follow
            my dreams and inspire others.
          </Typography>
        </CardBody>
      </Card>
      <Card className="mt-6 w-96 m-5">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            UI/UX Review Check
          </Typography>
          <Typography>
            Because it's about motivating the doers. Because I'm here to follow
            my dreams and inspire others.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
