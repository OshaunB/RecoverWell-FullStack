import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import NotFoundPage from "./pages/NotFound";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import UsersPage from "./pages/Community";
import UserPage from "./pages/User";
import Discussion from "./pages/Discussions";
import Posts from "./pages/Posts";
import Comment from "./pages/Comment";
import ProfilePic from "./pages/ProfilePic";
import Events from "./pages/Events";
import SingleEvent from "./components/SingleEvent";

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return (
    <>
      <SiteHeadingAndNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discussions" element={<Discussion />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/community" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/discussions/:id" element={<Posts />} />
          <Route path="/posts/:postId/comments" element={<Comment />} />
          <Route path="/profile-pic/:id" element={<ProfilePic />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<SingleEvent />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
