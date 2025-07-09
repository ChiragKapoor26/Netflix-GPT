import { useNavigate } from "react-router-dom";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({posterPath,id}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movie/${id}`);
    }
    if(!posterPath) return null;
    return (
        <div className="w-[180px] cursor-pointer" onClick={handleClick}>
            <img alt="Movie-Card" src={IMG_CDN+posterPath}/>
        </div>
    )
}
export default MovieCard;