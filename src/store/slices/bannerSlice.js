import { createSlice } from "@reduxjs/toolkit";
import { getBanner } from "../thunks/informationThunks";

export const informationBanner = createSlice({
  name: "informationBanner",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const informationBannerReducer = informationBanner.reducer;