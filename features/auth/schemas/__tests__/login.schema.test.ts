import { loginSchema } from "../login.schema";

describe("loginSchema", () => {
	describe("valid cases", () => {
		it("should pass with valid email and password", () => {
			const data = {
				email: "usuario@ejemplo.com",
				password: "miPassword123",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("email validation", () => {
		it("should fail with empty email", () => {
			const data = {
				email: "",
				password: "password123",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const emailError = result.error.issues.find(
					(issue) => issue.path[0] === "email",
				);
				expect(emailError?.message).toBe("Email inválido");
			}
		});

		it("should fail with invalid email format", () => {
			const data = {
				email: "emailsinformato",
				password: "password123",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});

	describe("password validation", () => {
		it("should fail with empty password", () => {
			const data = {
				email: "usuario@ejemplo.com",
				password: "",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const passwordError = result.error.issues.find(
					(issue) => issue.path[0] === "password",
				);
				expect(passwordError?.message).toBe("La contraseña es requerida");
			}
		});
	});
});

