import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const GptMovieSuggestion = () => {
    //Subscribing to the store and getting the data
    const movieResults = useSelector(store => store.Gpt.gptMovies);
    const movieNames= useSelector(store => store.Gpt.movieNames);
    // if(!movieNames||!movieResults) return <p>Loading..</p>;
    return movieNames&&movieResults && (
        <div className="p-4 m-4 bg-black text-white bg-opacity-90">
            {movieNames.map((movie,index) =>(
                <MovieList key={movie} title={movie} movies={movieResults[index]}/>
            ) )}
        </div>
    )
}
export default GptMovieSuggestion;