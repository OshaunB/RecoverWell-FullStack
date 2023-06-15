import { useContext } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
// import { createUser } from "../adapters/user-adapter";
import LabelInput from "../components/LabelInput";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
      full_name: e.target.elements.fullname.value,
      email: e.target.elements.email.value,
      DOB: e.target.elements.dob.value,
      gender: e.target.elements.gender.value,
    };

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch("/api/users", options);
      const data = await response.json();
      console.log(data);
      setCurrentUser(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser) return <Navigate to="/" />;

<<<<<<< HEAD
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <LabelInput
                htmlFor="fullname"
                label="FULL NAME"
                type="text"
                name="fullname"
                placeholder="John Doe"
=======
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');

    const [user, error] = await createUser({ username, password });
    if (error) return setErrorText(error.statusText);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };
//full name , dob , gender, avatar
//stretch feature - looking to add a feature to limit url inputs length

/*
<div>
            <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your profile Url</label>
            <input
              type="url"
              name="url"
              id="url"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Profile image URL"
              required
            />
          </div>


*/

  return <>
   <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img className="w-8 h-8 mr-2" src="assets/RecoverWell Dummy Logo.PNG" alt="logo" />
      Recover Well
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input
              type="fullname"
              name="fullname"
              id="fullname"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
            <input
              type="username"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Desired Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="Gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Select your Gender</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
              <option value="Other">Other</option>
              <option value="NA">Prefer Not To Say</option>
            </select>

          </div>
          <div>
  <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
  <input
    type="date"
    name="dob"
    id="dob"
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    required
  />
</div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
>>>>>>> 80a5b36 (log in page cleaned up, now needs functionality.)
                required
              />

              <LabelInput
                htmlFor="email"
                label="Your email"
                type="email"
                name="email"
                placeholder="name@company.com"
                required
              />

              <LabelInput
                htmlFor="username"
                label="Your Username"
                type="text"
                name="username"
                placeholder="Desired Username"
                required
              />

              <LabelInput
                htmlFor="password"
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />

              <div>
                <label
                  htmlFor="Gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue>Select your Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="NA">Prefer Not To Say</option>
                </select>
              </div>

              <LabelInput
                htmlFor="dob"
                label="Date of Birth"
                type="date"
                name="dob"
                required
              />

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <Link
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
