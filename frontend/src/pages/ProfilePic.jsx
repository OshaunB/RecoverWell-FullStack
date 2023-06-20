import { useState, useContext } from "react";
import { Widget } from "@uploadcare/react-widget";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getPatchOptions, fetchHandler } from "../utils";
import API_KEYS from "../../config";
import CurrentUserContext from "../contexts/current-user-context";

export default function ProfilePic() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [uploadedImage, setUploadedImage] = useState(null);

  // if (!currentUser) return <Navigate to="/" />;

  const handleRenderImage = (fileInfo) => {
    const croppedImageUrl = `${fileInfo.cdnUrl}-/scale_crop/500x500/smart_faces_objects/30p,25p/`;
    setUploadedImage(croppedImageUrl);
  };

  const handleImageToBackend = async () => {
    const [data, error] = await fetchHandler(
      `/api/users/profile-pic/${id}`,
      getPatchOptions({ avatar: uploadedImage })
    );
    if (error) return console.log(error);
    setCurrentUser(data);
    navigate(`/`);
  };

  return (
    <div className="container mx-auto p-4 bg-blue-900 flex justify-center items-center">
      <Widget
        className="bg-green-500 mb-4 p-4"
        publicKey={API_KEYS.UPLOADCARE_API_KEY || "Your_Uploadcare_Public_Key"}
        onChange={handleRenderImage}
      />
      {uploadedImage && (
        <div className="bg-gray-200 p-4 text-slate-400">
          <h2 className="text-xl font-bold mb-2">Uploaded Image:</h2>
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="mb-2 rounded-full"
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleImageToBackend}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
}
