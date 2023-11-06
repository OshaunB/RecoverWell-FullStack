import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import LoginHeader from "../components/login/LoginHeader";
import LoginDialog from "./LoginDialog";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [open, setOpen] = useState(false);

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
    <div className="bg-palette-teal h-full">
      <div className="flex justify-center items-center h-full">
        <div className="p-8 bg-white rounded-lg shadow-xl w-full m-5 max-w-[30rem]">
          <LoginHeader />
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4 flex-col space-y-4 sm:flex-row sm:space-y-0">
              <div className="flex-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 border border-black bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  required
                />
              </div>
              <div className="w-full mx-auto sm:ml-2 flex-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                  id="email"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 border border-black bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  required
                />
              </div>
            </div>
            <div className="flex mb-4 flex-col space-y-4 sm:flex-row sm:space-y-0">
              <div className="w-full mx-auto flex-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 border border-black bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  required
                />
              </div>
              <div className="w-full mx-auto sm:ml-2 flex-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 border border-black bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  required
                />
              </div>
            </div>
            <div className="flex mb-4 flex-col space-y-4 sm:flex-row sm:space-y-0">
              <div className="w-full mx-auto flex-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="dob"
                  id="dob"
                >
                  Date of Birth
                </label>
                <Input
                  type="date"
                  id="dob"
                  style={{ border: "1px solid #c9d2d6" }}
                  className="focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  required
                />
              </div>
              <div className="w-full mx-auto sm:ml-2 flex-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <Select label="Select Gender" id="gender" required>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                className="bg-none bg-meadow"
                fullWidth
                variant="gradient"
                type="submit"
              >
                Sign up
              </Button>
            </div>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <span className="ml-1 font-bold text-palette-default">
                <LoginDialog open={open} setOpen={setOpen} />
              </span>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
}
