import { Link } from "react-router-dom";

export default function LoginHeader() {
  return (
    <>
      <div className="flex justify-center mx-auto">
        <img
          className="w-auto h-7 sm:h-8"
          src="assets/RecoverWell Dummy Logo.PNG"
          alt=""
        />
      </div>

      <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
        Welcome back!
      </p>

      <Link
        to="#"
        className="flex items-center justify-center mt-4 text-white transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 bg-gray-800"
      >
        <div className="px-4 py-2">
          <img
            className="w-auto h-7 sm:h-8"
            src="assets/RecoverWell Dummy Logo.PNG"
            alt=""
          />
        </div>
        YOUR JOURNEY, OUR MISSION
      </Link>
    </>
  );
}
