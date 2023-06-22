import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  CodeBracketSquareIcon,
} from "@heroicons/react/24/outline";

const navListItems = [
  {
    label: "Home",
    icon: Square3Stack3DIcon,
    to: "/",
  },
  {
    label: "Events",
    icon: UserCircleIcon,
    to: "/events",
  },
  {
    label: "Discussions",
    icon: CubeTransparentIcon,
    to: "/discussions",
  },
  {
    label: "Community",
    icon: CodeBracketSquareIcon,
    to: "/community",
  },
];

const NavList = () => (
  <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
    {navListItems.map(({ label, icon, to }) => (
      <Link
        key={label}
        as="a"
        to={to}
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
          {label}
        </MenuItem>
      </Link>
    ))}
  </ul>
);

export default NavList;
