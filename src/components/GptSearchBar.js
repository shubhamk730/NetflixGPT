import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import { sendChat } from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGPTMoviesResult } from '../utils/gptSlice'

const GptSearchBar = () => {
    const selectedLang = useSelector(store => store.config.lang)
    const searchText = useRef(null);
    const dispatch = useDispatch();

  
  const fetchTMDBSearchedMovies = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" + 
      movieName +
      "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    )

    const json = await data.json();

    return json.results;
  }

  const clickHandler = async (e) => {
    e.preventDefault();
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await sendChat(gptQuery);

    if (!gptResults) {
      alert('We could not process your request.')
      searchText.current.value='';
      return;
    }

    const gptMovies = gptResults[0]?.message?.content.split(", ");

    const promisedResults = gptMovies.map((movie) => fetchTMDBSearchedMovies(movie));

    const tmdbResults = await Promise.all(promisedResults);

    console.log(tmdbResults);

    dispatch(addGPTMoviesResult({movieNames: gptMovies , movieResults: tmdbResults}));

  }

  return (
    <div className='pt-[45%] md:pt-[10%]'>
        <form className='bg-black mx-auto md:w-1/2 w-full'>
            <input ref={searchText} type='text' className='p-4 m-4 w-7/12 md:w-8/12' placeholder={lang[selectedLang].gptSearchPlaceholder} />
            <button onClick={clickHandler} className='py-2 px-4 bg-red-700 text-white rounded-lg w-3/12 md:w-2/12'> {lang[selectedLang].search} </button>
        </form>
    </div>
  )
}

export default GptSearchBar