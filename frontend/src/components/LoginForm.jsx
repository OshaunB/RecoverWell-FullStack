import { useContext } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import LoginHeader from "./LoginHeader";
import LoginInputs from "./LoginInputs";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginForm () {

    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  
    if (currentUser) return <Navigate to="/" />;

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const userData = {
          username: e.target.username.value,
          password: e.target.password.value,
        };
        const [user, error] = await logUserIn(userData);
        if (error) return console.log(error);
        setCurrentUser(user);
        navigate(`/`);
      };


    return (
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <LoginHeader />

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <LoginInputs />
          </div>
    );
}