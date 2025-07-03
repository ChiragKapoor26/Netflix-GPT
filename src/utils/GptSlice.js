import { createSlice } from "@reduxjs/toolkit"
const GptSlice = createSlice({
    name:"Gpt",
    initialState: {
        showGptSearch : false,
    },
    reducers:{
        ToggleGptSearch : (state,action) => {
            state.showGptSearch =  !state.showGptSearch;
        }
    }

});
export const {ToggleGptSearch} = GptSlice.actions;
export default GptSlice.reducer;