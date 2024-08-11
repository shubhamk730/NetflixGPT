import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";


const GptSearch = () => {
    return <div className="">
        <div className='fixed -z-10'>
            <img src={BG_URL} alt='Background' className='h-screen w-screen object-cover'/>
        </div>
        <div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    </div>
}

export default GptSearch;