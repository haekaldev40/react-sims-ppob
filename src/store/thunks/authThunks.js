import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REGISTRATION_URL ="https://take-home-test-api.nutech-integrasi.com/registration";
const LOGIN_URL = "https://take-home-test-api.nutech-integrasi.com/login";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(REGISTRATION_URL, userData);
      return response.data; // Mengembalikan data dari response API
    } catch (error) {
      return rejectWithValue(error.response.data); // Menangani error dari API
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_URL, credentials);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);
