import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents } from "../actions/eventAction";

const initialState = {
  data: [],
  error: null,
  status: "idle",
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        (state.error = "null"), (state.data = payload);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default eventSlice.reducer;
