import { API_options } from "../Utills/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies} from "../Utills/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies=()=>{

    const dispatch=useDispatch();
    const upcomingMovie=useSelector((store)=>store.movies.upcomingMovies);
    const getUpcomingMovies = async()=>{
    const data= await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1", API_options);
    const json=await data.json();
    console.log(json.results);
    dispatch(addUpcomingMovies(json.results));

};

useEffect(()=>{
!upcomingMovie && getUpcomingMovies();
},[]);

};

export default useUpcomingMovies;