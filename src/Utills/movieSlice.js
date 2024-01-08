import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({

     name:"movies",
     initialState:{
        nowPlayingMovies:null,
        trailerVideo:null,
        popularMovies:null,
        trendingMovies:null,
        upcomingMovies:null,

     },
     reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        addPopularMovies:(state,action)=>{
         state.popularMovies=action.payload;
        },

        addTrendingMovies:(state,action)=>{
         state.trendingMovies=action.payload;
        },

        addUpcomingMovies:(state,action)=>{
         state.upcomingMovies=action.payload;
        },
        addTrailerVideo:(state,action)=>{
         state.trailerVideo=action.payload;
        },
         

     }

});

export const {addUpcomingMovies,addNowPlayingMovies,addTrendingMovies, addPopularMovies, addTrailerVideo}=movieSlice.actions;
export default movieSlice.reducer;