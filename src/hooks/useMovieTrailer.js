import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { useEffect } from 'react';


const url = 'https://api.themoviedb.org/3/movie/533535/videos?language=en-US';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
    
        const filterData = json.results.filter(video => {
          return video.type === 'Trailer';
        })
    
        const trailer = filterData.length ? filterData[0] : json.results[0] ;
    
        dispatch(addTrailerVideo(trailer));
    }
    
    useEffect(() => {
        getMovieVideos();
    }, [])
    
}

export default useMovieTrailer;