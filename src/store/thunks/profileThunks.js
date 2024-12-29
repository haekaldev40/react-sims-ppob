import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_PROFILE_URL =
  "https://take-home-test-api.nutech-integrasi.com/profile";

const UPLOAD_PROFILE_IMAGE_URL =
  "https://take-home-test-api.nutech-integrasi.com/profile/image";

const UPDATE_PROFILE_IMAGE_URL = 
  "https://take-home-test-api.nutech-integrasi.com/profile/update";

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

      console.log("Profile Response:", response.data);
      return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const response = await axios.put(
        UPDATE_PROFILE_IMAGE_URL,
        profileData,
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

export const uploadProfileImage = createAsyncThunk(
  "profile/uploadImage",
  async (imageFile, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      if (!["image/jpeg", "image/png"].includes(imageFile.type)) {
        throw new Error("Format Image tidak sesuai");
      }

      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await axios.put(UPLOAD_PROFILE_IMAGE_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { status, message, data } = response.data;
      console.log('Upload response:', response.data);

      if (status !== 0 || !data || !data.profile_image) {
        console.error('Invalid response format:', response.data);
        throw new Error('Invalid response format from server');
      }

      console.log('Profile image berhasil diubah:', {
        status,
        message,
        newImageUrl: data.profile_image
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { 
        status: 400,
        message: error.message,
        data: null
      });
    }
  }
);