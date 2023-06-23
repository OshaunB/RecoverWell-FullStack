import CurrentUserContext from "../../contexts/current-user-context"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { logUserOut } from "../../adapters/auth-adapter";
import { fetchHandler } from "../../utils";

import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";



export default function UserHeading(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);


    return (
        <div className="">
            <div className="flex w-full">

                <div
                    className="flex align-center justify-center ml-8 cursor-pointer transition-opacity hover:opacity-90"
                    onClick={handleOpen}>
                    <img className="w-5/6 my-8 mx-12 bg-orange-200 shadow-2xl rounded-full" src={props.avatar} alt="User Profile Pic" />
                </div>

                <Dialog size="md" open={open} handler={handleOpen}>
                    <DialogBody divider={true} className="p-0">
                        <img
                            alt="nature"
                            className="h-[48rem] w-full object-cover object-center"
                            src={props.avatar}
                        />
                    </DialogBody>
                </Dialog>




                <div className="flex w-full mx-8 items-center ">
                    <div className="w-1/2">
                        <h1 className="m-auto w-full text-3xl font-medium text-gray py-2">
                            {"Username: " + props.username}
                        </h1>
                        <h1 className="m-auto w-full text-3xl font-medium text-gray py-2">
                            {"Gender: " + props.gender}
                        </h1>
                    </div>
                    <div className="w-1/2">

                    </div>

                </div>

            </div>
        </div>

    )
}