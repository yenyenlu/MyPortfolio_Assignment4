import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, loading, logout, isAuthed } = useAuth();

  if (loading) return <main className="page"><p>Loading...</p></main>;
  if (!isAuthed) return <main className="page"><h1>Profile</h1><p>Please sign in first.</p></main>;

  return (
    <main className="page">
      <h1>Welcome{user?.name ? `, ${user.name}` : ""}!</h1>
      <div className="card">
        <p><b>Email:</b> {user?.email}</p>
        <p className="muted">This is your “college schoolmate” account for demo purposes.</p>
        <button className="btn" onClick={logout}>Sign Out</button>
      </div>
    </main>
  );
}