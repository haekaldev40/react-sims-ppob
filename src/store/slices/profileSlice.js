import { createSlice } from "@reduxjs/toolkit"; 
import { getProfile, updateProfile, uploadProfileImage } from "../thunks/profileThunks";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
      data: {},
      loading: false,
      error: null,
      message: null,
      uploadLoading: false,
      uploadError: null,
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
        })
        
        .addCase(uploadProfileImage.pending, (state) => {
          state.uploadLoading = true;
          state.uploadError = null;
        })
        .addCase(uploadProfileImage.fulfilled, (state, action) => {
          state.uploadLoading = false;
          state.message = null;
          state.data = action.payload.data;
        })
        .addCase(uploadProfileImage.rejected, (state, action) => {
          state.uploadLoading = false;
          state.uploadError = action.payload.message;
        })

        .addCase(updateProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.message = action.payload.message;
          state.data = action.payload.data;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    },
});

export const profileReducer = profileSlice.reducer;