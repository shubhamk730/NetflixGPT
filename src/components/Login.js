import React, { useState } from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

  return (
    <div className='bg-red-500 h-screen'>
        <Header />    
        <div className='absolute'>
            <img src={BG_URL} alt='Background' className='h-screen w-screen'/>
        </div>
        <form className='w-4/12 absolute p-12 bg-black bg-opacity-80 text-white mx-auto left-0 right-0 my-36'>
            <h1 className='font-bold text-3xl p-2 mb-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && <input type="text" placeholder='Enter your Full Name' className='p-4 bg-black my-4 w-full rounded-sm' />}
            <input type="email" placeholder='Enter your email' className='p-4 bg-black my-4 w-full rounded-sm bg-gray-' />
            <input type="password" placeholder='Enter your password' className='p-4 bg-black my-4 w-full rounded-sm' />
            <button className='p-4 my-6 rounded-md bg-red-600 w-full'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
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