import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080";

export const fetchEvents = createAsyncThunk(
  "event/events",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/event/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.events;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
