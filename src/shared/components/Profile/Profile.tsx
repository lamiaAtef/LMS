import { useSelector } from "react-redux";

import profileImg from "../../../assets/images/Profile/profilePhoto.png"


export default function Profile() {
      const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
 <div className='flex justify-center my-25'>
            <div className='p-5 shadow-lg  w-1/2  '>
                <div className='my-5  '>
                    <img src={profileImg} className=" w-20 h-20 " alt="profileImage"/>
                    {/* <h4 className='mt-4 fw-bold'>{userData?.userName}</h4>
                    <h4 className='profile-role'>{userData?.userGroup}</h4> */}
                </div>

                <p className='mb-2'><strong>Email:</strong> {user?.email}</p>
                <p className='mb-2'><strong>User Role:</strong> {user?.role}</p>
                {/* <p><strong>User ID:</strong> {user?.userId}</p> */}
            </div>
        </div>
    </>
  )
}
