
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  

   const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
    useNowPlayingMovies();// custom hook
    usePopularMovies();
    useTrendingMovies();
    useUpcomingMovies();
     return (
        <div>
            <Header/> 
            {
              showGptSearch?(  <GptSearch/>):
              (<><MainContainer/>
              <SecondaryContainer/> </>
            )}
          
            
            {/* 
                MainContainer
                  -VideoBackground
                  -VideoTitle
                SecondaryContainer
                  -MovieList * n
                    - cards * n
            */}
        </div>
    );
}

export default Browse;
