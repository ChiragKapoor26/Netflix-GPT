import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import ai from "../utils/Gemini";
import { API_options } from "../utils/constants";
import { addGptMovieNames, addGptMovieResult, removeGptMovieNames, removeGptMovieResult } from "../utils/GptSlice";
import { SpeakText } from "./SpeakText";
import { useState,useEffect} from "react";
import clsx from "clsx";
const GptSearchBar = () => {
    const searchText = useRef(null);
    const [isVoiceEnabled,setisVoiceEnabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const langname = useSelector(store => store.language.lang);
    const movieResults = useSelector(store => store.Gpt.gptMovies);
    const movieNames= useSelector(store => store.Gpt.movieNames);
    const dispatch = useDispatch();
    const hasSpokenRef = useRef(false);
    useEffect(() => {
      if (!movieNames || !isVoiceEnabled || hasSpokenRef.current) return;
        SpeakText(movieNames);
        setisVoiceEnabled(false);
        hasSpokenRef.current = true;
    }, [movieNames]);

    // The function below search movie in tmdb database
    const searchMovieTmdb = async(movie) => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
        try {
          const data = await fetch(url);
          const json = await data.json();
          return json.results;
        } catch(error) {
          console.error("Error searching movie from TMDB:", error);
          return [];
        }
    }
    const handleRemoveMovies = () => {
      dispatch(removeGptMovieResult());
      dispatch(removeGptMovieNames());
      searchText.current.value = "";
      hasSpokenRef.current = false;
      setErrorMessage(""); 
    }
    const RecordSpeech = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition.");
    return;
  }

  const r = new SpeechRecognition();
  r.continuous = false;
  r.interimResults = false;
  r.maxAlternatives = 1;
  r.lang = "en-US";

  r.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    searchText.current.value = transcript;
    handleGptSearchClick();
    setisVoiceEnabled(true) // ✅ Call GPT logic only after we get the voice input
  };

  r.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
  };

  r.onend = function () {
  };

  try {
    r.start();
  } catch (err) {
    console.error("Speech recognition start error:", err);
  }
};
    const handleGptSearchClick = async () => {
        const query = searchText.current?.value?.trim();
        if (!query) {
        setErrorMessage("Please enter a movie or genre to search.");
        return;
      }
      setErrorMessage("");
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
  // Below we get the names of the movies from the tmdb api and dispatch it
  const gptMovies = gptResponse.text.split(",");
  dispatch(addGptMovieNames(gptMovies));
  // Now for Each movie I will call function for the search api of tmdb
  const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
  // The above data will return the array of promises to us
  const tmdbResults = await Promise.all(promiseArray);
  // Store the above data inside the redux store
  dispatch(addGptMovieResult(tmdbResults));
    };
    return (
        <div className="flex flex-col items-center">
            <form className=" bg-black w-4/5 mx-4 md:mx-0 md:w-4/5 lg:w-1/2 grid grid-cols-12 rounded-md mt-[50%] md:mt-[20%] lg:mt-[10%] px-1" onSubmit={(e) => e.preventDefault()}>
      
                {movieNames&&<button onClick={handleRemoveMovies}><img src="/images/backArrow.png" alt="back-arrow" className="bg-red-700 rounded-full" height={50} width={50}/></button>}
                {!movieResults&&!movieNames&&<button onClick={RecordSpeech}><img src="/images/mic.png" alt="mic-img" className="bg-red-700 rounded-700 rounded-full ml-1 p-1" height={40} width={40}/></button>}
                <input type="text" placeholder={lang[langname].gptSearchPlaceholder} className={clsx("py-3 my-3 mx-3 md:mx-1 md:ml-3 col-span-8 text-sm md:text-xl rounded-lg",movieResults&&movieNames?"col-span-8":"col-span-8")} ref={searchText}/>
                <button className={clsx("bg-red-700 rounded-lg text-white py-1 md:py-2 px-2 md:px-2 col-span-3 my-3 md:ml-2 mr-2 flex justify-center items-center",movieResults&&movieNames?"col-span-2":"col-span-3")} onClick={handleGptSearchClick}>{lang[langname].search}</button>
            </form>
            {errorMessage && (
            <div className="text-red-500 bg-black px-4 py-2 text-center mt-2 text-sm md:text-base">
            {errorMessage}
          </div>
            )}
        </div>
    )
}
export default GptSearchBar;