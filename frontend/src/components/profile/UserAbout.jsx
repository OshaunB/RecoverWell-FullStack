import { Button } from "@material-tailwind/react";
import { Icon } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import CurrentUserContext from "../../contexts/current-user-context";
import { getUser } from "../../adapters/user-adapter";



// bg-red-200

export default function UserAbout() {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [userProfile, setUserProfile] = useState(null);
    const [errorText, setErrorText] = useState(null);
    const { id } = useParams();
    const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

    useEffect(() => {
        const loadUser = async () => {
          const [user, error] = await getUser(id);
          if (error) return setErrorText(error.statusText);
          setUserProfile(user);
        };
    
        loadUser();
      }, [id]);

      if (!userProfile && !errorText) return null;

    return (
        <div className="bg-blue-400">
            <div className="max-w-xl mx-auto px-8 py-6">
                <h1 className="text-3xl font-medium mb-4">About <span><AddIcon color="secondary" fontSize="large" /></span></h1>
                {
      !!isCurrentUserProfile &&
                <article>
                    <form onSubmit={() => { }}>
                        <div className="w-full">
                            <textarea
                                id="newPost"
                                rows="8"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Tell us something about yourself!"
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <Button
                                type="submit"
                            >
                                <p>Post</p>
                            </Button>
                        </div>
                    </form>
                </article>
}
            </div>
        </div>
    );
}