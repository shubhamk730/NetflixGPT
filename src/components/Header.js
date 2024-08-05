import React from 'react'
import { LOGO } from '../utils/constants'

const Header = () => {
  return (
    <div className='absolute w-full px-8 z-10 py-2 bg-gradient-to-b from-black'>
        <img className='w-40' src={LOGO} alt='Logo' />
    </div>
  )
}

// 2 : 31 33

export default Header