import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
import { Background } from "../utils/constants";
const GptSearch = () => {
    return (
        <div>
            <div>
            <img src={Background} alt="background-image" className="object-cover h-screen fixed -z-10 w-screen"/>
            </div>
            <GptSearchBar/>
            <GptMovieSuggestion/>
        </div>
    )
}
export default GptSearch;