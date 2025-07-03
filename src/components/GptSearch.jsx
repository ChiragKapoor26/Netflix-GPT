import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
import { Background } from "../utils/constants";
const GptSearch = () => {
    return (
        <div>
            <div>
                <img src={Background} alt="background-image" className="fixed -z-10"/>
            </div>
            <GptSearchBar/>
            <GptMovieSuggestion/>
        </div>
    )
}
export default GptSearch;