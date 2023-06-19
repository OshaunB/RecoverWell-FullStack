"use client";

import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const handleSignOut = async () => {
    const response = await fetch("/api/logout", {
      method: "DELETE",
    });
    if (response.ok) {
      setCurrentUser(null);
      navigate("/");
    }
  };

  useEffect(() => {
    setAvatar(currentUser?.avatar);
  });

  return (
    <Navbar rounded>
      <Navbar.Brand to="/">
        <img
          alt="RecoverWell Dummy Logo"
          className="mr-3 h-6 sm:h-9"
          src="../../assets/RecoverWell Dummy Logo.PNG"
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
              label={<Avatar alt="User settings" img={avatar} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser?.full_name}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => navigate(`/profile-pic/${currentUser.id}`)}
              >
                Profile Pic
              </Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        )}
      </>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to="/">Home </Link>
        <Link to="#">Events</Link>
        <Link to="/discussions">Discussions</Link>
        <Link to="/users">Community</Link>
        {currentUser ? (
          <Link to={`/users/${currentUser.id}`}>{currentUser.username}</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
