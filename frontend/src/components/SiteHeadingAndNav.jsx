"use client";

import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSignOut = async () => {
    const response = await fetch("/api/logout", {
      method: "DELETE",
    });
    if (response.ok) {
      setCurrentUser(null);
      navigate("/");
    }
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand to="/">
        <img
          alt="RecoverWell Dummy Logo"
          className="mr-3 h-6 sm:h-9"
          src="assets/RecoverWell Dummy Logo.PNG"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          RecoverWell
        </span>
      </Navbar.Brand>
      <>
        {currentUser && (
          <div className="flex md:order-2">
            <Dropdown
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser?.full_name}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        )}
      </>
      <Navbar.Collapse>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="#">Events</Link>
        <Link to="/discussions">Discussions</Link>
        <Link to="/users">Users</Link>
        {currentUser ? (
          <Link to={`/users/${currentUser.id}`}>{currentUser.username}</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
