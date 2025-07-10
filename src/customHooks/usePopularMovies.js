import { useDispatch ,useSelector} from "react-redux";
import { API_options } from "../utils/constants";
import { addPopular } from "../utils/moviesSlice";
import { useEffect } from "react";
const usePopularMovies = () => {
    // Fetching data from TMDB API and updating the redux store with the movies data
    const dispatch = useDispatch();
    const popular = useSelector((store) => store.movies.popularMovies);
    const getPopularMovies = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;
        try{
            const data = await fetch(url, API_options);
            const json = await data.json();
            dispatch(addPopular(json.results));
        }
        catch(error) {
            console.error("Error fetching now playing movies",error);
        }
    }
    useEffect(()=>{
        if(!popular)  getPopularMovies();
    },[]);
}
export default usePopularMovies;