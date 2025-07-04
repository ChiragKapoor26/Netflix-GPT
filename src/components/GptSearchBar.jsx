import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
const GptSearchBar = () => {
    const langname = useSelector(store => store.language.lang);
    return (
        <div className="pt-[10%] flex justify-center">
            <form className=" bg-black w-1/2 grid grid-cols-12 rounded-md">
                <input type="text" placeholder={lang[langname].gptSearchPlaceholder} className="p-3 m-3 col-span-9  text-xl"/>
                <button className="bg-red-700 rounded-lg text-white py-2 px-4 col-span-3 m-3">{lang[langname].search}</button>
            </form>
        </div>
    )
}
export default GptSearchBar;