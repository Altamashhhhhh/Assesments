import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080";


export const enrollEventAction = createAsyncThunk(
    "enroll/enroll-event" , 
    async ({enrollData , token } , {rejectWithValue}) => {
        try{
            const response = await axios.post(`${url}/enroll/enroll-event` , enrollData , {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            console.log(enrollData)
            console.log(response.data.enrollment)
            return response.data.enrollment
        }catch(error){ 
            console.log(enrollData)
            console.log(error)
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const fetchEnrollmentsAction = createAsyncThunk(
    "enroll/enrollments" , 
    async ({userId , token},{rejectWithValue})=>{
        try{
            const response = await axios.get(`${url}/enroll/enrollments/${userId}` , {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
             
            console.log(response.data.enrollments)
            return response.data.enrollments
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const fetchEnrolledUsersAction = createAsyncThunk(
    "enroll/event" , 
    async ({ eventId ,token},{rejectWithValue})=>{
        try{
            const response = await axios.get(`${url}/enroll/event/${eventId}` , {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            
            console.log(response.data.users)
            return response.data.users
        }catch(error){
            console.log(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)