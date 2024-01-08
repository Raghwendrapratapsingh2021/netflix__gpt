import { API_options } from "../Utills/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies} from "../Utills/movieSlice";
import { useEffect } from "react";

const usePopularMovies=()=>{

    const dispatch=useDispatch();
    const popularMovie=useSelector((store)=>store.movies.popularMovies);
    const getPopularMovies = async()=>{
    const data= await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1", API_options);
    const json=await data.json();
    console.log(json.results);
    dispatch(addPopularMovies(json.results));

};

useEffect(()=>{
!popularMovie && getPopularMovies();
},[]);

};

export default usePopularMovies;