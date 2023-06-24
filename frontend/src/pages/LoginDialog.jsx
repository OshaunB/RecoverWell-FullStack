import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
// import { logUserIn } from "../adapters/auth-adapter";
import { fetchHandler, getPostOptions } from "../utils";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginDialog({ open, setOpen }) {
  const handleOpen = () => setOpen((cur) => !cur);
  const [error, setError] = useState("");
  const { setCurrentUser } = useContext(CurrentUserContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const [user, err] = await fetchHandler("/api/login", getPostOptions(userData));
    if (err) {
      if (err.statusText === "Unauthorized") {
        setError("Invalid password");
      } else if (err.statusText === "Not Found") {
        setError("Invalid username");
      }
      return;
    }
    setCurrentUser(user);
    handleOpen();
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleOpen}>Sign In</div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={handleLoginSubmit}>
          <Typography color="red" variant="h5" className="text-center">{error}</Typography>
            <CardBody className="flex flex-col gap-4">
              <Input label="Username" id="username" size="lg" />
              <Input label="Password" type="password" id="password" size="lg" />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Link
                  to="/sign-up"
                  className="ml-1 font-bold text-blue-500"
                  onClick={handleOpen}
                >
                  Sign up
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
