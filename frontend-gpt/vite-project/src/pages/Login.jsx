import React, { useState } from 'react'
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ FIXED (top level)

  const [form, setForm] = useState({
    email:"",
    password:""
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://gpt-1-od0l.onrender.com/api/auth/login", form ,{
      withCredentials:true
    })
    .then((res)=>{
      console.log(res);

      dispatch(setUser({
        user: res.data.user,
        token: null
      }));

      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    })
    .catch((err)=>{
      console.log(err);
    });
  };

  


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p className="muted">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input 
            name="email" 
            type="email" 
            className="auth-input" 
            placeholder="Email" 
            required
            onChange={handleChange}
          />

          <input 
            name="password" 
            type="password" 
            className="auth-input" 
            placeholder="Password" 
            required
            onChange={handleChange}
          />

          <button className="auth-button" type="submit">Sign in</button>
        </form>

        <p className="auth-foot">
          Don't have an account? 
          <Link to="/register" className="auth-link">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login