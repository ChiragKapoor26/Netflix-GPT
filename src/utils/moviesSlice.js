import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        popularMovies : null,
        trailerVideo:null,
        gptTrailerVideo:null,
        topMovies:null,
        upcomingMovies:null
    },
    reducers:{
        addMovies: (state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo : (state,action) => {
            state.trailerVideo = action.payload
        },
        addPopular : (state,action) => {
            state.popularMovies = action.payload
        },
        addTop : (state,action) => {
            state.topMovies = action.payload
        },
        addUpcoming : (state,action) => {
            state.upcomingMovies = action.payload
        },
        addGptTrailerVideo : (state,action) => {
            state.gptTrailerVideo = action.payload
        }
    }
})
export const {addMovies,addTrailerVideo,addPopular,addTop,addUpcoming,addGptTrailerVideo} = moviesSlice.actions;
export default moviesSlice.reducer;