import CurrentUserContext from "../../contexts/current-user-context";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { logUserOut } from "../../adapters/auth-adapter";
import { fetchHandler } from "../../utils";

export default function UserHeading() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  console.log(currentUser);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  // useEffect(() => {
  //     const fetchData = async () => {
  //         const [data, error] = await fetchHandler(`/api/posts`);
  //         if (error) return console.log(error)
  //         console.log(data)

  //         data.forEach((post) => {
  //             if (post.user_id === currentUser.id) {
  //                 console.log('hi', post)
  //             }
  //         }) 
  //     }

  //     fetchData()

  //     // let arrayData = fetchData()
  //     // arrayData.forEach((post) => {
  //     //     if(post.user_id === currentUser.id){
  //     //         console.log('1')
  //     //     }
  //     // })
  //     // console.log(arrayData)

  // })
  // https://images.unsplash.com/photo-1489205228477-131202ff3403?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80
  // className="bg-gray-900"
  return (
    <div className="bg-gray-900">
      <div className="flex w-full">
        <div className="flex align-center justify-center bg-red-200 ml-8 ">
          <img
            className="w-5/6 my-8 mx-12 bg-orange-200 shadow-2xl"
            src={currentUser.avatar}
            alt=""
          />
        </div>
        <div className="flex w-full mx-8 items-center ">
          <div className="w-1/2">
            <h1 className="m-auto w-full text-3xl font-medium text-white py-2">
              {"Username: " + currentUser.username}
            </h1>
            <h1 className="m-auto w-full text-3xl font-medium text-white py-2">
              {"Gender: " + currentUser.gender}
            </h1>
            {!!isCurrentUserProfile && (
              <button
                className="text-3xl font-medium text-orange-400 py-2"
                onClick={handleLogout}
              >
                Log Out
              </button>
            )}
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
