import { Button } from "@material-tailwind/react";
import { Icon } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// bg-red-200

export default function UserAbout() {
    return (
        <div className="bg-red-200">
            <div className="max-w-xl mx-auto px-8 py-6">
                <h1 className="text-3xl font-medium mb-4">About <span><AddIcon color="secondary" fontSize="large" /></span></h1>
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
                                gradientDuoTone="cyanToBlue"
                                outline
                                style={{ marginRight: "10px" }}
                            >
                                <p>Post</p>
                            </Button>
                        </div>
                    </form>
                </article>
            </div>
        </div>
    );
}
