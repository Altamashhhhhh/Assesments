import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://ems-onrf.onrender.com";

export const fetchEvents = createAsyncThunk(
  "event/events",
  async ({ token, page = 1, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        search
          ? `${url}/event/events?page=${page}&search=${search}`
          : `${url}/event/events?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createEventAction = createAsyncThunk(
  "event/create-event",
  async ({ eventData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/event/create-event`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      return response.data.event;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
