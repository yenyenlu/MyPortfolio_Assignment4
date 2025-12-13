import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contact(){
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName:'', lastName:'', phone:'', email:'', message:'' })

  function onChange(e){
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }
  function onSubmit(e){
    e.preventDefault()
    localStorage.setItem('lastMessage', JSON.stringify(form))
    navigate('/') // redirect to Home
  }

  return (
    <div className="container">
      <h2>Contact</h2>
      <div className="card">
        <div className="small" style={{marginBottom:12}}>Fill out the form; it will capture your info and redirect you back to the Home page.</div>
        <form className="form" onSubmit={onSubmit}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <input className="input" name="firstName" placeholder="First Name" onChange={onChange} required />
            <input className="input" name="lastName" placeholder="Last Name" onChange={onChange} required />
          </div>
          <input className="input" name="phone" placeholder="Contact Number" onChange={onChange} />
          <input className="input" type="email" name="email" placeholder="Email Address" onChange={onChange} required />
          <textarea className="input" name="message" rows="5" placeholder="Message" onChange={onChange} required />
          <button className="btn" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}