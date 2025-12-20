import axios from "axios";
import { signOut } from "next-auth/react";

import { API_URL } from "@/shared/config/env";
import { store } from "@/shared/store";

const apiClient = axios.create({
	baseURL: API_URL,
	headers: { "Content-Type": "application/json" },
});

// Request interceptor - agregar token desde Redux store
apiClient.interceptors.request.use((config) => {
	const token = store.getState().auth.session?.accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Response interceptor - manejar 401 (no autorizado)
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			await signOut({ callbackUrl: "/login" });
		}
		return Promise.reject(error);
	},
);

export default apiClient;

