import { useDispatch } from "react-redux";
import { API_options } from "../utils/constants";
import { useEffect } from "react";
import { addTop } from "../utils/moviesSlice";
import { useSelector} from "react-redux";
const useTopMovies = () => {
    // Fetching data from TMDB API and updating the redux store with the movies data
    const dispatch = useDispatch();
    const topMovies = useSelector(store=>store.movies.topMovies);
    const getTopMovies = async () => {
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',API_options);
            const json = await data.json();
            dispatch(addTop(json.results));
        }
        catch(error) {
            console.error("Error fetching now playing movies",error);
        }
    }
    useEffect(()=>{
        !topMovies&&getTopMovies();
    },[]);
}
export default useTopMovies;