import { useDispatch } from "react-redux";
import { API_options } from "../utils/constants";
import { addUpcoming } from "../utils/moviesSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const useUpcomingMovies = () => {
    // Fetching data from TMDB API and updating the redux store with the movies data
    const dispatch = useDispatch();
    const upcoming = useSelector(store => store.movies.upcomingMovies);
    const getUpcomingMovies = async () => {
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_options);
            const json = await data.json();
            dispatch(addUpcoming(json.results));
        } catch (error) {
            console.error("Error fetching now playing movies",error);
        }
    }
    useEffect(()=>{
        !upcoming&&getUpcomingMovies();
    },[]);
}
export default useUpcomingMovies;