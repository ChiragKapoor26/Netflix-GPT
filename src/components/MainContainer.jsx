import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
     if(!movies) return;
     console.log(movies.length);
    const mainMovie = movies[2];
    const {original_title , overview,id} = mainMovie;
    return (
        <div className="overflow-hidden">
            <VideoTitle title = {original_title} overview = {overview}/>
            <VideoBackground movieId = {id}/>
        </div>
    )
}
export default MainContainer;