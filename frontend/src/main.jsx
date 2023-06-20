import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CurrentUserContext from "./contexts/CurrentUserContextProvider.jsx";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CurrentUserContext>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </CurrentUserContext>,
);
