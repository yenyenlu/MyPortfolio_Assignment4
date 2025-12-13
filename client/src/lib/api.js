const base = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, { method="GET", body, token } = {}) {
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  get: (path, token) => request(path, { token }),
  post: (path, body, token) => request(path, { method:"POST", body, token }),
  put: (path, body, token) => request(path, { method:"PUT", body, token }),
  del: (path, token) => request(path, { method:"DELETE", token }),
};