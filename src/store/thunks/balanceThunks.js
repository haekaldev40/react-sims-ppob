import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_BALANCE_URL = "https://take-home-test-api.nutech-integrasi.com/balance";
const TOP_UP_URL = "https://take-home-test-api.nutech-integrasi.com/topup";

export const getBalance = createAsyncThunk("balance/getBalance" , async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }
        const response = await axios.get(GET_BALANCE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const topUpBalance = createAsyncThunk(
  "balance/topUp",
  async (amount, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      if (amount < 10000 || amount > 1000000) {
        throw new Error(
          "Nominal Top Up harus antara Rp 10.000 hingga Rp 1.000.000"
        );
      }

      const response = await axios.post(
        TOP_UP_URL,
        { top_up_amount: amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {
        status: 400,
        message: error.message,
        data: null,
      });
    }
  }
);
