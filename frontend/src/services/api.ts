import { API_BASE_URL } from "../config/env";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function api<T>(
    path: string,
    options: { method?: HttpMethod; body?: any; headers?: Record<string, string> } = {}
): Promise<T> {
    const { method = "GET", body, headers } = options;

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const message = (data && (data.message || data.error)) || `HTTP ${res.status}`;
        throw new Error(message);
    }
    return data as T;
}