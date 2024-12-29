import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunks/authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.user = null;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.token = action.payload.data.token;
        localStorage.setItem('token', action.payload.data.token);
        state.registrationSuccess = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.message = null;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.registrationSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.message = null;
      });
  },
});

export const { logout, reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
