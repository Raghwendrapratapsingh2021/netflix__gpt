import {IMG_CDN_URL} from "../Utills/constant";

const MovieCard = ({posterPath}) => {
     if(!posterPath)return null;
    return (
        <div className="w-36 md:w-48 pr-4 hover:scale-125  transition duration-300 ease-in-out">
            <img src={IMG_CDN_URL+posterPath} alt="Movie Card" /> 
        </div>
    );
}

export default MovieCard;
