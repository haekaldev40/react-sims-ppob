import { createSlice } from "@reduxjs/toolkit";
import { getHistory, makePayment } from "../thunks/transactionThunks";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    loading: false,
    error: null,
    transactionData: {
      records: [],
      offset: 0,
      limit: 5
    }
  },
  reducers: {
    clearTransaction: (state) => {
      state.transactionData = null;
      state.error = null;
    },
    setOffset: (state, action) => {
      state.transactionData.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionData = action.payload.data;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Transaksi gagal";
      })

      .addCase(getHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionData = action.payload;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Transaksi gagal";
      });


  },
});

export const { clearTransaction, setOffset } = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;
