export default function NotFoundPage() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-9xl text-white font-bold">404</h1>
        <p className="text-4xl text-white mt-8">Page Not Found</p>
        <p className="text-white text-lg mt-4">
          Oops! The page you are looking for does not exist.
        </p>
        <button
          className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white px-6 py-2 mt-8 rounded-full"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
