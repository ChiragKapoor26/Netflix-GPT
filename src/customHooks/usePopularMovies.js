import { useDispatch } from "react-redux";
import { API_options } from "../utils/constants";
import { addPopular } from "../utils/moviesSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const usePopularMovies = () => {
    // Fetching data from TMDB API and updating the redux store with the movies data
    const dispatch = useDispatch();
    const popular = useSelector(store => store.movies.popularMovies);
    const getPopularMovies = async () => {
        try{
            const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_options);
            const json = await data.json();
            dispatch(addPopular(json.results));
        }
        catch(error) {
            console.error("Error fetching now playing movies",error);
        }
    }
    useEffect(()=>{
        !popular&&getPopularMovies();
    },[]);
}
export default usePopularMovies;