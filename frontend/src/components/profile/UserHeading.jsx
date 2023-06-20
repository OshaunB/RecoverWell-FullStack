import CurrentUserContext from "../../contexts/current-user-context"
import { useContext } from "react"

export default function UserHeading() {
    const { currentUser } = useContext(CurrentUserContext)
    console.log(currentUser)

    return (
        <div>
            <div className="flex">
                <div className="flex align-center justify-center">
                    <img src={currentUser.avatar} alt="" />
                </div>
                <div>
                    <h1>{currentUser.username}</h1>
                </div>
            </div>
        </div>
    )
}