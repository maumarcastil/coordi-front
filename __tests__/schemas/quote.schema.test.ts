import { quoteSchema } from "@/features/quotes/schemas/quote.schema";

describe("quoteSchema", () => {
	const validData = {
		originCityId: 1,
		destinationCityId: 2,
		weight: 5,
		length: 30,
		width: 20,
		height: 15,
	};

	describe("casos válidos", () => {
		it("debe pasar con todos los datos válidos", () => {
			const result = quoteSchema.safeParse(validData);

			expect(result.success).toBe(true);
		});

		it("debe pasar con valores mínimos permitidos", () => {
			const data = {
				originCityId: 1,
				destinationCityId: 2,
				weight: 0.1,
				length: 1,
				width: 1,
				height: 1,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(true);
		});

		it("debe pasar con valores decimales en peso", () => {
			const data = {
				...validData,
				weight: 2.5,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("validación de ciudades", () => {
		it("debe fallar sin ciudad de origen", () => {
			const { originCityId, ...dataWithoutOrigin } = validData;

			const result = quoteSchema.safeParse(dataWithoutOrigin);

			expect(result.success).toBe(false);
		});

		it("debe fallar sin ciudad de destino", () => {
			const { destinationCityId, ...dataWithoutDestination } = validData;

			const result = quoteSchema.safeParse(dataWithoutDestination);

			expect(result.success).toBe(false);
		});

		it("debe mostrar mensaje de error personalizado para ciudad de origen", () => {
			const { originCityId, ...dataWithoutOrigin } = validData;

			const result = quoteSchema.safeParse(dataWithoutOrigin);

			expect(result.success).toBe(false);
			if (!result.success) {
				const originError = result.error.issues.find(
					(issue) => issue.path[0] === "originCityId",
				);
				expect(originError?.message).toBe("La ciudad de origen es requerida");
			}
		});

		it("debe mostrar mensaje de error personalizado para ciudad de destino", () => {
			const { destinationCityId, ...dataWithoutDestination } = validData;

			const result = quoteSchema.safeParse(dataWithoutDestination);

			expect(result.success).toBe(false);
			if (!result.success) {
				const destError = result.error.issues.find(
					(issue) => issue.path[0] === "destinationCityId",
				);
				expect(destError?.message).toBe("La ciudad de destino es requerida");
			}
		});
	});

	describe("validación de ciudades iguales (refinement)", () => {
		it("debe fallar cuando origen y destino son la misma ciudad", () => {
			const data = {
				...validData,
				originCityId: 5,
				destinationCityId: 5,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const cityError = result.error.issues.find(
					(issue) => issue.path[0] === "destinationCityId",
				);
				expect(cityError?.message).toBe(
					"La ciudad de origen y destino deben ser diferentes",
				);
			}
		});

		it("debe pasar cuando origen y destino son diferentes", () => {
			const data = {
				...validData,
				originCityId: 1,
				destinationCityId: 2,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(true);
		});
	});

	describe("validación de peso", () => {
		it("debe fallar con peso menor a 0.1 kg", () => {
			const data = {
				...validData,
				weight: 0.05,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const weightError = result.error.issues.find(
					(issue) => issue.path[0] === "weight",
				);
				expect(weightError?.message).toBe("El peso mínimo es 0.1 kg");
			}
		});

		it("debe fallar con peso cero", () => {
			const data = {
				...validData,
				weight: 0,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
		});

		it("debe fallar con peso negativo", () => {
			const data = {
				...validData,
				weight: -1,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});

	describe("validación de dimensiones", () => {
		it("debe fallar con largo menor a 1 cm", () => {
			const data = {
				...validData,
				length: 0.5,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const lengthError = result.error.issues.find(
					(issue) => issue.path[0] === "length",
				);
				expect(lengthError?.message).toBe("El largo mínimo es 1 cm");
			}
		});

		it("debe fallar con ancho menor a 1 cm", () => {
			const data = {
				...validData,
				width: 0,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const widthError = result.error.issues.find(
					(issue) => issue.path[0] === "width",
				);
				expect(widthError?.message).toBe("El ancho mínimo es 1 cm");
			}
		});

		it("debe fallar con alto menor a 1 cm", () => {
			const data = {
				...validData,
				height: 0,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const heightError = result.error.issues.find(
					(issue) => issue.path[0] === "height",
				);
				expect(heightError?.message).toBe("El alto mínimo es 1 cm");
			}
		});

		it("debe fallar con todas las dimensiones inválidas", () => {
			const data = {
				...validData,
				length: 0,
				width: 0,
				height: 0,
			};

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
			}
		});
	});

	describe("campos faltantes", () => {
		it("debe fallar cuando falta el peso", () => {
			const { weight, ...dataWithoutWeight } = validData;

			const result = quoteSchema.safeParse(dataWithoutWeight);

			expect(result.success).toBe(false);
			if (!result.success) {
				const weightError = result.error.issues.find(
					(issue) => issue.path[0] === "weight",
				);
				expect(weightError?.message).toBe("El peso es requerido");
			}
		});

		it("debe fallar con objeto vacío", () => {
			const result = quoteSchema.safeParse({});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues.length).toBeGreaterThanOrEqual(6);
			}
		});
	});
});

