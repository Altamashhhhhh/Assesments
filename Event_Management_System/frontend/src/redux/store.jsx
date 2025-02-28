import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./slices/eventSlice";
import  userReducer from "./slices/userSlice";
import enrollReducer from "./slices/enrollSlice";

export const store = configureStore({
    reducer : {
        event : eventReducer ,
        user : userReducer , 
        enroll : enrollReducer
    }
})