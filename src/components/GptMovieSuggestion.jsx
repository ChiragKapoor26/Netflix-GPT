import GptMovieCard from "./GptMovieCard";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const GptMovieSuggestion = () => {
    //Subscribing to the store and getting the data
    const movieResults = useSelector(store => store.Gpt.gptMovies);
    const movieNames= useSelector(store => store.Gpt.movieNames);
    // if(!movieNames||!movieResults) return <p>Loading..</p>;
    return movieResults&&(
        <div className="p-4 justify-center m-4 bg-black bg-opacity-90 flex gap-x-20 gap-y-10 flex-wrap">
            {movieResults.map((movieArray) =>{
                const firstMovie = movieArray[0];
                return firstMovie ? (
                    <GptMovieCard key={firstMovie.id} posterPath={firstMovie.poster_path} title={firstMovie.title} id={firstMovie.id}/>
                ):null;
 } )}
        </div>
    )
}
export default GptMovieSuggestion;