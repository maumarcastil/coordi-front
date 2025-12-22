import { createOrderSchema } from "../order.schema";

describe("createOrderSchema", () => {
	const validData = {
		senderName: "Juan Pérez",
		senderPhone: "3001234567",
		senderAddress: "Calle 123 #45-67, Barrio Centro",
		recipientName: "María García",
		recipientPhone: "3009876543",
		recipientAddress: "Carrera 89 #12-34, Barrio Norte",
		packageDescription: "Documentos importantes",
	};

	describe("valid cases", () => {
		it("should pass with all valid data", () => {
			const result = createOrderSchema.safeParse(validData);

			expect(result.success).toBe(true);
		});

		it("should pass without packageDescription (optional field)", () => {
			const { packageDescription, ...dataWithoutDescription } = validData;

			const result = createOrderSchema.safeParse(dataWithoutDescription);

			expect(result.success).toBe(true);
		});
	});

	describe("sender name validation", () => {
		it("should fail with name less than 2 characters", () => {
			const data = { ...validData, senderName: "J" };

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(
					(issue) => issue.path[0] === "senderName",
				);
				expect(error?.message).toBe(
					"El nombre debe tener al menos 2 caracteres",
				);
			}
		});

		it("should fail with name over 100 characters", () => {
			const data = { ...validData, senderName: "A".repeat(101) };

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(
					(issue) => issue.path[0] === "senderName",
				);
				expect(error?.message).toBe(
					"El nombre no puede exceder 100 caracteres",
				);
			}
		});
	});

	describe("phone validation", () => {
		it("should fail with phone less than 7 digits", () => {
			const data = { ...validData, senderPhone: "123456" };

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(
					(issue) => issue.path[0] === "senderPhone",
				);
				expect(error?.message).toBe(
					"El teléfono debe tener al menos 7 dígitos",
				);
			}
		});

		it("should fail with phone over 20 characters", () => {
			const data = { ...validData, senderPhone: "1".repeat(21) };

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});

	describe("address validation", () => {
		it("should fail with address less than 10 characters", () => {
			const data = { ...validData, senderAddress: "Calle 1" };

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(
					(issue) => issue.path[0] === "senderAddress",
				);
				expect(error?.message).toBe(
					"La dirección debe tener al menos 10 caracteres",
				);
			}
		});
	});

	describe("recipient validation", () => {
		it("should fail with recipient name less than 2 characters", () => {
			const data = { ...validData, recipientName: "M" };

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
		});

		it("should fail with recipient phone too short", () => {
			const data = { ...validData, recipientPhone: "123" };

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});
});

