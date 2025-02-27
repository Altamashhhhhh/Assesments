import { Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Events from "./Components/Events"
import AddEvent from "./Components/AddEvent"
import MyEvents from "./Components/MyEvents"
import Register from "./Components/Register"
import Login from "./Components/Login"
const App = () => {
  return (
    <>
    <Navbar />
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/add-event" element={<AddEvent />} />
      <Route path="/my-event" element={<MyEvents />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App
