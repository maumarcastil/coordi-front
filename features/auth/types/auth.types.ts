import type { z } from "zod";

import type { registerSchema } from "@/features/auth/schemas/register.schema";

export type RegisterFormData = z.infer<typeof registerSchema>;

export type RegisterRequest = Omit<RegisterFormData, "confirmPassword">;

export type AuthResponse = {
	user: {
		id: number;
		email: string;
		name: string;
	};
	token: string;
};

export type AuthError = {
	error: string;
	details?: Record<string, string[]>;
};
