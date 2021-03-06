import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css'
import App from './App'
import Login from './login'
import SignUp from './signup'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
