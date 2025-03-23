import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loadingStatus: false
    },
    reducers: {
        toggleLoading(state) {
            state.loadingStatus = !state.loadingStatus;
        }
    }
});

export const { toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;