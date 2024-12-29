import { createSlice } from "@reduxjs/toolkit";
import { getService } from "../thunks/informationThunks";

export const informationServiceSlice = createSlice({
  name: "informationService",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const informationServiceReducer = informationServiceSlice.reducer;

