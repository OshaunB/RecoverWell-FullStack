import { Button } from "@material-tailwind/react";
import { Icon } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function UserAbout() {
    return (
        <section className="mt-8 mx-auto">
            <div>
                <h1 className="text-3xl font-medium">About <span><AddIcon color="secondary" fontSize="large"></AddIcon></span></h1>
                <article className="">
                    <div className="max-w-sm px-1 py-6" >
                        <form onSubmit={() => { }}>
                            <textarea
                                id="newPost"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Tell us something about yourself!"
                            ></textarea>
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
                    </div>
                </article>
            </div>
        </section>


    )
} 