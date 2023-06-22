import { useEffect, useState, useContext } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserLink from "../components/UserLink";
import {fetchHandler} from "../utils"
import { UserContext } from "../contexts/UserContext.jsx";

export default function UsersPage() {
  const { users } = useContext(UserContext);
  console.log(users)

//userData[?] =  will be used to grab the users profile image, as well as their post count. Will also include a condiiton that would change the color of the rating[post count] based off of the amount of posts the user has. This could also be applied in a way that would allow us to sort the users from most helpful to least. A contact button will also be added that allows users to message one another , a hyper link can then be added to the photo so that on click it brings them to the user. Or we could instead have a pop out that displays more information about the users. I think to the table there also should be an implementation that allows users to write a quote that they feel they relate most closely to. This would allow users to interact more closely and have something to actually talk about.
  return <>
    <h1>Users</h1>
{/* component */}

    
    
  </>;
}
