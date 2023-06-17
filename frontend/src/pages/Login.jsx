import LoginImage from "../components/login/LoginImage.jsx";
import LoginForm from "../components/login/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full mt-40">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <LoginImage />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
