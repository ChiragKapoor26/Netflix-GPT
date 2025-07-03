import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./GptSlice";
import languageReducer from "./langSlice";
const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        Gpt : gptReducer,
        language :languageReducer,
    }
});
export default appStore;