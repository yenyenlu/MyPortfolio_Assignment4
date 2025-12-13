import { Link } from 'react-router-dom'

export default function Home(){
  const lastMsg = localStorage.getItem('lastMessage')
  return (
    <div className="container">
      <section className="hero">
        <div className="card">
          <span className="badge">Software Engineering – AI (Co-op) Student</span>
          <h1>Hi, I'm <span style={{color:'var(--primary)'}}>Yan Lu</span>.</h1>
          <p>I build websites, small apps, and learning projects in Python, C#, and JavaScript. This portfolio highlights my representative projects and services.</p>
          <div style={{display:'flex', gap:12, marginTop:12}}>
            <Link className="btn" to="/about">About Me</Link>
            <Link className="btn secondary" to="/projects">View Projects</Link>
          </div>
          {lastMsg && (
            <div className="notice" style={{marginTop:16}}>
              <strong>Thanks for your message!</strong>
              <div className="small">We captured it and redirected you here. I'll be in touch.</div>
            </div>
          )}
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <img src="/assets/self.jpg" alt="Yan Lu" className="avatar" />
          <p className="small" style={{marginTop:8}}>Toronto, ON · Open to co-op roles Jan 2026</p>
        </div>
      </section>
    </div>
  )
}