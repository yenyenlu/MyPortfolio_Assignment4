import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function pwHint(pw) {
  const rules = [
    { ok: /.{8,}/.test(pw), text: "8+ characters" },
    { ok: /[a-z]/.test(pw), text: "lowercase letter" },
    { ok: /[A-Z]/.test(pw), text: "uppercase letter" },
    { ok: /\d/.test(pw), text: "number" },
  ];
  return rules;
}

export default function SignUp() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const rules = useMemo(() => pwHint(password), [password]);
  const strong = rules.every(r => r.ok);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (password !== confirm) return setErr("Passwords do not match.");
    if (!strong) return setErr("Password is not strong enough.");
    try {
      await signup({ name, email, password });
      nav("/profile");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <main className="page">
      <h1>Create Account</h1>
      <form className="card form" onSubmit={onSubmit}>
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </label>
        <label>Password
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </label>
        <label>Confirm Password
          <input value={confirm} onChange={e=>setConfirm(e.target.value)} type="password" required />
        </label>

        <ul className="pw-rules">
          {rules.map(r => <li key={r.text} className={r.ok ? "ok" : ""}>{r.text}</li>)}
        </ul>

        {err && <p className="error">{err}</p>}
        <button className="btn" type="submit">Sign Up</button>
      </form>
    </main>
  );
}