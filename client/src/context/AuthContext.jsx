import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthed = !!token;

  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!token) { setUser(null); setLoading(false); return; }
      try {
        const data = await api.get("/users/profile", token);
        if (!ignore) setUser(data);
      } catch {
        if (!ignore) {
          setUser(null);
          setToken("");
          localStorage.removeItem("token");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [token]);

  const value = useMemo(() => ({
    token,
    user,
    loading,
    isAuthed,
    async signup({ name, email, password }) {
      await api.post("/users/register", { name, email, password });
      // auto-login after signup
      const res = await api.post("/users/login", { email, password });
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(res.user);
      return res;
    },
    async login({ email, password }) {
      const res = await api.post("/users/login", { email, password });
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(res.user);
      return res;
    },
    async logout() {
      try { await api.post("/users/logout", {}, token); } catch {}
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
    }
  }), [token, user, loading, isAuthed]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}