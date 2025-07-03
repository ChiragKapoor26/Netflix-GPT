import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../customHooks/usePopularMovies";
import useTopMovies from "../customHooks/useTopMovies";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";
const Browser = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useTopMovies();
    useUpcomingMovies();
    const gpt = useSelector(store => store.Gpt.showGptSearch);
    return (
        <div>
            <Header/>
            {gpt?<GptSearch/> : 
            <>
            <MainContainer/>
            <SecondaryContainer/>
            </>}
        </div>
    )
}
export default Browser;