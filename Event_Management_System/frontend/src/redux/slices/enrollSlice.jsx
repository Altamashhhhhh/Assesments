import { createSlice } from "@reduxjs/toolkit"
import { enrollEventAction, fetchEnrolledUsersAction, fetchEnrollmentsAction } from "../actions/enrollAction"

const initialState = {
    data : []  , 
    enrolled : [] ,
    error : "" , 
    status : "idle"
}


export const enrollSlice = createSlice({
    name : "enroll" , 
    initialState , 
    reducers : {
        resetError : (state) => {
            state.error = null  ;
            state.status  = "idle"
        } , 
        resetStatus : state => {
            state.status = "idle" ;
            state.error = null 
        }
    } , 
    extraReducers : builder => {
        builder.addCase(enrollEventAction.pending , state => {
            state.status = "Enrollment Loading" ; 
            state.error = null;
        }).addCase(enrollEventAction.fulfilled , (state , {payload}) => {
            state.status = "Enrollment Completed" ; 
            state.error = null ; 
            // state.data.push(payload)
        }).addCase(enrollEventAction.rejected , (state , action ) => {
            state.status = "Enrollment Failed" ; 
            state.error = action.payload || action.error.message 
        }).addCase(fetchEnrollmentsAction.pending , state => {
            state.status = "Loading" ; 
            state.error = null ; 

        }).addCase(fetchEnrollmentsAction.fulfilled , (state , {payload} ) => {
            state.status = "Completed" ; 
            state.error = null; 
            state.data = payload
        }).addCase(fetchEnrollmentsAction.rejected , (state , action)=>{
            state.status = "Failed"  ; 
            state.error = action.payload || action.error.message
        }).addCase(fetchEnrolledUsersAction.pending , state => {
            state.status = "Loading" ; 
            state.error = null 
        }).addCase(fetchEnrolledUsersAction.fulfilled , (state , {payload} ) => {
            state.status = "Completed" ; 
            state.error = null ; 
            state.enrolled = payload 
        }).addCase(fetchEnrolledUsersAction.rejected , (state , action ) => {
            state.status = "Failed" ; 
            state.error = action.payload || action.error.message 
        })
    }
})
export const {resetError , resetStatus} = enrollSlice.actions
export default enrollSlice.reducer