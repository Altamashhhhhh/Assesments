import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const {isLogged} = useSelector(state => state.user)
  const navigate = useNavigate() 

  useEffect(()=>{
    if(!isLogged){
      navigate("/login")
    }
  },[isLogged])
  return (
    <div className="flex font-serif justify-center items-center w-full h-screen ">
      <div className="flex flex-col justify-around text-center min-w-1/2 min-h-1/2 shadow-[1px_1px_10px_rgba(0,0,255,0.4)] p-5 rounded-2xl bg-white border border-gray-200">
        <h1 className='font-medium text-4xl text-gray-600'>ONE STOP</h1>
        <h1 className='font-bold text-5xl text-gray-700'>EVENT PLANNER</h1>
        <h1 className='font-extralight text-xl text-gray-600'>EVERY EVENT SHOULD BE PERFECT</h1>
        <div className='flex w-2/3 mx-auto justify-around mt-4'>
          <button className='bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300'><Link to={"/my-event"}>YOUR EVENTS</Link></button>
          <button className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300'><Link to={"/events"}>EXPLORE EVENTS</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
