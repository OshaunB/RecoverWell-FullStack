import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CurrentUserContext from "./contexts/CurrentUserContextProvider.jsx";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import { EventContextProvider } from "./contexts/EventContext.jsx";
import { AvatarContextProvider } from "./contexts/AvatarContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CurrentUserContext>
    <AvatarContextProvider>
      <UserContextProvider>
        <EventContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </EventContextProvider>
      </UserContextProvider>
    </AvatarContextProvider>
  </CurrentUserContext>
);
