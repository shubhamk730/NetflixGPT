import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
    const selectedLang = useSelector(store => store.config.lang)
    
  return (
    <div className='pt-[10%]'>
        <form className='bg-black mx-auto w-1/2 mx-auto'>
            <input type='text' className='p-4 m-4 w-9/12' placeholder={lang[selectedLang].gptSearchPlaceholder} />
            <button className='py-2 px-4 bg-red-700 text-white rounded-lg'> {lang[selectedLang].search} </button>
        </form>
    </div>
  )
}

export default GptSearchBar