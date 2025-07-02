import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../customHooks/usePopularMovies";
import useTopMovies from "../customHooks/useTopMovies";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";
const Browser = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useTopMovies();
    useUpcomingMovies();
    return (
        <div>
            <Header/>
            <MainContainer/>
            <SecondaryContainer/>
        </div>
    )
}
export default Browser;