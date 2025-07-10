import { useEffect } from "react";
import { API_options } from "../utils/constants";
import { useDispatch,useSelector} from "react-redux";
import { addMovies } from "../utils/moviesSlice";
const useNowPlayingMovies = () => {
    // Fetching data from TMDB API and updating the redux store with the movies data
    const dispatch = useDispatch();
    const playing = useSelector((store) => store.movies.nowPlayingMovies);
    const getNowPlaying = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/now_playing?page=1&api_key=${apiKey}`;
        try {
            const data = await fetch(url, API_options);
            const json = await data.json();
            dispatch(addMovies(json.results));
        } catch(error) {
            console.error("Error fetching now playing movies",error);
        }
    }
    useEffect(()=>{
        if(!playing) getNowPlaying();
    },[]);
}
export default useNowPlayingMovies;