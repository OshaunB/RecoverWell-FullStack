import { fetchHandler } from "../../utils";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentUserContext from "../../contexts/current-user-context";

export default function UserAbout() {
  const { currentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const fetchData = async () => {
      const [data, error] = await fetchHandler(`/api/users/${id}`);
      setUserProfile(data);
      setBio(data.bio || '');
    };
    fetchData();
  }, [id]);

  const handleBioUpdate = async () => {
    try {
      const response = await fetch(`/api/users/bio/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio }),
      });

      if (response.ok) {
        console.log("Bio updated successfully");
        setUserProfile({ ...userProfile, bio }); // Update userProfile with the new bio
        setShowModal(false); // Close the modal after updating the bio
      } else {
        console.log("Failed to update bio");
      }
    } catch (error) {
      console.log("Error occurred while updating bio:", error);
    }
  };

  const openDialog = () => {
    setShowModal(true);
  };

  const closeDialog = () => {
    setShowModal(false);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
    setUserProfile({ ...userProfile, bio: e.target.value }); // Update userProfile with the new bio as the user types
  };

  return (
    <div className="py-7">
      <h2 className="font-bold text-2xl text-center text-blue-600">About Me</h2>
      <p className="text-center text-lg text-blue-gray-800">{userProfile?.bio}</p>
      <div className="text-center">
        {isCurrentUserProfile && (
          <button
            data-ripple-light="true"
            data-dialog-target="dialog"
            className="middle none center mr-4 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={openDialog}
          >
            Edit Bio
          </button>
        )}
      </div>

      {showModal && (
        <div
          data-dialog-backdrop="dialog"
          data-dialog-backdrop-close="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        >
          <div
            data-dialog="dialog"
            className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-800 antialiased shadow-2xl"
          >
            <div className="flex-shrink-0 items-center p-4 font-sans text-2xl font-semibold leading-snug text-blue-gray-900 antialiased">
              Edit Bio
            </div>
            <div className="relative border-t border-b border-blue-gray-100 p-4 font-sans text-base font-light leading-relaxed text-blue-gray-800 antialiased">
              <form>
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </form>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end p-4 text-blue-gray-800">
              <button
                data-ripple-dark="true"
                data-dialog-close="true"
                className="middle none center mr-1 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={handleBioUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
