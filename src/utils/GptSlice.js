import { createSlice } from "@reduxjs/toolkit"
const GptSlice = createSlice({
    name:"Gpt",
    initialState: {
        showGptSearch : false,
        gptMovies:null,
        movieNames:null
    },
    reducers:{
        ToggleGptSearch : (state,action) => {
            state.showGptSearch =  !state.showGptSearch;
        },
        addGptMovieResult: (state,action) => {
            state.gptMovies = action.payload;
        },
        addGptMovieNames: (state,action) => {
            state.movieNames = action.payload;
        },
        removeGptMovieResult : (state,action) => {
            state.gptMovies = null;
        },
        removeGptMovieNames : (state,action) => {
            state.movieNames = null;
        }
    }

});
export const {ToggleGptSearch,addGptMovieResult,addGptMovieNames,removeGptMovieNames,removeGptMovieResult} = GptSlice.actions;
export default GptSlice.reducer;