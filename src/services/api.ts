const BASE_URL = "http://localhost:9008/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status} ${res.statusText}`);
  }

  if (res.status === 204) return null as T; // Pour les DELETE sans body

  return await res.json();
}
