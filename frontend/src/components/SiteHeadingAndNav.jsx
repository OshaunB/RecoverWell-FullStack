import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
'use client';
import { Dropdown, Navbar, Avatar } from 'flowbite-react';

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          alt="RecoverWell Dummy Logo"
          className="mr-3 h-6 sm:h-9"
          src="assets/RecoverWell Dummy Logo.PNG"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          RecoverWell
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              Bonnie Green
            </span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item>
            Settings
          </Dropdown.Item>
          <Dropdown.Item>
            Earnings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="/"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="#">
          Events
        </Navbar.Link>
        <Navbar.Link href="/discussions">
          Discussions
        </Navbar.Link>
         {currentUser ?
        <Navbar.Link href={`/users/${currentUser.id}`}>{currentUser.username}
          Login In
        </Navbar.Link>
        :
        <>
        <Navbar.Link href="/login">
          Login
        </Navbar.Link>
        <Navbar.Link href="/sign-up">
          Sign Up
        </Navbar.Link>
        </>
}
        <Navbar.Link href="/users">
          Users
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
