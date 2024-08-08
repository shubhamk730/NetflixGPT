import React, { useEffect } from 'react'
import { LOGO, SUPPORTED_LANGUAGES, USER_LOGO } from '../utils/constants'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGPTSearchView } from '../utils/gptSlice';
import { changeLanguage } from "../utils/configSlice"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGPTSearch);
  const selectedLang = useSelector(store => store.config.lang)

  // console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({uid, email, displayName, photoURL}));
          navigate("/browse");
        } else {
            dispatch(removeUser());
            navigate("/");
        }
      });
    
    return () => unsubscribe();
  }, [])

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {

      })
      .catch((error) => {
        console.log(error);
        navigate("/error")
        // alert("Invalid operation");
      });
  }

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute w-full px-8 z-10 py-2 bg-gradient-to-b from-black flex items-center justify-between'>
        <img className='w-40' src={LOGO} alt='Logo' />

        {user && <div className='flex'>
          {showGptSearch && <select onChange={handleLangChange} className='bg-gray-900 p-2 text-white m-2'>
            {SUPPORTED_LANGUAGES.map((lang) => {
              return <option selected={lang.identifier === selectedLang} className='p-4' key={lang.identifier} value={lang.identifier}>{lang.name}</option>
            })}
          </select>}
          <button onClick={handleGPTSearchClick} className='py-2 px-4 mx-4 bg-purple-800 rounded-lg text-white font-bold'>
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img className='w-[36px] h-[36px] rounded-md mx-2' src ={USER_LOGO} alt="" />
          <button onClick={handleSignOut} className=' font-bold text-white'> Sign out</button>
        </div>}
    </div>
  )
}


export default Header