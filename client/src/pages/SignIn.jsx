import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function SignIn() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login({ email, password });
      nav("/profile");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <main className="page">
      <h1>Sign In</h1>
      <form className="card form" onSubmit={onSubmit}>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </label>
        <label>Password
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </label>
        {err && <p className="error">{err}</p>}
        <button className="btn" type="submit">Sign In</button>
      </form>
      <p className="muted">Tip: passwords require 8+ chars, uppercase, lowercase, and a number.</p>
    </main>
  );
}