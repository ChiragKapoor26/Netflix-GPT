import { useDispatch,useSelector} from "react-redux";
import { API_options } from "../utils/constants";
import { addUpcoming } from "../utils/moviesSlice";
import { useEffect } from "react";
const useUpcomingMovies = () => {
    // Fetching data from TMDB API and updating the redux store with the movies data
    const dispatch = useDispatch();
    const upcoming = useSelector((store) => store.movies.upcomingMovies);
    const getUpcomingMovies = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
        try {
            const data = await fetch(url, API_options);
            const json = await data.json();
            dispatch(addUpcoming(json.results));
        } catch (error) {
            console.error("Error fetching now playing movies",error);
        }
    };
    useEffect(()=>{
        if(!upcoming) getUpcomingMovies();
    },[]);
}
export default useUpcomingMovies;