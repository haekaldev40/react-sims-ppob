import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const GET_SERVICE_URL = "https://take-home-test-api.nutech-integrasi.com/services";
const GET_BANNER_URL = "https://take-home-test-api.nutech-integrasi.com/banner";

export const getService = createAsyncThunk("information/getService", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token tidak ditemukan. Silakan login kembali.");    
        }
        const response = await axios.get(GET_SERVICE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const getBanner = createAsyncThunk("information/getBanner", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token tidak ditemukan. Silakan login kembali.");    
        }
        const response = await axios.get(GET_BANNER_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});