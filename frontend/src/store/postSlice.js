import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.Posts = action.payload
        }
    }
})

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;