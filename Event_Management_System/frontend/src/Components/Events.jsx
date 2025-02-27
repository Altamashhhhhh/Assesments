import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../redux/actions/eventAction';

const Events = () => {
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ; 
  const {data , error , status} = useSelector(state => state.event)
  const {isLogged} = useSelector(state => state.user)

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmYzM2ZkMTU1ZmVmYTY0MmY4ZDUzNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQwNjM2NzU3LCJleHAiOjE3NDA2NDAzNTd9.XHwUmVn_mdVtCxanQOWBEEHY7ChBb1asFmIqyZnqNJk"
  useEffect(()=>{
    if(!isLogged){
      navigate("/login")
    }
    dispatch(fetchEvents(token))
    
  },[])
  return (
    <div className="grid grid-cols-4 gap-5 p-10 w-full">
       {data?.map((event , index) => (
        <div key={index} className="shadow-2xl p-10">
        <img src="" alt="for nwo random image" />
        <h2>Title : {event.title} </h2>
        <h2>Description : {event.description}</h2>
        <h2>Location : {event.location}</h2>
        <h2>Date : {event.date} </h2>
        <button className='bg-blue-500 p-2 mt-3 text-white rounded-sm w-full'>Register for this event</button>
        </div>
       ))}
    </div>
  )
}

export default Events
