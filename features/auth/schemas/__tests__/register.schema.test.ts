import { registerSchema } from "../register.schema";

describe("registerSchema", () => {
	const validData = {
		name: "Juan Pérez",
		email: "juan@ejemplo.com",
		password: "password123",
		confirmPassword: "password123",
	};

	describe("valid cases", () => {
		it("should pass with all valid data", () => {
			const result = registerSchema.safeParse(validData);

			expect(result.success).toBe(true);
		});

		it("should pass with minimum valid values", () => {
			const data = {
				name: "Jo",
				email: "a@b.co",
				password: "123456",
				confirmPassword: "123456",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("name validation", () => {
		it("should fail with name less than 2 characters", () => {
			const data = { ...validData, name: "J" };

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
	});

	describe("password validation", () => {
		it("should fail with password less than 6 characters", () => {
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
	});

	describe("confirmPassword refinement", () => {
		it("should fail when passwords do not match", () => {
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

		it("should fail with case difference in passwords", () => {
			const data = {
				...validData,
				password: "Password123",
				confirmPassword: "password123",
			};

			const result = registerSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});
});

