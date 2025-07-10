import { API_options } from "../utils/constants";
import { useEffect } from "react";
import { addGptTrailerVideo } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
const useGptMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    // fetch trailer videos from the API and updating the store with trailer video data
    const movieVideos = useSelector((store)=>store.movies.gptTrailerVideo);
    const getMovieVideos = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        console.log(apiKey);
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${apiKey}`;
        console.log(url);
        try {
            const data = await fetch(url, API_options);
            const json = await data.json();
            const filterData = json.results.filter((video) => video.type==="Trailer");
            const trailer = filterData.length?filterData[0]:json.results[4];
            dispatch(addGptTrailerVideo(trailer));
        }
        catch(error) {
            console.error("Failed to fetch trailer video:", error);
        }
    };
    useEffect(() => {
        if(movieId) getMovieVideos();
    },[movieId]);
}
export default useGptMovieTrailer;