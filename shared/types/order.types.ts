import type { City } from "./city.types";

export type OrderStatus =
	| "pending"
	| "confirmed"
	| "in_transit"
	| "delivered"
	| "cancelled";

// Tipo base para listado de órdenes (incluye cityName para mostrar en tabla)
export interface OrderListItem {
	id: string;
	quoteId: number;
	trackingNumber: string | null;
	currentStatus: OrderStatus;
	totalPrice: number;
	originCityId: number;
	destinationCityId: number;
	originCityName: string;
	destinationCityName: string;
	senderName: string;
	recipientName: string;
	estimatedDeliveryDate: string | null;
	createdAt: string;
}

// Tipo completo para detalle de orden (incluye objetos City poblados)
export interface OrderDetail {
	id: string;
	quoteId: number;
	userId: number;
	originCityId: number;
	destinationCityId: number;
	originCity: City;
	destinationCity: City;
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

export interface OrderDetailResponse {
	order: OrderDetail;
}

export interface OrdersResponse {
	orders: OrderListItem[];
}

export interface OrderStatusHistory {
	id: string;
	orderId: string;
	status: OrderStatus;
	notes: string | null;
	location: string | null;
	changedByUserId: number | null;
	changedBySystem: boolean;
	createdAt: string;
}

export interface OrderHistoryResponse {
	history: OrderStatusHistory[];
}
