import { quoteSchema } from "../quote.schema";

describe("quoteSchema", () => {
	const validData = {
		originCityId: 1,
		destinationCityId: 2,
		weight: 5,
		length: 30,
		width: 20,
		height: 15,
	};

	describe("valid cases", () => {
		it("should pass with all valid data", () => {
			const result = quoteSchema.safeParse(validData);

			expect(result.success).toBe(true);
		});

		it("should pass with minimum allowed values", () => {
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
	});

	describe("cities refinement", () => {
		it("should fail when origin and destination are the same city", () => {
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
	});

	describe("weight validation", () => {
		it("should fail with weight less than 0.1 kg", () => {
			const data = { ...validData, weight: 0.05 };

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const weightError = result.error.issues.find(
					(issue) => issue.path[0] === "weight",
				);
				expect(weightError?.message).toBe("El peso mínimo es 0.1 kg");
			}
		});
	});

	describe("dimensions validation", () => {
		it("should fail with length less than 1 cm", () => {
			const data = { ...validData, length: 0.5 };

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
			if (!result.success) {
				const lengthError = result.error.issues.find(
					(issue) => issue.path[0] === "length",
				);
				expect(lengthError?.message).toBe("El largo mínimo es 1 cm");
			}
		});

		it("should fail with width less than 1 cm", () => {
			const data = { ...validData, width: 0 };

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
		});

		it("should fail with height less than 1 cm", () => {
			const data = { ...validData, height: 0 };

			const result = quoteSchema.safeParse(data);

			expect(result.success).toBe(false);
		});
	});
});

