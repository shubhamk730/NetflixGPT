import React, { useRef, useState } from 'react'
import Header from './Header'
import { BG_URL, USER_LOGO } from '../utils/constants'
import { checkVaidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const nameInputRef = useRef(null);  // add name validation
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleClick = (e) => {
        setErrorMsg(null);
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const msg = checkVaidData(email, password)
        
        if(msg) {
            setErrorMsg(msg);
            return;
        }

        if(!isSignInForm) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(data => {
                // console.log(data);
                const userCredential = data.user;
                console.log(userCredential);
                updateProfile(userCredential, {
                    displayName: nameInputRef.current.value, photoURL: USER_LOGO
                  }).then(() => {
                    
                    const { uid, email, displayName, photoURL } = auth.currentUser;
                    dispatch(addUser({uid, email, displayName, photoURL}));

                  }).catch((error) => {
                    throw new Error(error);
                  });
            })
            .catch(err => {
                setErrorMsg(err.errorCode + '----' + err.message);
                console.log(err);
            })


        } else {

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(errorCode + " " + errorMessage);
            });
        }

        
    }

  return (
    <div className='bg-red-500 h-screen'>
        <Header />    
        <div className='absolute'>
            <img src={BG_URL} alt='Background' className='h-screen w-screen'/>
        </div>
        <form className='w-9/12 lg:w-3/12 absolute p-12 bg-black bg-opacity-80 text-white mx-auto left-0 right-0 my-36'>
            <h1 className='font-bold text-3xl p-2 mb-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && <input ref={nameInputRef} type="text" placeholder='Enter your Full Name' className='p-4 bg-black my-4 w-full rounded-sm' />}
            <input ref={emailInputRef} type="email" placeholder='Enter your email' className='p-4 bg-black my-4 w-full rounded-sm bg-gray-' />
            <input ref={passwordInputRef} type="password" placeholder='Enter your password' className='p-4 bg-black my-4 w-full rounded-sm' />
            { !!errorMsg && <p className='text-red-500 text-lg py-4'>{errorMsg}</p>}
            <button className='p-4 my-6 rounded-md bg-red-600 w-full' onClick={handleClick}>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
                {
                    isSignInForm 
                        ? <>New User? <span className='underline font-bold'>Signup here</span></> 
                        : <>Already a User? <span className='underline font-bold'>SignIn here</span></>
                }
                
            
            </p>
        </form>
    </div>
  )
}

export default Login