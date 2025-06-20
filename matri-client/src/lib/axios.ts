// src/lib/axios.ts

import axios from 'axios';
import { getCookie } from 'cookies-next';

/**
 * Axios instance configured with a base URL from environment variables.
 *
 * All requests made using this instance will automatically include the
 * session token (if present) from cookies in the `Authorization` header.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

/**
 * Axios request interceptor to include Bearer token from cookies in all requests.
 *
 * @param config - The Axios request configuration object.
 * @returns Modified config with Authorization header if token exists.
 */
api.interceptors.request.use((config) => {
  const token = getCookie('sessionToken');

  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;
