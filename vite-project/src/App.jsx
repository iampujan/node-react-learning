import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './login'
import { Link } from "react-router-dom";

function App() {

  return (
    <div>
      <Link to="/login">Login</Link><br />
      <Link to="/register">SignUp</Link><br />
    </div>
  )
}

export default App
