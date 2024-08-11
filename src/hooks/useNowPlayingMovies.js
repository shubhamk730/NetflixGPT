import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice"
import { useEffect } from "react";


const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    const { nowPlayingMovies } = useSelector(store => store.movies);

    

    const getNowPlayingMovies = async () => {

        const data = await fetch(url, API_OPTIONS);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
    }

    useEffect(() => {
        // only fetch movies when nowPlayingMovies is null
        !nowPlayingMovies && getNowPlayingMovies();
    }, []);


}

export default useNowPlayingMovies;