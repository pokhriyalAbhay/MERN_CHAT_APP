import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/config";

// Utility function to handle errors
const handleError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error(error.message);
  }
};

// Admin login action
const adminLogin = createAsyncThunk("admin/login", async (secretKey, thunkAPI) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${server}/api/v1/admin/verify`, { secretKey }, config);

    return data.message;
  } catch (error) {
    handleError(error);
  }
});

// Get admin details action
const getAdmin = createAsyncThunk("admin/getAdmin", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/`, {
      withCredentials: true,
    });

    return data.admin;
  } catch (error) {
    handleError(error);
  }
});

// Admin logout action
const adminLogout = createAsyncThunk("admin/logout", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
      withCredentials: true,
    });

    return data.message;
  } catch (error) {
    handleError(error);
  }
});

export { adminLogin, getAdmin, adminLogout };
