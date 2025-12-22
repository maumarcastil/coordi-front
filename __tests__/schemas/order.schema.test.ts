import { createOrderSchema } from "@/features/orders/schemas/order.schema";

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

	describe("casos válidos", () => {
		it("debe pasar con todos los datos válidos", () => {
			const result = createOrderSchema.safeParse(validData);

			expect(result.success).toBe(true);
		});

		it("debe pasar sin descripción del paquete (campo opcional)", () => {
			const { packageDescription, ...dataWithoutDescription } = validData;

			const result = createOrderSchema.safeParse(dataWithoutDescription);

			expect(result.success).toBe(true);
		});

		it("debe pasar con descripción del paquete vacía", () => {
			const data = {
				...validData,
				packageDescription: "",
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(true);
		});

		it("debe pasar con valores mínimos permitidos", () => {
			const data = {
				senderName: "Jo",
				senderPhone: "1234567",
				senderAddress: "Calle 123#",
				recipientName: "Ma",
				recipientPhone: "7654321",
				recipientAddress: "Carrera 89#",
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("validación de nombre del remitente", () => {
		it("debe fallar con nombre de 1 caracter", () => {
			const data = {
				...validData,
				senderName: "J",
			};

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

		it("debe fallar con nombre mayor a 100 caracteres", () => {
			const data = {
				...validData,
				senderName: "A".repeat(101),
			};

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

		it("debe pasar con nombre de exactamente 100 caracteres", () => {
			const data = {
				...validData,
				senderName: "A".repeat(100),
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("validación de teléfono del remitente", () => {
		it("debe fallar con teléfono de 6 dígitos", () => {
			const data = {
				...validData,
				senderPhone: "123456",
			};

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

		it("debe fallar con teléfono mayor a 20 caracteres", () => {
			const data = {
				...validData,
				senderPhone: "1".repeat(21),
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(
					(issue) => issue.path[0] === "senderPhone",
				);
				expect(error?.message).toBe(
					"El teléfono no puede exceder 20 caracteres",
				);
			}
		});

		it("debe pasar con teléfono de exactamente 7 dígitos", () => {
			const data = {
				...validData,
				senderPhone: "1234567",
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(true);
		});

		it("debe pasar con teléfono de exactamente 20 caracteres", () => {
			const data = {
				...validData,
				senderPhone: "1".repeat(20),
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("validación de dirección del remitente", () => {
		it("debe fallar con dirección menor a 10 caracteres", () => {
			const data = {
				...validData,
				senderAddress: "Calle 1",
			};

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

		it("debe pasar con dirección de exactamente 10 caracteres", () => {
			const data = {
				...validData,
				senderAddress: "Calle 123#",
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("validación de datos del destinatario", () => {
		it("debe fallar con nombre del destinatario de 1 caracter", () => {
			const data = {
				...validData,
				recipientName: "M",
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(
					(issue) => issue.path[0] === "recipientName",
				);
				expect(error?.message).toBe(
					"El nombre debe tener al menos 2 caracteres",
				);
			}
		});

		it("debe fallar con teléfono del destinatario muy corto", () => {
			const data = {
				...validData,
				recipientPhone: "123",
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(
					(issue) => issue.path[0] === "recipientPhone",
				);
				expect(error?.message).toBe(
					"El teléfono debe tener al menos 7 dígitos",
				);
			}
		});

		it("debe fallar con dirección del destinatario muy corta", () => {
			const data = {
				...validData,
				recipientAddress: "Cra 1",
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(
					(issue) => issue.path[0] === "recipientAddress",
				);
				expect(error?.message).toBe(
					"La dirección debe tener al menos 10 caracteres",
				);
			}
		});
	});

	describe("campos faltantes", () => {
		it("debe fallar cuando falta nombre del remitente", () => {
			const { senderName, ...dataWithoutSenderName } = validData;

			const result = createOrderSchema.safeParse(dataWithoutSenderName);

			expect(result.success).toBe(false);
		});

		it("debe fallar cuando falta teléfono del remitente", () => {
			const { senderPhone, ...dataWithoutSenderPhone } = validData;

			const result = createOrderSchema.safeParse(dataWithoutSenderPhone);

			expect(result.success).toBe(false);
		});

		it("debe fallar cuando falta dirección del remitente", () => {
			const { senderAddress, ...dataWithoutSenderAddress } = validData;

			const result = createOrderSchema.safeParse(dataWithoutSenderAddress);

			expect(result.success).toBe(false);
		});

		it("debe fallar cuando faltan todos los datos del destinatario", () => {
			const data = {
				senderName: validData.senderName,
				senderPhone: validData.senderPhone,
				senderAddress: validData.senderAddress,
			};

			const result = createOrderSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
			}
		});

		it("debe fallar con objeto vacío", () => {
			const result = createOrderSchema.safeParse({});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues.length).toBeGreaterThanOrEqual(6);
			}
		});
	});
});

