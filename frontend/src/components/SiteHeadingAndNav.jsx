import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

import {
  HomeIcon,
  CubeTransparentIcon,
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

import { AvatarContext } from "../contexts/AvatarContext";
import CurrentUserContext from "../contexts/current-user-context";
import LoginTest from "../pages/LoginDialog.jsx";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    to: "/profile/",
    action: "profile",
  },
  {
    label: "Edit Avatar",
    icon: Cog6ToothIcon,
    to: "/profile-pic/",
    action: "editAvatar",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    action: "signOut", // Added action property to identify sign out item
  },
];

const ProfileMenu = (props) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuAction = (action) => {
    if (action === "signOut") {
      props.signOut();
    } else if (action === "editAvatar") {
      navigate(`/profile-pic/${props.currentUserId}`);
    } else if (action === "profile") {
      navigate(`/users/${props.currentUserId}`);
    }
    closeMenu();
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={props.avatar}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, action }) => {
          const isLastItem = action === "signOut";
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuAction(action)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    to: "/",
  },
  {
    label: "Events",
    icon: Square3Stack3DIcon,
    to: "/events",
  },
  {
    label: "Discussions",
    icon: CubeTransparentIcon,
    to: "/discussions",
  },
  {
    label: "Community",
    icon: UserCircleIcon,
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

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { avatar } = useContext(AvatarContext);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const handleSignOut = async () => {
    const response = await fetch("/api/logout", {
      method: "DELETE",
    });
    if (response.ok) {
      setCurrentUser(null);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <Navbar className="mx-auto max-w-screen-3xl p-2  lg:pl-6 bg-meadowπ">
      <div className="relative mx-auto flex items-center justify-around text-blue-gray-900">
        <Link to="/" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
          <div className="flex justify-around">
            <img src="../../assets/new logo.png" alt="logo" className="h-10" />
            <div className="pt-1 pl-2 text-bold text-2xl">RecoverFresh</div>
          </div>
        </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <div className="flex items-center ml-auto mr-4">
          {currentUser ? (
            <ProfileMenu
              avatar={avatar}
              signOut={handleSignOut}
              currentUserId={currentUser.id}
            />
          ) : (
            <LoginTest open={open} setOpen={setOpen} />
          )}
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll text-black">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
