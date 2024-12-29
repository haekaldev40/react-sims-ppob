import { createSlice } from "@reduxjs/toolkit";
import { getBalance, topUpBalance } from "../thunks/balanceThunks";

const balanceSlice = createSlice({
    name: "balance",
    initialState: {
        data: null,
        balance: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.balance = action.payload.data.balance;
            })
            .addCase(getBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(topUpBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(topUpBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload.data.balance;
                state.message = action.payload.message;
              })
              .addCase(topUpBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
              });
    },
});

export const balanceReducer = balanceSlice.reducer;