import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://ems-onrf.onrender.com";

export const enrollEventAction = createAsyncThunk(
  "enroll/enroll-event",
  async ({ enrollData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/enroll/enroll-event`,
        enrollData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.enrollment;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchEnrollmentsAction = createAsyncThunk(
  "enroll/enrollments",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/enroll/enrollments/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.enrollments;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchEnrolledUsersAction = createAsyncThunk(
  "enroll/event",
  async ({ eventId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/enroll/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const unregisterEventAction = createAsyncThunk(
  "/enrollment/delete" , 
  async ({id , token} , {rejectWithValue}) => {
    try{
      const response = await axios.delete(`${url}/enroll/delete/${id}` , {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      console.log(response)
      return response.data
    }catch(error){
      console.log(error)
      return rejectWithValue(error.response.data.message || error.message )
    }
  } 
)