import { loginSchema } from "@/features/auth/schemas/login.schema";

describe("loginSchema", () => {
	describe("casos válidos", () => {
		it("debe pasar con email y password válidos", () => {
			const data = {
				email: "usuario@ejemplo.com",
				password: "miPassword123",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(true);
		});

		it("debe pasar con password de un solo caracter", () => {
			const data = {
				email: "test@test.com",
				password: "a",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("validación de email", () => {
		it("debe fallar con email vacío", () => {
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

		it("debe fallar con email sin formato válido", () => {
			const data = {
				email: "emailsinformato",
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

		it("debe fallar con email sin dominio", () => {
			const data = {
				email: "usuario@",
				password: "password123",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});

	describe("validación de password", () => {
		it("debe fallar con password vacío", () => {
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

	describe("campos faltantes", () => {
		it("debe fallar cuando falta email", () => {
			const data = {
				password: "password123",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(false);
		});

		it("debe fallar cuando falta password", () => {
			const data = {
				email: "usuario@ejemplo.com",
			};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(false);
		});

		it("debe fallar con objeto vacío", () => {
			const data = {};

			const result = loginSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});
});

