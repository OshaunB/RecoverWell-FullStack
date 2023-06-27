import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-palette-default py-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between ">
        <Typography color="white" className="font-normal mb-4 md:mb-0">
          &copy; 2023 RecoverFresh
        </Typography>
        <ul className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8">
          <li>
            <Typography
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <Link to="/">Home</Link>
            </Typography>
          </li>
          <li>
            <Typography
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <Link to="/Events">Events</Link>
            </Typography>
          </li>
          <li>
            <Typography
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <Link to="/discussions">Discussions</Link>
            </Typography>
          </li>
          <li>
            <Typography
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <Link to="/community">Community</Link>
            </Typography>
          </li>
        </ul>
      </div>
    </footer>
  );
}
