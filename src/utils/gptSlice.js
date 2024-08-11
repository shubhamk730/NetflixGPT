import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:'gpt',
    initialState:{
        showGPTSearch: false,
        movieNames: null,
        movieResults: null
    },
    reducers: {
        toggleGPTSearchView: (state) => {
            state.showGPTSearch = !state.showGPTSearch;
        },
        addGPTMoviesResult: (state, action) => {
            const { movieNames, movieResults } = action.payload
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    }
})

export const { toggleGPTSearchView, addGPTMoviesResult } = gptSlice.actions;

export default gptSlice.reducer;