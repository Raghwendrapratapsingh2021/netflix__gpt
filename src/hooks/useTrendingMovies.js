import { API_options } from "../Utills/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies} from "../Utills/movieSlice";
import { useEffect } from "react";

const useTrendingMovies=()=>{

    const dispatch=useDispatch();
    const trendingMovie=useSelector((store)=>store.movies.trendingMovies);
    const getTrendingMovies = async()=>{
    const data= await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1", API_options);
    const json=await data.json();
    console.log(json.results);
    dispatch(addTrendingMovies(json.results));

};

useEffect(()=>{
!trendingMovie && getTrendingMovies();
},[]);

};

export default useTrendingMovies;