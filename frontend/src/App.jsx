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
import LoginTest from "./pages/LoginDialog.jsx";
import Footer from "./components/Footer";
import Chat from "./pages/Chat";
import { ChatContextProvider } from "./contexts/ChatContext";

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white">
        <SiteHeadingAndNav />
      </div>
      <main className="flex-grow bg-palette-teal">
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
          <Route path="/events/:eventId" element={<SingleEvent />} />
          <Route path="/login-test" element={<LoginTest />} />
          <Route
            path="/chat/:id"
            element={
              <ChatContextProvider>
                <Chat />
              </ChatContextProvider>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
