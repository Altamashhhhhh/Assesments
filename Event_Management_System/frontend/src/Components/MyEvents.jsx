import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyEvents = () => {
  const {isLogged} = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!isLogged){
      navigate("/login")
    }
  },[isLogged])
  return (
    <div>
      <h1>HERE ALL YOUR REGISTER EVENTS WILL APPEAR HERE </h1>
    </div>
  )
}

export default MyEvents
