import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'todo',
    initialState: {
        /* id, title, text, status */
        messages: []
    },
    reducers: {
        addToast(state, { payload }) {
            state.messages.push({
                id: new Date().getTime(),
                ...payload
            });
        },
        removeToast(state, { payload }) {
            state.messages = state.messages.filter((msg) => msg.id !== payload);
        }
    }
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;