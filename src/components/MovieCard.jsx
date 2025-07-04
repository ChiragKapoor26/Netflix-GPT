import { IMG_CDN } from "../utils/constants";

const MovieCard = ({posterPath}) => {
    if(!posterPath) return null;
    return (
        <div className="w-[180px] cursor-pointer">
            <img alt="Movie-Card" src={IMG_CDN+posterPath}/>
        </div>
    )
}
export default MovieCard;