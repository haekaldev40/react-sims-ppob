import { createSlice } from "@reduxjs/toolkit"; 
import { getProfile } from "../thunks/profileThunks";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
      data: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data; 
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    },
});

export const profileReducer = profileSlice.reducer;