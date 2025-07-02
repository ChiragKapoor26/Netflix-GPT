import { API_options } from "../utils/constants";
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    // fetch trailer videos from the API and updating the store with trailer video data
    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_options);
        const json = await data.json();
        console.log(json);
        const filterData = json.results.filter((video) => video.type==="Trailer");
        console.log(filterData);
        const trailer = filterData.length?filterData[0]:json.results[0];
        dispatch(addTrailerVideo(trailer));
        console.log(trailer.key);
    };
    useEffect(() => {
        getMovieVideos();
    },[])
}
export default useMovieTrailer;