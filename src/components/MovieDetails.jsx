import {useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import useMovieTrailer from "../customHooks/useMovieTrailer";
const MovieDetails = () => {
    const {id} = useParams();
    useMovieTrailer(id);
    const trailerVideo = useSelector(store => store.movies?.trailerVideo);
    return trailerVideo ? (
        <div className="p-4 bg-black text-white min-h-screen">
            <div className="aspect-w-16 aspect-h-9">
                <iframe className="w-full h-[500px]"
                src={"https://www.youtube.com/embed/"+ trailerVideo?.key+"?&autoplay=1"}
            title="Youtube video player"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share">
                </iframe>
            </div>
        </div>
    ) : <p>Trailer Not Available</p>
}
export default MovieDetails;