import { registerSchema } from "@/features/auth/schemas/register.schema";

describe("registerSchema", () => {
	const validData = {
		name: "Juan Pérez",
		email: "juan@ejemplo.com",
		password: "password123",
		confirmPassword: "password123",
	};

	describe("casos válidos", () => {
		it("debe pasar con todos los datos válidos", () => {
			const result = registerSchema.safeParse(validData);

			expect(result.success).toBe(true);
		});

		it("debe pasar con nombre de exactamente 2 caracteres", () => {
			const data = {
				...validData,
				name: "Jo",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(true);
		});

		it("debe pasar con password de exactamente 6 caracteres", () => {
			const data = {
				...validData,
				password: "123456",
				confirmPassword: "123456",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("validación de nombre", () => {
		it("debe fallar con nombre de 1 caracter", () => {
			const data = {
				...validData,
				name: "J",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const nameError = result.error.issues.find(
					(issue) => issue.path[0] === "name",
				);
				expect(nameError?.message).toBe(
					"El nombre debe tener al menos 2 caracteres",
				);
			}
		});

		it("debe fallar con nombre vacío", () => {
			const data = {
				...validData,
				name: "",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});

	describe("validación de email", () => {
		it("debe fallar con email inválido", () => {
			const data = {
				...validData,
				email: "emailinvalido",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const emailError = result.error.issues.find(
					(issue) => issue.path[0] === "email",
				);
				expect(emailError?.message).toBe("Email inválido");
			}
		});
	});

	describe("validación de password", () => {
		it("debe fallar con password de 5 caracteres", () => {
			const data = {
				...validData,
				password: "12345",
				confirmPassword: "12345",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const passwordError = result.error.issues.find(
					(issue) => issue.path[0] === "password",
				);
				expect(passwordError?.message).toBe(
					"La contraseña debe tener al menos 6 caracteres",
				);
			}
		});

		it("debe fallar con password vacío", () => {
			const data = {
				...validData,
				password: "",
				confirmPassword: "",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});

	describe("validación de confirmPassword (refinement)", () => {
		it("debe fallar cuando las contraseñas no coinciden", () => {
			const data = {
				...validData,
				password: "password123",
				confirmPassword: "password456",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const confirmError = result.error.issues.find(
					(issue) => issue.path[0] === "confirmPassword",
				);
				expect(confirmError?.message).toBe("Las contraseñas no coinciden");
			}
		});

		it("debe pasar cuando las contraseñas coinciden exactamente", () => {
			const data = {
				...validData,
				password: "MiPassword!@#123",
				confirmPassword: "MiPassword!@#123",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(true);
		});

		it("debe fallar con diferencia de mayúsculas/minúsculas", () => {
			const data = {
				...validData,
				password: "Password123",
				confirmPassword: "password123",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const confirmError = result.error.issues.find(
					(issue) => issue.path[0] === "confirmPassword",
				);
				expect(confirmError?.message).toBe("Las contraseñas no coinciden");
			}
		});
	});

	describe("campos faltantes", () => {
		it("debe fallar cuando falta el nombre", () => {
			const { name, ...dataWithoutName } = validData;

			const result = registerSchema.safeParse(dataWithoutName);

			expect(result.success).toBe(false);
		});

		it("debe fallar cuando falta confirmPassword", () => {
			const { confirmPassword, ...dataWithoutConfirm } = validData;

			const result = registerSchema.safeParse(dataWithoutConfirm);

			expect(result.success).toBe(false);
		});
	});
});

