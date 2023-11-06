import { useState, useContext, useRef } from "react";
import { Widget } from "@uploadcare/react-widget";
import { Button } from "@material-tailwind/react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getPatchOptions, fetchHandler } from "../utils";
import API_KEYS from "../../config";
import CurrentUserContext from "../contexts/current-user-context";

export default function ProfilePic() {
  const navigate = useNavigate();
  const { id } = useParams();
  const widgetApi = useRef();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [uploadedImage, setUploadedImage] = useState(null);

  if (!currentUser) return <Navigate to="/" />;

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
    <div className="h-full mx-auto p-4 flex flex-col items-center">
      <Button onClick={() => widgetApi.current.openDialog()} className="mb-4">
        <Widget
          ref={widgetApi}
          publicKey={API_KEYS.UPLOADCARE_API_KEY || "Your_Uploadcare_Public_Key"}
          onChange={handleRenderImage}
        />
      </Button>

      {uploadedImage && (
        <div className="bg-gray-200 p-4 text-slate-400 rounded flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Uploaded Image:</h2>
          <div className="mb-2 rounded-full overflow-hidden">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-64 h-64 object-cover"
            />
          </div>
          <Button
            variant="gradient"
            color="green"
            className="py-2 px-4 rounded text-white"
            onClick={handleImageToBackend}
          >
            Upload
          </Button>
        </div>
      )}
      <Button onClick={() => navigate("/")} className="mt-4">
        Skip
      </Button>
    </div>
  );
}
