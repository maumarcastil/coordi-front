export type OrderStatus =
	| "pending"
	| "confirmed"
	| "in_transit"
	| "delivered"
	| "cancelled";

export interface Order {
	id: string;
	quoteId: number;
	userId: number;
	originCityId: number;
	destinationCityId: number;
	weight: number;
	length: number;
	width: number;
	height: number;
	volumetricWeight: number;
	chargeableWeight: number;
	totalPrice: number;
	trackingNumber: string | null;
	currentStatus: OrderStatus;
	senderName: string;
	senderPhone: string;
	senderAddress: string;
	recipientName: string;
	recipientPhone: string;
	recipientAddress: string;
	packageDescription: string | null;
	estimatedDeliveryDate: string | null;
	deliveredAt: string | null;
	cancelledAt: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreateOrderRequest {
	quoteId: number;
	senderName: string;
	senderPhone: string;
	senderAddress: string;
	recipientName: string;
	recipientPhone: string;
	recipientAddress: string;
	packageDescription?: string;
}

export interface OrderResponse {
	order: Order;
}

export interface OrdersResponse {
	orders: Order[];
}

