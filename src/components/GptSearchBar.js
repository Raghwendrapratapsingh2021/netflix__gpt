import { useDispatch, useSelector } from "react-redux";
import lang from "../Utills/languageConstants";
import { useRef } from "react";
import openai from "../Utills/openAi";
import { API_options } from "../Utills/constant";
import { addGptMovieResult } from "../Utills/gptSlice";
const GptSearchBar = () => 
{

   const searchText=useRef(null);
   const langKey = useSelector(store=>store.config.lang)
   const dispatch=useDispatch()
   //search movie in TMDB

   const searchMovieTMDB=async(movie)=>{
    const data=await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_options)
    const json = await data.json();
    return json.results;

   }
 


   const handleGptSearchClick= async()=>{
       console.log(searchText.current.value);
        //Make a API call to GPT API and get Movies Result

        const gptQuery="Act as a Movie Recommendation system and suggest some movies for the query"+searchText.current.value+"only give me names of 10 movies,comma seprated like the exapmle result given ahead. example results: Gadar,Sholay,Don,Golmaal,Koi MIl Gaya etc";
       const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        if(!gptResults.choices){
            //error}
        }
        console.log(gptResults.choices?.[0]?.message?.content);
        const gptMovies=gptResults.choices?.[0]?.message?.content.split(",");
    
        // for each movie i will search TMDB API
         
        const promiseArray= gptMovies.map(movie =>searchMovieTMDB(movie))
         // we get array of promise [promise 5 time]
         const tmdbResults= await Promise.all(promiseArray);
        
         console.log(tmdbResults);

         dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
        }

    return (
        <div className="pt-[55%] md:pt-[20%] flex justify-center">
            <form className=" w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText}  type="text" className="p-4 m-4 col-span-9" placeholder={lang[langKey].gptSearchPlaceholder} />
            <button className="bg-red-700 m-4 py-2 px-4 text-white rounded-xl text-lg col-span-3"
            onClick={handleGptSearchClick}>{lang[langKey].search}</button>

            </form>
        </div>
    );
}

export default GptSearchBar;
