import { useEffect } from "react";
import { API_options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovies } from "../utils/moviesSlice";
import { useSelector } from "react-redux";
const useNowPlayingMovies = () => {
    // Fetching data from TMDB API and updating the redux store with the movies data
    const dispatch = useDispatch();
    const playing = useSelector(store => store.movies.nowPlayingMovies);
    const getNowPlaying = async () => {
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_options);
            const json = await data.json();
            dispatch(addMovies(json.results));
        } catch(error) {
            console.error("Error fetching now playing movies",error);
        }
    }
    useEffect(()=>{
        !playing&&getNowPlaying();
    },[]);
}
export default useNowPlayingMovies;