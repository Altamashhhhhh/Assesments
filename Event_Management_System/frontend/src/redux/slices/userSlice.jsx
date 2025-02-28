import { createSlice } from "@reduxjs/toolkit";
import { loginUserAction, registerUserAction } from "../actions/userAction";

const initialState = {
  users: [],
  isLogged: false,
  error: null,
  status: "idle",
  token: "",
  role : "" , 
  currentUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogged = false;
      state.status = "idle";
      state.error = null;
      state.token = "";
      state.currentUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.isLogged = false;
      })
      .addCase(registerUserAction.fulfilled, (state) => {
        state.status = "Completed";
        state.error = null;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUserAction.pending, (state) => {
        state.status = "Loading";
        state.isLogged = false;
        state.error = null;
      })
      .addCase(loginUserAction.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        state.error = null;
        state.token = payload.token;
        state.currentUser = payload.user;
        state.isLogged = true;
        state.role = payload?.user?.role || ""
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload || action.error.message;
        state.isLogged = false;
        state.token = null;
        state.currentUser = null;
      });
  },
});


export const {logout} = userSlice.actions
export default userSlice.reducer;
