import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
    return (
        <div className=" bg-black">
            <div className="-mt-20 relative z-20">
                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
                <MovieList title={"Popular"} movies={movies.popularMovies}/>
                <MovieList title={"Top Rated"} movies={movies.topMovies}/>
                <MovieList title={"Soon on Netflix"} movies={movies.upcomingMovies}/>
            </div>
        </div>
    )
}
export default SecondaryContainer;