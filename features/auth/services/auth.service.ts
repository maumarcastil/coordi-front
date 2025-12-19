import { API_URL } from "@/shared/config/env";

import type {
	AuthError,
	AuthResponse,
	LoginFormData,
	RegisterRequest,
} from "@/features/auth/types/auth.types";

export async function registerUser(
	data: RegisterRequest,
): Promise<AuthResponse> {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error: AuthError = await response.json();
		throw new Error(error.error || "Error al registrar usuario");
	}

	return response.json();
}

export async function loginUser(data: LoginFormData): Promise<AuthResponse> {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error: AuthError = await response.json();
		throw new Error(error.error || "Credenciales inválidas");
	}

	return response.json();
}
