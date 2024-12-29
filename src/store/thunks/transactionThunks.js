import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TRANSACTION_URL = "https://take-home-test-api.nutech-integrasi.com/transaction";
const GET_HISTORY_TRANSACTION_URL = "https://take-home-test-api.nutech-integrasi.com/transaction/history";

export const makePayment = createAsyncThunk(
  "transaction/makePayment",
  async ({ service_code }, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const { balance } = getState().balance;
      const { data: services } = getState().service;

      const selectedService = services.find(
        (service) => service.service_code === service_code
      );

      if (!selectedService) {
        throw new Error("Layanan tidak ditemukan");
      }

      // Cek saldo mencukupi
      if (balance < selectedService.service_tariff) {
        throw new Error("Saldo tidak mencukupi");
      }

      const response = await axios.post(
        TRANSACTION_URL,
        { service_code },
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

export const getHistory = createAsyncThunk(
  "transaction/getHistory",
  async ({ offset = 0, limit = 5 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const response = await axios.get(GET_HISTORY_TRANSACTION_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { offset, limit },
      });

      return response.data.data; // 
    } catch (error) {
      return rejectWithValue(error.response?.data || {
        status: 400,
        message: error.message,
        data: null,
      });
    }
  }
);
