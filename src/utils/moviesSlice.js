import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null
    },
    reducers:{
        addMovies: (state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo : (state,action) => {
            state.trailerVideo = action.payload
        }
    }
})
export const {addMovies , addTrailerVideo} = moviesSlice.actions;
export default moviesSlice.reducer;