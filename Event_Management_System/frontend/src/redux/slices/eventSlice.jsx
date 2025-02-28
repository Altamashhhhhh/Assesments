import { createSlice } from "@reduxjs/toolkit";
import { createEventAction, fetchEvents } from "../actions/eventAction";

const initialState = {
  data: [],
  error: null,
  status: "idle",
  pagination : {}
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
        state.error = null;
        state.data = payload.events;
        state.pagination = payload.pagination
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(createEventAction.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(createEventAction.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        state.data.push(payload);
        state.error = null;
      })
      .addCase(createEventAction.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default eventSlice.reducer;
