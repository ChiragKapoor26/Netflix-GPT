import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import ai from "../utils/Gemini";
import { API_options } from "../utils/constants";
import { addGptMovieNames, addGptMovieResult } from "../utils/GptSlice";
const GptSearchBar = () => {
    const searchText = useRef(null);
    const langname = useSelector(store => store.language.lang);
    const dispatch = useDispatch();
    // The function below search movie in tmdb database
    const searchMovieTmdb = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_options)
        const json = await data.json();
        return json.results;
    }
    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);
        //Make an Api call to get the movie result
        const geminiPrompt= "Act as an Movie Recommendation System and suggest movies for the query"+searchText.current.value+"only give me names of six top rated Movies and give me movies in comma separated format like the example result given ahead. Example Result : Gadar, Sholay , Don , Golmal, Kuch kuch Hota hai";
        const gptResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: geminiPrompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  console.log(gptResponse.text);
  // Below we get the names of the movies from the tmdb api and dispatch it
  const gptMovies = gptResponse.text.split(",");
  dispatch(addGptMovieNames(gptMovies));
  // Now for Each movie I will call function for the search api of tmdb
  const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
  // The above data will return the array of promises to us
  const tmdbResults = await Promise.all(promiseArray);
  console.log(tmdbResults);
  // Store the above data inside the redux store
  dispatch(addGptMovieResult(tmdbResults));
    };
    return (
        <div className="pt-[10%] flex justify-center">
            <form className=" bg-black w-1/2 grid grid-cols-12 rounded-md" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder={lang[langname].gptSearchPlaceholder} className="p-3 m-3 col-span-9  text-xl" ref={searchText}/>
                <button className="bg-red-700 rounded-lg text-white py-2 px-4 col-span-3 m-3" onClick={handleGptSearchClick}>{lang[langname].search}</button>
            </form>
        </div>
    )
}
export default GptSearchBar;