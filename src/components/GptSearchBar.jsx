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
    const langname = useSelector(store => store.language.lang);
    const movieResults = useSelector(store => store.Gpt.gptMovies);
    const movieNames= useSelector(store => store.Gpt.movieNames);
    const dispatch = useDispatch();
    useEffect(() => {
      if (movieNames && isVoiceEnabled) {
        SpeakText(movieNames);
        setisVoiceEnabled(false);
      }
    }, [movieNames,isVoiceEnabled]);

    // The function below search movie in tmdb database
    const searchMovieTmdb = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_options)
        const json = await data.json();
        return json.results;
    }
    const handleRemoveMovies = () => {
      dispatch(removeGptMovieResult());
      dispatch(removeGptMovieNames());
      searchText.current.value = "";
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
    console.log("Speech recognition ended.");
  };

  try {
    r.start();
  } catch (err) {
    console.error("Speech recognition start error:", err);
  }
};
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
        <div className="pt-[40%] md:pt-[10%] flex justify-center">
            <form className=" bg-black w-full mx-4 md:mx-0 md:w-1/2 grid grid-cols-12 rounded-md" onSubmit={(e) => e.preventDefault()}>
                {movieNames&&<button onClick={handleRemoveMovies}><img src="/images/backArrow.png" alt="back-arrow" className="bg-red-700 rounded-full ml-1" height={50} width={50}/></button>}
                {!movieResults&&!movieNames&&<button className="bg-red-500 rounded-full py-1 md:py-2 px-2 col-span-1 my-3 ml-2" onClick={RecordSpeech}><img src="/images/mic.png" alt="mic-img"/></button>}
                <input type="text" placeholder={lang[langname].gptSearchPlaceholder} className={clsx("p-3 my-3 ml-2 col-span-9 text-sm md:text-xl",movieResults&&movieNames?"col-span-8":"col-span-8")} ref={searchText}/>
                <button className={clsx("bg-red-700 rounded-lg text-white py-1 md:py-2 px-2 md:px-2 col-span-2 my-3 mx-2",movieResults&&movieNames?"col-span-2":"col-span-2")} onClick={handleGptSearchClick}>{lang[langname].search}</button>
            </form>
        </div>
    )
}
export default GptSearchBar;