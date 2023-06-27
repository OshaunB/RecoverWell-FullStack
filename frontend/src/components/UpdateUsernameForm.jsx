import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateUsername(
      Object.fromEntries(formData.entries())
    );
    if (error?.status > 400 && error?.status < 500) {
      setCurrentUser(null);
      return navigate("/");
    }
    setCurrentUser(user);
    event.target.reset();
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-xl mx-auto px-8 py-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <label htmlFor="username" className="text-white text-lg">
              New Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="block p-2.5 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <input type="hidden" name="id" value={currentUser.id} />

          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 text-gray bg-red-200 rounded-md hover:bg-red-200">
              Update Username
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
