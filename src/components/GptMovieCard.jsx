import { useNavigate } from "react-router-dom";
import { IMG_CDN } from "../utils/constants";
const GptMovieCard = ({posterPath,title,id}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movie/${id}`);
    }
    if(!posterPath) return null;
    return (
        <div className="w-[300px] cursor-pointer bg-gray-700 opacity-80 rounded-lg p-2 flex flex-col items-center" onClick={handleClick}>
            <img alt="Movie-Card" src={IMG_CDN+posterPath} className="h-[80%] w-[90%] rounded-lg"/>
            <div className="h-[20%] w-[90%] flex justify-center items-center text-white">
                <h1 className="font-bold text-xl text-center">{title}</h1>
            </div>
        </div>
    )
}
export default GptMovieCard;