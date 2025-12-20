import { z } from "zod";

export const quoteSchema = z
	.object({
		originCityId: z.number({ message: "La ciudad de origen es requerida" }),
		destinationCityId: z.number({
			message: "La ciudad de destino es requerida",
		}),
		weight: z
			.number({ message: "El peso es requerido" })
			.min(0.1, "El peso mínimo es 0.1 kg"),
		length: z
			.number({ message: "El largo es requerido" })
			.min(1, "El largo mínimo es 1 cm"),
		width: z
			.number({ message: "El ancho es requerido" })
			.min(1, "El ancho mínimo es 1 cm"),
		height: z
			.number({ message: "El alto es requerido" })
			.min(1, "El alto mínimo es 1 cm"),
	})
	.refine((data) => data.originCityId !== data.destinationCityId, {
		message: "La ciudad de origen y destino deben ser diferentes",
		path: ["destinationCityId"],
	});

export type QuoteFormData = z.infer<typeof quoteSchema>;
