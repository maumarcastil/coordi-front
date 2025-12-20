import { z } from "zod";

export const createOrderSchema = z.object({
	senderName: z
		.string()
		.min(2, "El nombre debe tener al menos 2 caracteres")
		.max(100, "El nombre no puede exceder 100 caracteres"),
	senderPhone: z
		.string()
		.min(7, "El teléfono debe tener al menos 7 dígitos")
		.max(20, "El teléfono no puede exceder 20 caracteres"),
	senderAddress: z
		.string()
		.min(10, "La dirección debe tener al menos 10 caracteres"),
	recipientName: z
		.string()
		.min(2, "El nombre debe tener al menos 2 caracteres")
		.max(100, "El nombre no puede exceder 100 caracteres"),
	recipientPhone: z
		.string()
		.min(7, "El teléfono debe tener al menos 7 dígitos")
		.max(20, "El teléfono no puede exceder 20 caracteres"),
	recipientAddress: z
		.string()
		.min(10, "La dirección debe tener al menos 10 caracteres"),
	packageDescription: z.string().optional(),
});

export type CreateOrderFormData = z.infer<typeof createOrderSchema>;

