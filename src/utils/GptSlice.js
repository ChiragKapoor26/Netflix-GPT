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
        }
    }

});
export const {ToggleGptSearch,addGptMovieResult,addGptMovieNames} = GptSlice.actions;
export default GptSlice.reducer;