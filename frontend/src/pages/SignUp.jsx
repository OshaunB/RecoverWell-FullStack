import { useContext } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import LabelInput from "../components/LabelInput";
import LoginHeader from "../components/login/LoginHeader";
import LoginInputs from "../components/login/LoginInputs";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
      full_name: e.target.name.value,
      email: e.target.email.value,
      dob: e.target.dob.value,
      gender: e.target.gender.value,
    };

    const user = await createUser(userData);
    setCurrentUser(user);
    navigate(`/profile-pic/${user.id}`);
  };

  if (currentUser) {
    console.log(currentUser);
    return <Navigate to="/" />;
  }

  return (
  <div className= 'bg-palette-default'>
    <div className="flex justify-center items-center h-screen">
     
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
     
      <LoginHeader></LoginHeader>
      <br></br>
      <form  onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="name"
              type="text"
              placeholder="Your full name"
              htmlFor= 'name'
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email" id='email'>
              Email
            </label>
            <input
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="email"
              type="email"
              placeholder="Your email address"
              htmlFor= 'email'
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="username"
              type="text"
              placeholder="Your username"
              htmlFor= 'username'
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="password"
              type="password"
              placeholder="Your password"
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dob" id="dob" >
              Date of Birth
            </label>
            <input
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="dob"
              type="date"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 " type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
);
}