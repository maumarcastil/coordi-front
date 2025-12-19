import type {
	AuthError,
	AuthResponse,
	RegisterRequest,
} from "@/features/auth/types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
