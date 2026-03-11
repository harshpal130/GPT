import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/auth.css'

const Register = () => {

  const navigate = useNavigate()

  const [form,setForm] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post("https://gpt-a71p.onrender.com//api/auth/register", form,{
      withCredentials:true
    })
    .then((res)=>{
      console.log(res)
      navigate("/login")
    })
    .catch((err)=>{
      console.log("error is ",err)
    })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create account</h2>
          <p className="muted">Enter your details to get started</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input name="firstName" type="text" className="auth-input" placeholder="First name" required onChange={handleChange}/>
          <input name="lastName" type="text" className="auth-input" placeholder="Last name" required onChange={handleChange}/>
          <input name="email" type="email" className="auth-input" placeholder="Email" required onChange={handleChange}/>
          <input name="password" type="password" className="auth-input" placeholder="Password" required onChange={handleChange}/>

          <button className="auth-button" type="submit">Create account</button>
        </form>

        <p className="auth-foot">
          Already have an account? 
          <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register