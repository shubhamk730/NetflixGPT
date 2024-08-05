import React from 'react'
import { LOGO, USER_LOGO } from '../utils/constants'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  // console.log(user);

  const handleSignOut = () => {

    signOut(auth)
      .then(() => {
      navigate("/");
      })
      .catch((error) => {
        console.log(error);
        navigate("/error")
        // alert("Invalid operation");
      });
  }

  return (
    <div className='absolute w-full px-8 z-10 py-2 bg-gradient-to-b from-black flex items-center justify-between'>
        <img className='w-40' src={LOGO} alt='Logo' />

        {user && <div className='flex'>
          <img className='w-[36px] h-[36px] rounded-md mx-2' src ={USER_LOGO} alt="" />
          <button onClick={handleSignOut} className=' font-bold text-white'> Sign out</button>
        </div>}
    </div>
  )
}


export default Header