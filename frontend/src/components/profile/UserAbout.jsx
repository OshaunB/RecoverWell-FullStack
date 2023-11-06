import { useContext, useState } from "react";
import { Textarea, Button, IconButton } from "@material-tailwind/react";
import CurrentUserContext from "../../contexts/current-user-context";

export default function UserAbout({ id, userProfile, setUserProfile }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

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
        setUserProfile(userProfile && { ...userProfile, bio });
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Error occurred while updating bio:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setBio(userProfile?.bio || "");
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    handleBioUpdate();
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-2xl">
        <h2 className="font-bold text-2xl text-center text-palette-default pb-5">
          About @{userProfile && userProfile?.username}
        </h2>
        {isEditing ? (
          <div className="relative w-[32rem]">
            <Textarea
              variant="static"
              placeholder="Your Comment"
              rows={8}
              value={bio}
              onChange={handleBioChange}
            />
            <div className="w-full flex justify-between py-1.5">
              <IconButton
                variant="text"
                color="blue-gray"
                size="sm"
              ></IconButton>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="red"
                  variant="text"
                  rounded={true}
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button size="sm" rounded={true} onClick={handleSaveClick}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white py-4 px-6 rounded-lg">
            <p className="text-lg text-blue-gray-800 flex justify-center items-center">
              {userProfile?.bio}
            </p>
            {isCurrentUserProfile && (
              <div className="flex justify-center items-center">
                <Button
                  size="sm"
                  color="blue"
                  variant="text"
                  rounded={true}
                  onClick={handleEditClick}
                >
                  {userProfile && userProfile.bio && userProfile.bio.length > 0
                    ? "Edit Bio"
                    : "Add Bio"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
