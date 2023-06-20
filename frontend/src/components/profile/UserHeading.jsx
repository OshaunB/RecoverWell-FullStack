import CurrentUserContext from "../../contexts/current-user-context"
import { useContext } from "react"

export default function UserHeading() {
    const { currentUser } = useContext(CurrentUserContext)
    console.log(currentUser)

    return (
        <div>
            <div className="flex w-full">
                <div className="flex align-center justify-center bg-red-200 ml-8 shadow-lg">
                    <img className="w-2/3 my-8 mx-4 bg-orange-200 shadow-lg" src={currentUser.avatar} alt="" />
                </div>
                <div className="w-50">
                    <h1 className="align-center">{currentUser.username}</h1>
                </div>
            </div>
        </div>

    )
}