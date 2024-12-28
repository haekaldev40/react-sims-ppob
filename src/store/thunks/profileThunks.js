import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_PROFILE_URL =
  "https://take-home-test-api.nutech-integrasi.com/profile";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }
      const response = await axios.get(GET_PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);
