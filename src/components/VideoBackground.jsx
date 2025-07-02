import { useSelector } from "react-redux";
import useMovieTrailer from "../customHooks/useMovieTrailer";
const VideoBackground = ({movieId}) => {
    const trailerVideo = useSelector(store => store.movies?.trailerVideo);
    useMovieTrailer(movieId);
    return (
        <div className="w-screen overflow-hidden">
            <iframe 
            className="w-screen aspect-video -my-20 overflow-x-hidden"
            src={"https://www.youtube.com/embed/"+ trailerVideo?.key+"?&autoplay=1&mute=1"}
            title="Youtube video player"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share">
            </iframe>
        </div>
    )
}
export default VideoBackground;